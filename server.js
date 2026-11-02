require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { data, save, id, devSecret } = require('./lib/db');

const PORT = Number(process.env.PORT) || 3000;
// Render sets RENDER_EXTERNAL_URL automatically, so APP_URL is only needed for a custom domain.
const APP_URL = (process.env.APP_URL || process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`).replace(/\/$/, '');
const IS_PROD = process.env.NODE_ENV === 'production';

if (IS_PROD && !process.env.JWT_SECRET) {
  console.error('JWT_SECRET is required in production.');
  process.exit(1);
}
const JWT_SECRET = process.env.JWT_SECRET || devSecret();

// ---------- Integrations ----------
const openaiEnabled = Boolean(process.env.OPENAI_API_KEY);
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

const emailEnabled = Boolean(process.env.SMTP_HOST && process.env.MAIL_FROM);
const mailer = emailEnabled
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    })
  : null;

const stripe = process.env.STRIPE_SECRET_KEY ? require('stripe')(process.env.STRIPE_SECRET_KEY) : null;
const stripeEnabled = Boolean(stripe && process.env.STRIPE_PRICE_ID);

// ---------- Plans ----------
const PLANS = {
  free: { aiDrafts: 10, emails: 20, aiPlan: false },
  pro: { aiDrafts: 500, emails: 1000, aiPlan: true },
};

function monthKey() {
  return new Date().toISOString().slice(0, 7);
}

function usage(user) {
  const m = monthKey();
  if (!user.usage || user.usage.month !== m) user.usage = { month: m, aiDrafts: 0, emails: 0 };
  return user.usage;
}

function publicUser(user) {
  const u = usage(user);
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    plan: user.plan,
    emailConsent: Boolean(user.emailConsent),
    hasBilling: Boolean(user.stripeCustomerId),
    usage: { aiDrafts: u.aiDrafts, emails: u.emails },
    limits: PLANS[user.plan],
  };
}

// ---------- App ----------
const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1); // behind the host's HTTPS proxy
app.get('/healthz', (req, res) => res.send('ok'));
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

// Stripe webhook needs the raw body, so it is registered before express.json().
app.post('/api/billing/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) return res.status(400).send('Stripe not configured');
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const obj = event.data.object;
  if (event.type === 'checkout.session.completed') {
    const user = data.users.find((u) => u.id === obj.client_reference_id);
    if (user) {
      user.plan = 'pro';
      user.stripeCustomerId = obj.customer;
      user.subscriptionId = obj.subscription;
      save();
    }
  } else if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
    const user = data.users.find((u) => u.stripeCustomerId === obj.customer);
    if (user) {
      const active = ['active', 'trialing', 'past_due'].includes(obj.status) && event.type !== 'customer.subscription.deleted';
      user.plan = active ? 'pro' : 'free';
      user.subscriptionId = obj.id;
      save();
    }
  }
  res.json({ received: true });
});

app.use(express.json({ limit: '200kb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function fail(res, status, message) {
  return res.status(status).json({ error: message });
}

function setSession(res, user) {
  const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '30d' });
  res.cookie('session', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: IS_PROD,
    maxAge: 30 * 24 * 3600 * 1000,
  });
}

function auth(req, res, next) {
  try {
    const { sub } = jwt.verify(req.cookies.session || '', JWT_SECRET);
    req.user = data.users.find((u) => u.id === sub);
    if (!req.user) throw new Error('missing');
    next();
  } catch {
    fail(res, 401, 'يرجى تسجيل الدخول');
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

// ---------- Config ----------
app.get('/api/config', (req, res) => {
  res.json({
    integrations: { openai: openaiEnabled, email: emailEnabled, stripe: stripeEnabled },
    demoUpgrade: !stripeEnabled && !IS_PROD,
    proPriceLabel: process.env.PRO_PRICE_LABEL || '9$ شهريًا',
    plans: PLANS,
  });
});

// ---------- Auth ----------
app.post('/api/auth/register', async (req, res) => {
  const name = String(req.body.name || '').trim().slice(0, 80);
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  if (!name) return fail(res, 400, 'الاسم مطلوب');
  if (!EMAIL_RE.test(email)) return fail(res, 400, 'البريد الإلكتروني غير صالح');
  if (password.length < 8) return fail(res, 400, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل');
  if (data.users.some((u) => u.email === email)) return fail(res, 409, 'هذا البريد مسجّل مسبقًا');

  const user = {
    id: id(),
    name,
    email,
    passwordHash: await bcrypt.hash(password, 10),
    plan: 'free',
    emailConsent: false,
    createdAt: new Date().toISOString(),
  };
  data.users.push(user);
  save();
  setSession(res, user);
  res.json({ user: publicUser(user) });
});

app.post('/api/auth/login', async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const user = data.users.find((u) => u.email === email);
  if (!user || !(await bcrypt.compare(String(req.body.password || ''), user.passwordHash))) {
    return fail(res, 401, 'البريد أو كلمة المرور غير صحيحة');
  }
  setSession(res, user);
  res.json({ user: publicUser(user) });
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('session');
  res.json({ ok: true });
});

app.get('/api/me', auth, (req, res) => res.json({ user: publicUser(req.user) }));

app.patch('/api/me', auth, (req, res) => {
  if (typeof req.body.name === 'string' && req.body.name.trim()) req.user.name = req.body.name.trim().slice(0, 80);
  if (typeof req.body.emailConsent === 'boolean') {
    req.user.emailConsent = req.body.emailConsent;
    req.user.emailConsentAt = new Date().toISOString();
  }
  save();
  res.json({ user: publicUser(req.user) });
});

// ---------- Tasks ----------
function cleanTask(body, existing = {}) {
  const t = { ...existing };
  if ('title' in body) t.title = String(body.title || '').trim().slice(0, 200);
  if ('notes' in body) t.notes = String(body.notes || '').slice(0, 4000);
  if ('date' in body) t.date = DATE_RE.test(body.date) ? body.date : '';
  if ('time' in body) t.time = TIME_RE.test(body.time) ? body.time : '';
  if ('priority' in body) t.priority = ['high', 'medium', 'low'].includes(body.priority) ? body.priority : 'medium';
  if ('done' in body) t.done = Boolean(body.done);
  if ('contactName' in body) t.contactName = String(body.contactName || '').trim().slice(0, 120);
  if ('contactEmail' in body) {
    const e = String(body.contactEmail || '').trim();
    t.contactEmail = e && EMAIL_RE.test(e) ? e : '';
  }
  if ('draft' in body && body.draft && typeof body.draft === 'object') {
    t.draft = {
      subject: String(body.draft.subject || '').slice(0, 300),
      body: String(body.draft.body || '').slice(0, 10000),
      kind: body.draft.kind === 'message' ? 'message' : 'email',
    };
  }
  return t;
}

function ownTask(req, res) {
  const task = data.tasks.find((t) => t.id === req.params.id && t.userId === req.user.id);
  if (!task) fail(res, 404, 'المهمة غير موجودة');
  return task;
}

app.get('/api/tasks', auth, (req, res) => {
  const tasks = data.tasks
    .filter((t) => t.userId === req.user.id)
    .sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999') || (a.time || '').localeCompare(b.time || ''));
  res.json({ tasks });
});

app.post('/api/tasks', auth, (req, res) => {
  const task = cleanTask(req.body, { priority: 'medium', done: false, date: '', time: '', notes: '' });
  if (!task.title) return fail(res, 400, 'عنوان المهمة مطلوب');
  Object.assign(task, { id: id(), userId: req.user.id, createdAt: new Date().toISOString() });
  data.tasks.push(task);
  save();
  res.json({ task });
});

app.patch('/api/tasks/:id', auth, (req, res) => {
  const task = ownTask(req, res);
  if (!task) return;
  Object.assign(task, cleanTask(req.body, task), { updatedAt: new Date().toISOString() });
  if (!task.title) return fail(res, 400, 'عنوان المهمة مطلوب');
  save();
  res.json({ task });
});

app.delete('/api/tasks/:id', auth, (req, res) => {
  const task = ownTask(req, res);
  if (!task) return;
  data.tasks.splice(data.tasks.indexOf(task), 1);
  save();
  res.json({ ok: true });
});

// ---------- Calendar (.ics) ----------
function icsEscape(s) {
  return String(s || '').replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/[,;]/g, (m) => '\\' + m);
}

function icsEvent(t) {
  const d = t.date.replace(/-/g, '');
  const lines = ['BEGIN:VEVENT', `UID:${t.id}@mudir`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`];
  if (t.time) {
    const [h, m] = t.time.split(':').map(Number);
    const end = `${String(Math.min(h + 1, 23)).padStart(2, '0')}${String(m).padStart(2, '0')}00`;
    lines.push(`DTSTART:${d}T${t.time.replace(':', '')}00`, `DTEND:${d}T${end}`);
  } else {
    const next = new Date(t.date + 'T00:00:00Z');
    next.setUTCDate(next.getUTCDate() + 1);
    lines.push(`DTSTART;VALUE=DATE:${d}`, `DTEND;VALUE=DATE:${next.toISOString().slice(0, 10).replace(/-/g, '')}`);
  }
  lines.push(`SUMMARY:${icsEscape(t.title)}`);
  if (t.notes) lines.push(`DESCRIPTION:${icsEscape(t.notes)}`);
  lines.push('BEGIN:VALARM', 'TRIGGER:-PT30M', 'ACTION:DISPLAY', `DESCRIPTION:${icsEscape(t.title)}`, 'END:VALARM', 'END:VEVENT');
  return lines;
}

function sendIcs(res, tasks, filename) {
  const body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Mudir//AR', 'CALSCALE:GREGORIAN', ...tasks.flatMap(icsEvent), 'END:VCALENDAR'].join('\r\n');
  res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.send(body);
}

app.get('/api/calendar.ics', auth, (req, res) => {
  sendIcs(res, data.tasks.filter((t) => t.userId === req.user.id && t.date && !t.done), 'mudir-tasks.ics');
});

app.get('/api/tasks/:id/ics', auth, (req, res) => {
  const task = ownTask(req, res);
  if (!task) return;
  if (!task.date) return fail(res, 400, 'حدّد تاريخًا للمهمة أولًا');
  sendIcs(res, [task], 'mudir-task.ics');
});

// ---------- AI ----------
async function openaiJSON(system, user) {
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      response_format: { type: 'json_object' },
      temperature: 0.6,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
  });
  if (!r.ok) {
    const text = await r.text();
    console.error('OpenAI error', r.status, text);
    throw new Error('تعذّر الاتصال بخدمة الذكاء الاصطناعي');
  }
  const json = await r.json();
  return JSON.parse(json.choices[0].message.content);
}

const TONES = { formal: 'رسمي ومهني', friendly: 'ودّي ولطيف', brief: 'مختصر ومباشر' };

app.post('/api/ai/draft', auth, async (req, res) => {
  const task = data.tasks.find((t) => t.id === req.body.taskId && t.userId === req.user.id);
  if (!task) return fail(res, 404, 'المهمة غير موجودة');
  const u = usage(req.user);
  const limit = PLANS[req.user.plan].aiDrafts;
  if (u.aiDrafts >= limit) {
    return fail(res, 402, `وصلت إلى حد ${limit} صياغات هذا الشهر. اشترك في الباقة الاحترافية للمزيد.`);
  }

  const kind = req.body.kind === 'message' ? 'message' : 'email';
  const tone = TONES[req.body.tone] || TONES.formal;
  const recipient = String(req.body.contactName || task.contactName || '').slice(0, 120);
  const instructions = String(req.body.instructions || '').slice(0, 1000);
  const lang = req.body.lang === 'en' ? 'English' : 'Arabic (Modern Standard, natural)';

  let draft;
  if (openaiEnabled) {
    const system =
      'You are Mudir, an assistant that drafts professional emails and short messages for busy people. ' +
      'Return JSON {"subject": string, "body": string}. For messages (chat/WhatsApp), subject may be empty and body should be short. ' +
      'Do not invent facts, prices or commitments that are not given; leave clear placeholders like [التاريخ] when needed. ' +
      'Sign off with the sender name.';
    const prompt = [
      `Write a ${kind === 'email' ? 'email' : 'short chat message'} in ${lang}.`,
      `Tone: ${tone}.`,
      `Sender name: ${req.user.name}.`,
      recipient ? `Recipient name: ${recipient}.` : 'Recipient name unknown — use a neutral greeting.',
      `Task title: ${task.title}.`,
      task.notes ? `Task notes: ${task.notes}` : '',
      task.date ? `Task date: ${task.date}${task.time ? ' ' + task.time : ''}.` : '',
      instructions ? `Extra instructions from the user: ${instructions}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    try {
      const out = await openaiJSON(system, prompt);
      draft = { subject: String(out.subject || ''), body: String(out.body || '') };
    } catch (err) {
      return fail(res, 502, err.message);
    }
  } else {
    const greet = recipient ? `السلام عليكم ${recipient}،` : 'السلام عليكم،';
    const when = task.date ? ` بتاريخ ${task.date}${task.time ? ' الساعة ' + task.time : ''}` : '';
    draft = {
      subject: kind === 'email' ? task.title : '',
      body:
        kind === 'email'
          ? `${greet}\n\nأتواصل معكم بخصوص: ${task.title}${when}.\n${task.notes ? '\n' + task.notes + '\n' : ''}\nأرجو التكرّم بالاطلاع والرد في أقرب فرصة.\n\nمع خالص التحية،\n${req.user.name}`
          : `${greet} بخصوص ${task.title}${when}. ${task.notes || ''}\nشكرًا لك — ${req.user.name}`,
      demo: true,
    };
  }

  u.aiDrafts += 1;
  task.draft = { subject: draft.subject, body: draft.body, kind };
  if (req.body.contactName !== undefined) task.contactName = recipient;
  save();
  res.json({ draft: { ...draft, kind }, user: publicUser(req.user) });
});

app.post('/api/ai/plan', auth, async (req, res) => {
  if (!PLANS[req.user.plan].aiPlan) return fail(res, 402, 'ترتيب الأولويات الذكي متاح في الباقة الاحترافية.');
  const open = data.tasks.filter((t) => t.userId === req.user.id && !t.done).slice(0, 60);
  if (!open.length) return res.json({ plan: [], summary: 'لا توجد مهام مفتوحة. أحسنت!' });
  const today = new Date().toISOString().slice(0, 10);

  if (!openaiEnabled) {
    const rank = { high: 0, medium: 1, low: 2 };
    const sorted = [...open].sort(
      (a, b) => rank[a.priority] - rank[b.priority] || (a.date || '9999').localeCompare(b.date || '9999'),
    );
    return res.json({
      summary: 'ترتيب تلقائي حسب الأولوية والتاريخ (الوضع التجريبي — أضف مفتاح OpenAI لتحليل أذكى).',
      plan: sorted.map((t) => ({
        id: t.id,
        reason: t.date && t.date < today ? 'متأخرة عن موعدها' : t.priority === 'high' ? 'أولوية عالية' : 'حسب الموعد',
      })),
    });
  }

  try {
    const out = await openaiJSON(
      'You are a productivity coach. Order the user\'s open tasks by what deserves attention first, considering due dates, overdue items, priority, and dependencies implied by the text. ' +
        'Return JSON {"summary": string (Arabic, 1-2 sentences of advice for today), "plan": [{"id": string, "reason": string (Arabic, under 12 words)}]}. Include every task id exactly once.',
      `Today is ${today}.\nTasks:\n` +
        JSON.stringify(open.map((t) => ({ id: t.id, title: t.title, notes: t.notes, date: t.date, time: t.time, priority: t.priority }))),
    );
    const ids = new Set(open.map((t) => t.id));
    const plan = (Array.isArray(out.plan) ? out.plan : []).filter((p) => ids.has(p.id));
    res.json({ summary: String(out.summary || ''), plan });
  } catch (err) {
    fail(res, 502, err.message);
  }
});

// ---------- Email ----------
app.post('/api/email/send', auth, async (req, res) => {
  const user = req.user;
  if (!user.emailConsent) {
    return fail(res, 403, 'يجب منح الإذن بإرسال البريد نيابةً عنك من صفحة الحساب أولًا.');
  }
  if (req.body.confirm !== true) return fail(res, 400, 'يجب تأكيد الإرسال');

  const to = String(req.body.to || '').trim();
  const subject = String(req.body.subject || '').trim().slice(0, 300);
  const body = String(req.body.body || '').slice(0, 10000);
  if (!EMAIL_RE.test(to)) return fail(res, 400, 'بريد المستلم غير صالح');
  if (!subject || !body.trim()) return fail(res, 400, 'العنوان والنص مطلوبان');

  const task = req.body.taskId ? data.tasks.find((t) => t.id === req.body.taskId && t.userId === user.id) : null;
  const u = usage(user);
  const limit = PLANS[user.plan].emails;
  if (u.emails >= limit) return fail(res, 402, `وصلت إلى حد ${limit} رسالة بريد هذا الشهر.`);

  const record = { id: id(), userId: user.id, taskId: task?.id || null, to, subject, body, sentAt: new Date().toISOString() };
  if (emailEnabled) {
    try {
      const fromAddr = process.env.MAIL_FROM.match(/<(.+)>/)?.[1] || process.env.MAIL_FROM;
      await mailer.sendMail({
        from: { name: `${user.name} عبر مُدير`, address: fromAddr },
        replyTo: { name: user.name, address: user.email },
        to,
        subject,
        text: body,
        html: `<div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;font-size:15px;line-height:1.8;white-space:pre-wrap">${body
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')}</div>`,
      });
      record.status = 'sent';
    } catch (err) {
      console.error('Email error:', err.message);
      return fail(res, 502, 'تعذّر إرسال البريد. تحقّق من إعدادات SMTP.');
    }
  } else {
    console.log(`[demo email] to=${to} subject=${subject}\n${body}\n`);
    record.status = 'demo';
  }

  u.emails += 1;
  data.emails.push(record);
  if (task) task.lastEmailAt = record.sentAt;
  save();
  res.json({ email: record, user: publicUser(user) });
});

app.get('/api/email/log', auth, (req, res) => {
  const emails = data.emails
    .filter((e) => e.userId === req.user.id)
    .sort((a, b) => b.sentAt.localeCompare(a.sentAt))
    .slice(0, 100);
  res.json({ emails });
});

// ---------- Billing ----------
app.post('/api/billing/checkout', auth, async (req, res) => {
  if (!stripeEnabled) return fail(res, 400, 'الدفع غير مفعّل على الخادم بعد.');
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      client_reference_id: req.user.id,
      ...(req.user.stripeCustomerId ? { customer: req.user.stripeCustomerId } : { customer_email: req.user.email }),
      locale: 'auto',
      allow_promotion_codes: true,
      success_url: `${APP_URL}/?billing=success#account`,
      cancel_url: `${APP_URL}/?billing=cancel#account`,
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err.message);
    fail(res, 502, 'تعذّر بدء عملية الدفع');
  }
});

app.post('/api/billing/portal', auth, async (req, res) => {
  if (!stripe || !req.user.stripeCustomerId) return fail(res, 400, 'لا يوجد اشتراك لإدارته');
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: req.user.stripeCustomerId,
      return_url: `${APP_URL}/#account`,
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe portal error:', err.message);
    fail(res, 502, 'تعذّر فتح بوابة الاشتراك');
  }
});

// Local testing only: lets you try Pro features before Stripe keys are set.
app.post('/api/billing/demo-upgrade', auth, (req, res) => {
  if (stripeEnabled || IS_PROD) return fail(res, 404, 'غير متاح');
  req.user.plan = req.user.plan === 'pro' ? 'free' : 'pro';
  save();
  res.json({ user: publicUser(req.user) });
});

app.use('/api', (req, res) => fail(res, 404, 'غير موجود'));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => {
  console.log(`مُدير يعمل على ${APP_URL}`);
  console.log(`  OpenAI: ${openaiEnabled ? 'مفعّل' : 'تجريبي'} | Email: ${emailEnabled ? 'مفعّل' : 'تجريبي'} | Stripe: ${stripeEnabled ? 'مفعّل' : 'تجريبي'}`);
});
