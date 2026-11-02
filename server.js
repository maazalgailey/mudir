require('dotenv').config();
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query, one, id } = require('./lib/db');

const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL);
// Vercel sets VERCEL_PROJECT_PRODUCTION_URL automatically, so APP_URL is only needed for a custom domain.
const APP_URL = (
  process.env.APP_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  `http://localhost:${PORT}`
).replace(/\/$/, '');

// Session signing secret: JWT_SECRET if set, otherwise generated once and kept in the database,
// so every server instance shares it without anyone handling the value.
let jwtSecret = process.env.JWT_SECRET || null;
async function getJwtSecret() {
  if (jwtSecret) return jwtSecret;
  await query('INSERT INTO app_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO NOTHING', [
    'jwt_secret',
    crypto.randomBytes(48).toString('hex'),
  ]);
  jwtSecret = (await one('SELECT value FROM app_settings WHERE key = $1', ['jwt_secret'])).value;
  return jwtSecret;
}

// ---------- Integrations ----------
const openaiEnabled = Boolean(process.env.OPENAI_API_KEY);
// gpt-4o-mini leaves the API on 2027-01-14; OpenAI names gpt-6-luna as its replacement.
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-6-luna';

const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
const GOOGLE_REDIRECT = `${APP_URL}/api/google/callback`;
const GMAIL_SEND_SCOPE = 'https://www.googleapis.com/auth/gmail.send';

const stripe = process.env.STRIPE_SECRET_KEY ? require('stripe')(process.env.STRIPE_SECRET_KEY) : null;
const stripeEnabled = Boolean(stripe && process.env.STRIPE_PRICE_ID);

// ---------- Messages (Arabic / English) ----------
const MSG = {
  ar: {
    loginRequired: 'يرجى تسجيل الدخول',
    nameRequired: 'الاسم مطلوب',
    invalidEmail: 'البريد الإلكتروني غير صالح',
    passwordShort: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
    emailTaken: 'هذا البريد مسجّل مسبقًا',
    badLogin: 'البريد أو كلمة المرور غير صحيحة',
    taskNotFound: 'المهمة غير موجودة',
    titleRequired: 'عنوان المهمة مطلوب',
    needDate: 'حدّد تاريخًا للمهمة أولًا',
    draftLimit: 'وصلت إلى حد {limit} صياغات هذا الشهر. اشترك في الباقة الاحترافية للمزيد.',
    aiUnavailable: 'تعذّر الاتصال بخدمة الذكاء الاصطناعي',
    proOnly: 'ترتيب الأولويات الذكي متاح في الباقة الاحترافية.',
    noOpenTasks: 'لا توجد مهام مفتوحة. أحسنت!',
    autoPlan: 'ترتيب تلقائي حسب الأولوية والتاريخ.',
    reasonOverdue: 'متأخرة عن موعدها',
    reasonHigh: 'أولوية عالية',
    reasonDate: 'حسب الموعد',
    gmailNotConnected: 'اربط حساب Gmail من صفحة الحساب لإرسال البريد مباشرة.',
    gmailReconnect: 'انتهت صلاحية ربط Gmail. يرجى ربطه من جديد من صفحة الحساب.',
    confirmRequired: 'يجب تأكيد الإرسال',
    recipientInvalid: 'بريد المستلم غير صالح',
    subjectBodyRequired: 'العنوان والنص مطلوبان',
    emailLimit: 'وصلت إلى حد {limit} رسالة بريد هذا الشهر.',
    sendFailed: 'تعذّر إرسال البريد، حاول مرة أخرى.',
    gmailOff: 'الإرسال عبر Gmail غير مفعّل على الخادم بعد.',
    billingOff: 'الدفع غير مفعّل على الخادم بعد.',
    checkoutFailed: 'تعذّر بدء عملية الدفع',
    noSubscription: 'لا يوجد اشتراك لإدارته',
    portalFailed: 'تعذّر فتح بوابة الاشتراك',
    notAvailable: 'غير متاح',
    notFound: 'غير موجود',
    serverError: 'حدث خطأ في الخادم، حاول مرة أخرى',
  },
  en: {
    loginRequired: 'Please sign in',
    nameRequired: 'Name is required',
    invalidEmail: 'Please enter a valid email address',
    passwordShort: 'Password must be at least 8 characters',
    emailTaken: 'This email is already registered',
    badLogin: 'Incorrect email or password',
    taskNotFound: 'Task not found',
    titleRequired: 'Task title is required',
    needDate: 'Set a date for this task first',
    draftLimit: "You've used all {limit} drafts this month. Upgrade to Pro for more.",
    aiUnavailable: "Couldn't reach the AI service",
    proOnly: 'Smart prioritization is a Pro feature.',
    noOpenTasks: 'No open tasks. Nice work!',
    autoPlan: 'Sorted automatically by priority and date.',
    reasonOverdue: 'Overdue',
    reasonHigh: 'High priority',
    reasonDate: 'By due date',
    gmailNotConnected: 'Connect your Gmail on the Account page to send email directly.',
    gmailReconnect: 'Your Gmail connection expired. Please reconnect it on the Account page.',
    confirmRequired: 'Sending must be confirmed',
    recipientInvalid: "The recipient's email is not valid",
    subjectBodyRequired: 'Subject and message are required',
    emailLimit: "You've reached {limit} emails this month.",
    sendFailed: "Couldn't send the email. Please try again.",
    gmailOff: 'Sending through Gmail is not enabled on the server yet.',
    billingOff: 'Payments are not enabled on the server yet.',
    checkoutFailed: "Couldn't start checkout",
    noSubscription: 'No subscription to manage',
    portalFailed: "Couldn't open the billing portal",
    notAvailable: 'Not available',
    notFound: 'Not found',
    serverError: 'Something went wrong. Please try again.',
  },
};

function langOf(req) {
  const l = req.get('x-lang') || req.acceptsLanguages('ar', 'en') || 'ar';
  return l === 'en' ? 'en' : 'ar';
}

function msg(req, key, vars = {}) {
  return MSG[langOf(req)][key].replace(/\{(\w+)\}/g, (_, k) => vars[k]);
}

// ---------- Plans ----------
const PLANS = {
  free: { aiDrafts: 10, emails: 20, aiPlan: false },
  pro: { aiDrafts: 500, emails: 1000, aiPlan: true },
};

function monthKey() {
  return new Date().toISOString().slice(0, 7);
}

function usage(user) {
  return user.usage_month === monthKey()
    ? { aiDrafts: user.usage_ai, emails: user.usage_emails }
    : { aiDrafts: 0, emails: 0 };
}

// Atomically counts one use, resetting both counters when a new month starts.
async function bumpUsage(userId, field) {
  const ai = field === 'ai';
  return one(
    `UPDATE users SET
       usage_ai = CASE WHEN usage_month = $2 THEN usage_ai ELSE 0 END + $3,
       usage_emails = CASE WHEN usage_month = $2 THEN usage_emails ELSE 0 END + $4,
       usage_month = $2
     WHERE id = $1 RETURNING *`,
    [userId, monthKey(), ai ? 1 : 0, ai ? 0 : 1],
  );
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    plan: user.plan,
    gmail: user.google_refresh_token ? user.google_email : null,
    hasBilling: Boolean(user.stripe_customer_id),
    usage: usage(user),
    limits: PLANS[user.plan],
  };
}

function taskOut(r) {
  return {
    id: r.id,
    userId: r.user_id,
    title: r.title,
    notes: r.notes,
    date: r.date,
    time: r.time,
    priority: r.priority,
    status: r.status,
    done: r.done,
    contactName: r.contact_name,
    contactEmail: r.contact_email,
    draft: r.draft,
    lastEmailAt: r.last_email_at,
    createdAt: r.created_at,
  };
}

function emailOut(r) {
  return { id: r.id, taskId: r.task_id, to: r.to_addr, subject: r.subject, body: r.body, status: r.status, sentAt: r.sent_at };
}

// ---------- App ----------
const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1); // behind the host's HTTPS proxy
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

// Express 4 does not catch rejected promises, so async routes go through this.
const h = (fn) => (req, res, next) => fn(req, res, next).catch(next);

app.get('/api/health', h(async (req, res) => {
  await query('SELECT 1');
  res.send('ok');
}));

// Stripe webhook needs the raw body, so it is registered before express.json().
app.post('/api/billing/webhook', express.raw({ type: 'application/json' }), h(async (req, res) => {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) return res.status(400).send('Stripe not configured');
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const obj = event.data.object;
  if (event.type === 'checkout.session.completed') {
    await query(`UPDATE users SET plan = 'pro', stripe_customer_id = $2, subscription_id = $3 WHERE id = $1`, [
      obj.client_reference_id,
      obj.customer,
      obj.subscription,
    ]);
  } else if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
    const active = ['active', 'trialing', 'past_due'].includes(obj.status) && event.type !== 'customer.subscription.deleted';
    await query('UPDATE users SET plan = $2, subscription_id = $3 WHERE stripe_customer_id = $1', [
      obj.customer,
      active ? 'pro' : 'free',
      obj.id,
    ]);
  }
  res.json({ received: true });
}));

app.use(express.json({ limit: '200kb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function fail(res, status, message) {
  return res.status(status).json({ error: message });
}

async function setSession(res, user) {
  const token = jwt.sign({ sub: user.id }, await getJwtSecret(), { expiresIn: '30d' });
  res.cookie('session', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: IS_PROD,
    maxAge: 30 * 24 * 3600 * 1000,
  });
}

async function sessionUser(req) {
  try {
    const { sub } = jwt.verify(req.cookies.session || '', await getJwtSecret());
    return await one('SELECT * FROM users WHERE id = $1', [sub]);
  } catch {
    return null;
  }
}

const auth = h(async (req, res, next) => {
  req.user = await sessionUser(req);
  if (!req.user) return fail(res, 401, msg(req, 'loginRequired'));
  next();
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

// ---------- Config ----------
app.get('/api/config', (req, res) => {
  res.json({
    integrations: { openai: openaiEnabled, gmail: googleEnabled, stripe: stripeEnabled },
    demoUpgrade: !stripeEnabled && !IS_PROD,
    proPrice: process.env.PRO_PRICE || '$9',
    plans: PLANS,
    // Which commit is live, so a deploy can be confirmed from outside.
    version: (process.env.VERCEL_GIT_COMMIT_SHA || 'local').slice(0, 7),
  });
});

// ---------- Auth ----------
app.post('/api/auth/register', h(async (req, res) => {
  const name = String(req.body.name || '').trim().slice(0, 80);
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  if (!name) return fail(res, 400, msg(req, 'nameRequired'));
  if (!EMAIL_RE.test(email)) return fail(res, 400, msg(req, 'invalidEmail'));
  if (password.length < 8) return fail(res, 400, msg(req, 'passwordShort'));

  const user = await one(
    `INSERT INTO users (id, name, email, password_hash) VALUES ($1, $2, $3, $4)
     ON CONFLICT (email) DO NOTHING RETURNING *`,
    [id(), name, email, await bcrypt.hash(password, 10)],
  );
  if (!user) return fail(res, 409, msg(req, 'emailTaken'));
  await setSession(res, user);
  res.json({ user: publicUser(user) });
}));

app.post('/api/auth/login', h(async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const user = await one('SELECT * FROM users WHERE email = $1', [email]);
  if (!user || !(await bcrypt.compare(String(req.body.password || ''), user.password_hash))) {
    return fail(res, 401, msg(req, 'badLogin'));
  }
  await setSession(res, user);
  res.json({ user: publicUser(user) });
}));

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('session');
  res.json({ ok: true });
});

app.get('/api/me', auth, (req, res) => res.json({ user: publicUser(req.user) }));

app.patch('/api/me', auth, h(async (req, res) => {
  let user = req.user;
  if (typeof req.body.name === 'string' && req.body.name.trim()) {
    user = await one('UPDATE users SET name = $2 WHERE id = $1 RETURNING *', [user.id, req.body.name.trim().slice(0, 80)]);
  }
  res.json({ user: publicUser(user) });
}));

// ---------- Tasks ----------
function cleanTask(body, existing = {}) {
  const t = { ...existing };
  if ('title' in body) t.title = String(body.title || '').trim().slice(0, 200);
  if ('notes' in body) t.notes = String(body.notes || '').slice(0, 4000);
  if ('date' in body) t.date = DATE_RE.test(body.date) ? body.date : '';
  if ('time' in body) t.time = TIME_RE.test(body.time) ? body.time : '';
  if ('priority' in body) t.priority = ['high', 'medium', 'low'].includes(body.priority) ? body.priority : 'medium';
  if ('status' in body && ['todo', 'doing', 'done'].includes(body.status)) {
    t.status = body.status;
    t.done = body.status === 'done';
  } else if ('done' in body) {
    t.done = Boolean(body.done);
    t.status = t.done ? 'done' : t.status === 'done' ? 'todo' : t.status;
  }
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

async function findTask(taskId, userId) {
  const row = await one('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [taskId, userId]);
  return row && taskOut(row);
}

async function saveTask(t) {
  const row = await one(
    `UPDATE tasks SET title = $2, notes = $3, date = $4, time = $5, priority = $6, done = $7,
       contact_name = $8, contact_email = $9, draft = $10, status = $11, updated_at = now()
     WHERE id = $1 RETURNING *`,
    [t.id, t.title, t.notes, t.date, t.time, t.priority, t.done, t.contactName, t.contactEmail, t.draft ? JSON.stringify(t.draft) : null, t.status],
  );
  return taskOut(row);
}

app.get('/api/tasks', auth, h(async (req, res) => {
  const rows = await query(
    `SELECT * FROM tasks WHERE user_id = $1
     ORDER BY COALESCE(NULLIF(date, ''), '9999'), time, created_at`,
    [req.user.id],
  );
  res.json({ tasks: rows.map(taskOut) });
}));

app.post('/api/tasks', auth, h(async (req, res) => {
  const t = cleanTask(req.body, { priority: 'medium', status: 'todo', done: false, date: '', time: '', notes: '', contactName: '', contactEmail: '' });
  if (!t.title) return fail(res, 400, msg(req, 'titleRequired'));
  const row = await one(
    `INSERT INTO tasks (id, user_id, title, notes, date, time, priority, done, contact_name, contact_email, draft, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
    [id(), req.user.id, t.title, t.notes, t.date, t.time, t.priority, t.done, t.contactName, t.contactEmail, t.draft ? JSON.stringify(t.draft) : null, t.status],
  );
  res.json({ task: taskOut(row) });
}));

app.patch('/api/tasks/:id', auth, h(async (req, res) => {
  const task = await findTask(req.params.id, req.user.id);
  if (!task) return fail(res, 404, msg(req, 'taskNotFound'));
  const updated = cleanTask(req.body, task);
  if (!updated.title) return fail(res, 400, msg(req, 'titleRequired'));
  res.json({ task: await saveTask(updated) });
}));

app.delete('/api/tasks/:id', auth, h(async (req, res) => {
  const rows = await query('DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING id', [req.params.id, req.user.id]);
  if (!rows.length) return fail(res, 404, msg(req, 'taskNotFound'));
  res.json({ ok: true });
}));

// ---------- Calendar (.ics) ----------
function icsEscape(s) {
  return String(s || '').replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/[,;]/g, (m) => '\\' + m);
}

function icsEvent(t) {
  const d = t.date.replace(/-/g, '');
  const lines = ['BEGIN:VEVENT', `UID:${t.id}@mudir`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`];
  if (t.time) {
    const [hh, m] = t.time.split(':').map(Number);
    const end = `${String(Math.min(hh + 1, 23)).padStart(2, '0')}${String(m).padStart(2, '0')}00`;
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

app.get('/api/calendar.ics', auth, h(async (req, res) => {
  const rows = await query(`SELECT * FROM tasks WHERE user_id = $1 AND date <> '' AND NOT done`, [req.user.id]);
  sendIcs(res, rows.map(taskOut), 'mudir-tasks.ics');
}));

app.get('/api/tasks/:id/ics', auth, h(async (req, res) => {
  const task = await findTask(req.params.id, req.user.id);
  if (!task) return fail(res, 404, msg(req, 'taskNotFound'));
  if (!task.date) return fail(res, 400, msg(req, 'needDate'));
  sendIcs(res, [task], 'mudir-task.ics');
}));

// ---------- AI ----------
class AIError extends Error {}

// Internal details go to the server log only; users get a translated message.
async function openaiJSON(system, user) {
  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY.trim()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      }),
    });
    if (!r.ok) {
      console.error('OpenAI error', r.status, await r.text());
      throw new AIError();
    }
    const json = await r.json();
    return JSON.parse(json.choices[0].message.content);
  } catch (err) {
    if (!(err instanceof AIError)) console.error('OpenAI request failed:', err.message);
    throw new AIError();
  }
}

const TONES = { formal: 'formal and professional', friendly: 'warm and friendly', brief: 'short and direct' };

function demoDraft({ kind, lang, recipient, task, sender }) {
  const when = task.date ? `${task.date}${task.time ? ' ' + task.time : ''}` : '';
  if (lang === 'en') {
    const greet = recipient ? `Hello ${recipient},` : 'Hello,';
    return kind === 'email'
      ? { subject: task.title, body: `${greet}\n\nI'm reaching out regarding: ${task.title}${when ? ` (${when})` : ''}.\n${task.notes ? '\n' + task.notes + '\n' : ''}\nI look forward to hearing from you.\n\nBest regards,\n${sender}` }
      : { subject: '', body: `${greet} about ${task.title}${when ? ` (${when})` : ''}. ${task.notes || ''}\nThanks — ${sender}` };
  }
  const greet = recipient ? `السلام عليكم ${recipient}،` : 'السلام عليكم،';
  return kind === 'email'
    ? { subject: task.title, body: `${greet}\n\nأتواصل معكم بخصوص: ${task.title}${when ? ` بتاريخ ${when}` : ''}.\n${task.notes ? '\n' + task.notes + '\n' : ''}\nأرجو التكرّم بالاطلاع والرد في أقرب فرصة.\n\nمع خالص التحية،\n${sender}` }
    : { subject: '', body: `${greet} بخصوص ${task.title}${when ? ` بتاريخ ${when}` : ''}. ${task.notes || ''}\nشكرًا لك — ${sender}` };
}

app.post('/api/ai/draft', auth, h(async (req, res) => {
  const task = await findTask(req.body.taskId, req.user.id);
  if (!task) return fail(res, 404, msg(req, 'taskNotFound'));
  const limit = PLANS[req.user.plan].aiDrafts;
  if (usage(req.user).aiDrafts >= limit) return fail(res, 402, msg(req, 'draftLimit', { limit }));

  const kind = req.body.kind === 'message' ? 'message' : 'email';
  const tone = TONES[req.body.tone] || TONES.formal;
  const recipient = String(req.body.contactName ?? task.contactName ?? '').trim().slice(0, 120);
  const instructions = String(req.body.instructions || '').slice(0, 1000);
  const lang = req.body.lang === 'en' ? 'en' : 'ar';

  let draft;
  if (openaiEnabled) {
    const system =
      'You are Mudir, an assistant that drafts professional emails and short messages for busy people. ' +
      'Return JSON {"subject": string, "body": string}. For messages (chat/WhatsApp), subject may be empty and body should be short. ' +
      'Do not invent facts, prices, attachments or commitments that are not given; leave clear placeholders like [date] when needed. ' +
      'Sign off with the sender name.';
    const prompt = [
      `Write a ${kind === 'email' ? 'email' : 'short chat message'} in ${lang === 'en' ? 'English' : 'Arabic (Modern Standard, natural)'}.`,
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
    } catch {
      return fail(res, 502, msg(req, 'aiUnavailable'));
    }
  } else {
    draft = { ...demoDraft({ kind, lang, recipient, task, sender: req.user.name }), demo: true };
  }

  const user = await bumpUsage(req.user.id, 'ai');
  await saveTask({ ...task, contactName: recipient, draft: { subject: draft.subject, body: draft.body, kind } });
  res.json({ draft: { ...draft, kind }, user: publicUser(user) });
}));

app.post('/api/ai/plan', auth, h(async (req, res) => {
  if (!PLANS[req.user.plan].aiPlan) return fail(res, 402, msg(req, 'proOnly'));
  const open = (await query('SELECT * FROM tasks WHERE user_id = $1 AND NOT done ORDER BY created_at LIMIT 60', [req.user.id])).map(taskOut);
  if (!open.length) return res.json({ plan: [], summary: msg(req, 'noOpenTasks') });
  const today = new Date().toISOString().slice(0, 10);

  if (!openaiEnabled) {
    const rank = { high: 0, medium: 1, low: 2 };
    const sorted = [...open].sort(
      (a, b) => rank[a.priority] - rank[b.priority] || (a.date || '9999').localeCompare(b.date || '9999'),
    );
    return res.json({
      summary: msg(req, 'autoPlan'),
      plan: sorted.map((t) => ({
        id: t.id,
        reason: msg(req, t.date && t.date < today ? 'reasonOverdue' : t.priority === 'high' ? 'reasonHigh' : 'reasonDate'),
      })),
    });
  }

  const language = langOf(req) === 'en' ? 'English' : 'Arabic';
  try {
    const out = await openaiJSON(
      "You are a productivity coach. Order the user's open tasks by what deserves attention first, considering due dates, overdue items, priority, and dependencies implied by the text. " +
        `Return JSON {"summary": string (${language}, 1-2 sentences of advice for today), "plan": [{"id": string, "reason": string (${language}, under 12 words)}]}. Include every task id exactly once.`,
      `Today is ${today}.\nTasks:\n` +
        JSON.stringify(open.map((t) => ({ id: t.id, title: t.title, notes: t.notes, date: t.date, time: t.time, priority: t.priority }))),
    );
    const ids = new Set(open.map((t) => t.id));
    const plan = (Array.isArray(out.plan) ? out.plan : []).filter((p) => ids.has(p.id));
    res.json({ summary: String(out.summary || ''), plan });
  } catch {
    fail(res, 502, msg(req, 'aiUnavailable'));
  }
}));

// ---------- Gmail (send from the signed-in user's own account) ----------
// Refresh tokens are stored encrypted with a key derived from the session secret.
async function tokenKey() {
  return crypto.createHash('sha256').update(`${await getJwtSecret()}:google-refresh-token`).digest();
}

async function encrypt(text) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', await tokenKey(), iv);
  const data = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return [iv, cipher.getAuthTag(), data].map((b) => b.toString('base64')).join('.');
}

async function decrypt(blob) {
  const [iv, tag, data] = blob.split('.').map((s) => Buffer.from(s, 'base64'));
  const decipher = crypto.createDecipheriv('aes-256-gcm', await tokenKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8');
}

app.get('/api/google/connect', auth, h(async (req, res) => {
  if (!googleEnabled) return fail(res, 400, msg(req, 'gmailOff'));
  const state = jwt.sign({ sub: req.user.id, purpose: 'google' }, await getJwtSecret(), { expiresIn: '10m' });
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT,
    response_type: 'code',
    scope: `openid email ${GMAIL_SEND_SCOPE}`,
    access_type: 'offline',
    prompt: 'consent',
    state,
  });
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
}));

app.get('/api/google/callback', h(async (req, res) => {
  const back = (result) => res.redirect(`/?gmail=${result}#account`);
  if (req.query.error) return back('denied');

  const user = await sessionUser(req);
  let state;
  try {
    state = jwt.verify(String(req.query.state || ''), await getJwtSecret());
  } catch {
    return back('error');
  }
  if (!user || state.purpose !== 'google' || state.sub !== user.id) return back('error');

  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code: String(req.query.code || ''),
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT,
      grant_type: 'authorization_code',
    }),
  });
  const tokens = await r.json();
  if (!r.ok || !tokens.refresh_token) {
    console.error('Google token exchange failed', r.status, tokens.error, tokens.error_description);
    return back('error');
  }
  // Google lets people untick individual permissions on the consent screen.
  if (!String(tokens.scope || '').split(' ').includes(GMAIL_SEND_SCOPE)) return back('noscope');

  // The id_token comes straight from Google over TLS, so its payload can be read without re-verifying.
  const claims = JSON.parse(Buffer.from(tokens.id_token.split('.')[1], 'base64url').toString('utf8'));
  await query('UPDATE users SET google_email = $2, google_refresh_token = $3 WHERE id = $1', [
    user.id,
    claims.email,
    await encrypt(tokens.refresh_token),
  ]);
  back('connected');
}));

app.post('/api/google/disconnect', auth, h(async (req, res) => {
  if (req.user.google_refresh_token) {
    try {
      const token = await decrypt(req.user.google_refresh_token);
      await fetch(`https://oauth2.googleapis.com/revoke?token=${encodeURIComponent(token)}`, { method: 'POST' });
    } catch (err) {
      console.error('Google revoke failed:', err.message);
    }
  }
  const user = await one('UPDATE users SET google_email = NULL, google_refresh_token = NULL WHERE id = $1 RETURNING *', [req.user.id]);
  res.json({ user: publicUser(user) });
}));

class GmailAuthError extends Error {}

async function gmailAccessToken(user) {
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: await decrypt(user.google_refresh_token),
      grant_type: 'refresh_token',
    }),
  });
  const json = await r.json();
  if (!r.ok) {
    console.error('Google refresh failed', r.status, json.error);
    if (json.error === 'invalid_grant') throw new GmailAuthError();
    throw new Error('refresh failed');
  }
  return json.access_token;
}

function b64(s) {
  return Buffer.from(s, 'utf8').toString('base64');
}

// RFC 2047 encoded-word for non-ASCII (and any CR/LF, which blocks header injection).
function encodeHeader(s) {
  return /^[\x20-\x7e]*$/.test(s) ? s : `=?UTF-8?B?${b64(s)}?=`;
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildMime({ fromName, fromEmail, to, subject, text }) {
  const dir = /[\u0600-\u06FF]/.test(text) ? 'rtl' : 'ltr';
  const html = `<div dir="${dir}" style="font-family:Tahoma,Arial,sans-serif;font-size:15px;line-height:1.8;white-space:pre-wrap">${escapeHtml(text)}</div>`;
  const boundary = `mudir_${crypto.randomBytes(8).toString('hex')}`;
  const wrap = (s) => s.match(/.{1,76}/g).join('\r\n');
  return [
    `From: ${encodeHeader(fromName)} <${fromEmail}>`,
    `To: ${to}`,
    `Subject: ${encodeHeader(subject)}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    wrap(b64(text)),
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    wrap(b64(html)),
    `--${boundary}--`,
    '',
  ].join('\r\n');
}

app.post('/api/email/send', auth, h(async (req, res) => {
  const user = req.user;
  if (!googleEnabled) return fail(res, 400, msg(req, 'gmailOff'));
  if (!user.google_refresh_token) return fail(res, 403, msg(req, 'gmailNotConnected'));
  if (req.body.confirm !== true) return fail(res, 400, msg(req, 'confirmRequired'));

  const to = String(req.body.to || '').trim();
  const subject = String(req.body.subject || '').trim().slice(0, 300);
  const body = String(req.body.body || '').slice(0, 10000);
  if (!EMAIL_RE.test(to)) return fail(res, 400, msg(req, 'recipientInvalid'));
  if (!subject || !body.trim()) return fail(res, 400, msg(req, 'subjectBodyRequired'));

  const task = req.body.taskId ? await findTask(req.body.taskId, user.id) : null;
  const limit = PLANS[user.plan].emails;
  if (usage(user).emails >= limit) return fail(res, 402, msg(req, 'emailLimit', { limit }));

  try {
    const accessToken = await gmailAccessToken(user);
    const raw = Buffer.from(buildMime({ fromName: user.name, fromEmail: user.google_email, to, subject, text: body })).toString('base64url');
    const r = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ raw }),
    });
    if (!r.ok) {
      console.error('Gmail send failed', r.status, await r.text());
      if (r.status === 401 || r.status === 403) throw new GmailAuthError();
      throw new Error('send failed');
    }
  } catch (err) {
    if (err instanceof GmailAuthError) {
      await query('UPDATE users SET google_refresh_token = NULL WHERE id = $1', [user.id]);
      return fail(res, 401, msg(req, 'gmailReconnect'));
    }
    console.error('Email error:', err.message);
    return fail(res, 502, msg(req, 'sendFailed'));
  }

  const row = await one(
    `INSERT INTO emails (id, user_id, task_id, to_addr, subject, body, status) VALUES ($1, $2, $3, $4, $5, $6, 'sent') RETURNING *`,
    [id(), user.id, task?.id || null, to, subject, body],
  );
  if (task) await query('UPDATE tasks SET last_email_at = $2 WHERE id = $1', [task.id, row.sent_at]);
  const updated = await bumpUsage(user.id, 'email');
  res.json({ email: emailOut(row), user: publicUser(updated) });
}));

app.get('/api/email/log', auth, h(async (req, res) => {
  const rows = await query('SELECT * FROM emails WHERE user_id = $1 ORDER BY sent_at DESC LIMIT 100', [req.user.id]);
  res.json({ emails: rows.map(emailOut) });
}));

// ---------- Billing ----------
app.post('/api/billing/checkout', auth, h(async (req, res) => {
  if (!stripeEnabled) return fail(res, 400, msg(req, 'billingOff'));
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      client_reference_id: req.user.id,
      ...(req.user.stripe_customer_id ? { customer: req.user.stripe_customer_id } : { customer_email: req.user.email }),
      locale: langOf(req),
      allow_promotion_codes: true,
      success_url: `${APP_URL}/?billing=success#account`,
      cancel_url: `${APP_URL}/?billing=cancel#account`,
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err.message);
    fail(res, 502, msg(req, 'checkoutFailed'));
  }
}));

app.post('/api/billing/portal', auth, h(async (req, res) => {
  if (!stripe || !req.user.stripe_customer_id) return fail(res, 400, msg(req, 'noSubscription'));
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: req.user.stripe_customer_id,
      return_url: `${APP_URL}/#account`,
      locale: langOf(req),
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe portal error:', err.message);
    fail(res, 502, msg(req, 'portalFailed'));
  }
}));

// Local testing only: lets you try Pro features before Stripe keys are set.
app.post('/api/billing/demo-upgrade', auth, h(async (req, res) => {
  if (stripeEnabled || IS_PROD) return fail(res, 404, msg(req, 'notAvailable'));
  const user = await one('UPDATE users SET plan = $2 WHERE id = $1 RETURNING *', [
    req.user.id,
    req.user.plan === 'pro' ? 'free' : 'pro',
  ]);
  res.json({ user: publicUser(user) });
}));

app.use('/api', (req, res) => fail(res, 404, msg(req, 'notFound')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  fail(res, 500, msg(req, 'serverError'));
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Mudir running at ${APP_URL}`);
    console.log(`  OpenAI: ${openaiEnabled ? 'on' : 'demo'} | Gmail: ${googleEnabled ? 'on' : 'off'} | Stripe: ${stripeEnabled ? 'on' : 'demo'}`);
  });
}
