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
    draftLimit: 'وصلت إلى الحد الشهري للباقة المجانية. اشترك في مُدير برو للاستمرار.',
    assistantEmpty: 'قل أو اكتب ما تريد',
    sendPartial: 'أُرسلت {sent} من {total} رسائل، ثم حدث خطأ.',
    tooManyRecipients: 'يمكن الإرسال إلى {max} شخصًا كحد أقصى في المرة الواحدة.',
    noRecipients: 'أضف مستلمًا واحدًا على الأقل',
    contactNotFound: 'جهة الاتصال غير موجودة',
    googleLoginFailed: 'تعذّر تسجيل الدخول عبر Google، حاول مرة أخرى.',
    aiUnavailable: 'تعذّر الاتصال بخدمة الذكاء الاصطناعي',
    proOnly: 'ترتيب الأولويات الذكي متاح في الباقة الاحترافية.',
    noOpenTasks: 'لا توجد مهام مفتوحة. أحسنت!',
    autoPlan: 'ترتيب تلقائي حسب الأولوية والتاريخ.',
    reasonOverdue: 'متأخرة عن موعدها',
    reasonHigh: 'أولوية عالية',
    reasonDate: 'حسب الموعد',
    gmailNotConnected: 'اربط حساب Gmail من الإعدادات لإرسال البريد مباشرة.',
    gmailReconnect: 'انتهت صلاحية ربط Gmail. يرجى ربطه من جديد من الإعدادات.',
    confirmRequired: 'يجب تأكيد الإرسال',
    recipientInvalid: 'بريد المستلم غير صالح',
    subjectBodyRequired: 'العنوان والنص مطلوبان',
    emailLimit: 'وصلت إلى الحد الشهري للرسائل في باقتك. اشترك في مُدير برو للاستمرار.',
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
    draftLimit: "You've reached this month's free limit. Upgrade to Mudir Pro to keep going.",
    assistantEmpty: 'Say or type what you need',
    sendPartial: 'Sent {sent} of {total} emails, then something went wrong.',
    tooManyRecipients: 'You can send to at most {max} people at once.',
    noRecipients: 'Add at least one recipient',
    contactNotFound: 'Contact not found',
    googleLoginFailed: "Couldn't sign in with Google. Please try again.",
    aiUnavailable: "Couldn't reach the AI service",
    proOnly: 'Smart prioritization is a Pro feature.',
    noOpenTasks: 'No open tasks. Nice work!',
    autoPlan: 'Sorted automatically by priority and date.',
    reasonOverdue: 'Overdue',
    reasonHigh: 'High priority',
    reasonDate: 'By due date',
    gmailNotConnected: 'Connect your Gmail in Settings to send email directly.',
    gmailReconnect: 'Your Gmail connection expired. Please reconnect it in Settings.',
    confirmRequired: 'Sending must be confirmed',
    recipientInvalid: "The recipient's email is not valid",
    subjectBodyRequired: 'Subject and message are required',
    emailLimit: "You've reached your plan's monthly email limit. Upgrade to Mudir Pro to keep going.",
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
// Fair-use caps, never shown in the UI; they only protect the OpenAI and Gmail quotas.
const PLANS = {
  free: { aiDrafts: 150, emails: 300, aiPlan: false },
  pro: { aiDrafts: 3000, emails: 5000, aiPlan: true },
};
const MAX_RECIPIENTS = 100;

function monthKey() {
  return new Date().toISOString().slice(0, 7);
}

function usage(user) {
  return user.usage_month === monthKey()
    ? { aiDrafts: user.usage_ai, emails: user.usage_emails }
    : { aiDrafts: 0, emails: 0 };
}

// Atomically counts uses, resetting both counters when a new month starts.
async function bumpUsage(userId, field, n = 1) {
  const ai = field === 'ai';
  return one(
    `UPDATE users SET
       usage_ai = CASE WHEN usage_month = $2 THEN usage_ai ELSE 0 END + $3,
       usage_emails = CASE WHEN usage_month = $2 THEN usage_emails ELSE 0 END + $4,
       usage_month = $2
     WHERE id = $1 RETURNING *`,
    [userId, monthKey(), ai ? n : 0, ai ? 0 : n],
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

// ---------- People ----------
function contactOut(r) {
  return { id: r.id, name: r.name, email: r.email, group: r.group_name };
}

function cleanContact(body) {
  return {
    name: String(body.name || '').trim().slice(0, 120),
    email: String(body.email || '').trim().toLowerCase().slice(0, 200),
    group: String(body.group || '').trim().slice(0, 60),
  };
}

app.get('/api/contacts', auth, h(async (req, res) => {
  const rows = await query('SELECT * FROM contacts WHERE user_id = $1 ORDER BY group_name, name', [req.user.id]);
  res.json({ contacts: rows.map(contactOut) });
}));

app.post('/api/contacts', auth, h(async (req, res) => {
  const c = cleanContact(req.body);
  if (!c.name) return fail(res, 400, msg(req, 'nameRequired'));
  if (!EMAIL_RE.test(c.email)) return fail(res, 400, msg(req, 'invalidEmail'));
  const row = await one('INSERT INTO contacts (id, user_id, name, email, group_name) VALUES ($1, $2, $3, $4, $5) RETURNING *', [
    id(), req.user.id, c.name, c.email, c.group,
  ]);
  res.json({ contact: contactOut(row) });
}));

// Paste a list: one person per line as "Name, email" (or just an email).
app.post('/api/contacts/import', auth, h(async (req, res) => {
  const group = String(req.body.group || '').trim().slice(0, 60);
  const existing = new Set((await query('SELECT email FROM contacts WHERE user_id = $1', [req.user.id])).map((r) => r.email));
  const added = [];
  for (const line of String(req.body.text || '').split(/\r?\n/).slice(0, 500)) {
    const email = (line.match(/[^\s,;<>]+@[^\s,;<>]+\.[^\s,;<>]+/) || [])[0]?.toLowerCase();
    if (!email || existing.has(email)) continue;
    const name = line.replace(email, '').replace(/[<>,;\t]+/g, ' ').trim() || email.split('@')[0];
    existing.add(email);
    added.push(await one('INSERT INTO contacts (id, user_id, name, email, group_name) VALUES ($1, $2, $3, $4, $5) RETURNING *', [
      id(), req.user.id, name.slice(0, 120), email, group,
    ]));
  }
  res.json({ added: added.map(contactOut) });
}));

app.patch('/api/contacts/:id', auth, h(async (req, res) => {
  const c = cleanContact(req.body);
  if (!c.name) return fail(res, 400, msg(req, 'nameRequired'));
  if (!EMAIL_RE.test(c.email)) return fail(res, 400, msg(req, 'invalidEmail'));
  const row = await one('UPDATE contacts SET name = $3, email = $4, group_name = $5 WHERE id = $1 AND user_id = $2 RETURNING *', [
    req.params.id, req.user.id, c.name, c.email, c.group,
  ]);
  if (!row) return fail(res, 404, msg(req, 'contactNotFound'));
  res.json({ contact: contactOut(row) });
}));

app.delete('/api/contacts/:id', auth, h(async (req, res) => {
  const rows = await query('DELETE FROM contacts WHERE id = $1 AND user_id = $2 RETURNING id', [req.params.id, req.user.id]);
  if (!rows.length) return fail(res, 404, msg(req, 'contactNotFound'));
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

// ---------- Ask Mudir (voice / text assistant) ----------
// The assistant only prepares: emails come back as drafts the user reviews and sends.
const normalize = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/[ً-ْـ]/g, '') // Arabic diacritics and tatweel
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي');

// Loose match for group names across Arabic/English forms ("الموظفون" ~ "موظفيني", "Employees" ~ "employee").
function mentionsGroup(text, group) {
  const g = normalize(group).replace(/^ال/, '').trim();
  if (!g) return false;
  const stem = g.length > 4 ? g.slice(0, Math.max(4, g.length - 2)) : g;
  return normalize(text).includes(stem);
}

function fallbackAssistant(text, contacts, tasks, lang, sender, today) {
  const isAr = lang === 'ar';
  if (/(email|e-mail|mail|message|send|write to|ايميل|إيميل|بريد|رساله|رسالة|ارسل|أرسل|راسل)/i.test(text)) {
    const groups = [...new Set(contacts.map((c) => c.group_name).filter(Boolean))].filter((g) => mentionsGroup(text, g));
    const named = contacts.filter((c) => normalize(text).includes(normalize(c.name.split(' ')[0])) && c.name.length > 1);
    const ids = new Set([...contacts.filter((c) => groups.includes(c.group_name)), ...named].map((c) => c.id));
    const n = ids.size;
    return {
      action: 'email',
      reply: isAr ? `جهّزت الرسالة إلى ${n} ${n === 1 ? 'شخص' : 'أشخاص'}. هل أرسلها؟` : `The email to ${n} ${n === 1 ? 'person' : 'people'} is ready. Should I send it?`,
      email: {
        recipients: [...ids],
        subject: isAr ? `رسالة من ${sender}` : `A message from ${sender}`,
        body: isAr ? `السلام عليكم،\n\n${text}\n\nمع التحية،\n${sender}` : `Hello,\n\n${text}\n\nBest regards,\n${sender}`,
      },
    };
  }
  if (/(remind|task|todo|meeting|appointment|add|ذكرني|مهمه|مهمة|موعد|اجتماع|اضف|أضف)/i.test(text)) {
    return { action: 'task', reply: isAr ? 'أضفت المهمة إلى تقويمك.' : 'Added to your calendar.', task: { title: text.slice(0, 200), date: today, time: '' } };
  }
  const upcoming = tasks.filter((t) => t.date >= today).slice(0, 5);
  return {
    action: 'answer',
    reply: upcoming.length
      ? (isAr ? 'القادم في تقويمك: ' : 'Coming up: ') + upcoming.map((t) => `${t.title} (${t.date})`).join('، ')
      : isAr ? 'تقويمك فارغ في الأيام القادمة.' : 'Your calendar is clear for the coming days.',
  };
}

app.post('/api/assistant', auth, h(async (req, res) => {
  const text = String(req.body.text || '').trim().slice(0, 1000);
  if (!text) return fail(res, 400, msg(req, 'assistantEmpty'));
  if (usage(req.user).aiDrafts >= PLANS[req.user.plan].aiDrafts) return fail(res, 402, msg(req, 'draftLimit'));
  const lang = langOf(req);
  const today = DATE_RE.test(req.body.today) ? req.body.today : new Date().toISOString().slice(0, 10);
  const contacts = await query('SELECT id, name, email, group_name FROM contacts WHERE user_id = $1 ORDER BY name LIMIT 500', [req.user.id]);
  const tasks = (await query(
    `SELECT * FROM tasks WHERE user_id = $1 AND NOT done AND date >= $2 ORDER BY date, time LIMIT 60`,
    [req.user.id, today],
  )).map(taskOut);

  let out;
  if (openaiEnabled) {
    const system =
      'You are Mudir (مُدير), the voice assistant inside a calendar and email app. Interpret the command and return JSON only:\n' +
      '{"action":"email"|"task"|"answer","reply":string,' +
      '"email":{"recipients":[contact ids],"addresses":[email addresses said explicitly],"unmatched":[names or groups you could not find],"subject":string,"body":string},' +
      '"task":{"title":string,"date":"YYYY-MM-DD" or "","time":"HH:MM" or ""}}\n' +
      'Rules:\n' +
      '- "email" when the user wants to email or message people. Pick recipients from the contacts by name or group; a group (e.g. "employees", "الموظفين", "my team") means every contact in that group. Match across Arabic and English, singular and plural, and with or without "my".\n' +
      '- Write the subject and body in the language of the command unless told otherwise: warm, clear, professional, ready to send, signed with the sender name. Do not invent facts; use placeholders like [date] only if essential.\n' +
      '- "reply" is one short spoken-style sentence in the UI language. For emails, say who it is for and end by asking whether to send it.\n' +
      '- "task" when the user wants a reminder, task or appointment. Resolve relative dates from today.\n' +
      '- "answer" for questions about their schedule; answer briefly from the tasks.';
    const prompt = JSON.stringify({
      command: text,
      today,
      uiLanguage: lang === 'en' ? 'English' : 'Arabic',
      sender: req.user.name,
      contacts: contacts.map((c) => ({ id: c.id, name: c.name, group: c.group_name })),
      upcomingTasks: tasks.map((t) => ({ title: t.title, date: t.date, time: t.time })),
    });
    try {
      out = await openaiJSON(system, prompt);
    } catch {
      return fail(res, 502, msg(req, 'aiUnavailable'));
    }
  } else {
    out = fallbackAssistant(text, contacts, tasks, lang, req.user.name, today);
  }

  const action = ['email', 'task', 'answer'].includes(out.action) ? out.action : 'answer';
  const result = { action, reply: String(out.reply || '').slice(0, 600) };

  if (action === 'email') {
    const ids = new Set(Array.isArray(out.email?.recipients) ? out.email.recipients : []);
    const picked = contacts.filter((c) => ids.has(c.id)).map((c) => ({ name: c.name, email: c.email }));
    const extra = (Array.isArray(out.email?.addresses) ? out.email.addresses : [])
      .map((a) => String(a).trim().toLowerCase())
      .filter((a) => EMAIL_RE.test(a) && !picked.some((p) => p.email === a))
      .map((a) => ({ name: a, email: a }));
    result.email = {
      recipients: [...picked, ...extra],
      unmatched: (Array.isArray(out.email?.unmatched) ? out.email.unmatched : []).map(String).slice(0, 10),
      subject: String(out.email?.subject || '').slice(0, 300),
      body: String(out.email?.body || '').slice(0, 10000),
    };
  } else if (action === 'task') {
    const title = String(out.task?.title || text).trim().slice(0, 200);
    const date = DATE_RE.test(out.task?.date) ? out.task.date : '';
    const time = TIME_RE.test(out.task?.time) ? out.task.time : '';
    const row = await one(
      `INSERT INTO tasks (id, user_id, title, date, time) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id(), req.user.id, title, date, time],
    );
    result.task = taskOut(row);
  }

  result.user = publicUser(await bumpUsage(req.user.id, 'ai'));
  res.json(result);
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

async function googleAuthUrl(state, { consent, loginHint } = {}) {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT,
    response_type: 'code',
    scope: `openid email profile ${GMAIL_SEND_SCOPE}`,
    access_type: 'offline',
    include_granted_scopes: 'true',
    prompt: consent ? 'consent' : 'select_account',
    state: jwt.sign(state, await getJwtSecret(), { expiresIn: '10m' }),
  });
  if (loginHint) params.set('login_hint', loginHint);
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

// Connect Gmail to an existing signed-in account.
app.get('/api/google/connect', auth, h(async (req, res) => {
  if (!googleEnabled) return fail(res, 400, msg(req, 'gmailOff'));
  res.redirect(await googleAuthUrl({ sub: req.user.id, purpose: 'google' }, { consent: true }));
}));

// "Continue with Google": signs in (or creates the account) and connects Gmail in one step.
app.get('/api/auth/google', h(async (req, res) => {
  if (!googleEnabled) return res.redirect('/');
  const ask = String(req.query.ask || '').slice(0, 1000);
  res.redirect(await googleAuthUrl({ purpose: 'login', ask }, { consent: req.query.consent === '1' }));
}));

app.get('/api/google/callback', h(async (req, res) => {
  let state;
  try {
    state = jwt.verify(String(req.query.state || ''), await getJwtSecret());
  } catch {
    return res.redirect('/?gmail=error');
  }
  const isLogin = state.purpose === 'login';
  const back = (result) =>
    res.redirect(`/?gmail=${result}${isLogin && state.ask ? `&ask=${encodeURIComponent(state.ask)}` : ''}${isLogin ? '' : '#settings'}`);
  if (req.query.error) return back(isLogin ? 'loginDenied' : 'denied');

  let user = null;
  if (!isLogin) {
    user = await sessionUser(req);
    if (!user || state.purpose !== 'google' || state.sub !== user.id) return back('error');
  }

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
  if (!r.ok || !tokens.id_token) {
    console.error('Google token exchange failed', r.status, tokens.error, tokens.error_description);
    return back('error');
  }
  // The id_token comes straight from Google over TLS, so its payload can be read without re-verifying.
  const claims = JSON.parse(Buffer.from(tokens.id_token.split('.')[1], 'base64url').toString('utf8'));
  // Google lets people untick individual permissions on the consent screen.
  const canSend = String(tokens.scope || '').split(' ').includes(GMAIL_SEND_SCOPE);

  if (isLogin) {
    if (!claims.email || claims.email_verified === false) return back('error');
    const email = claims.email.toLowerCase();
    user = await one('SELECT * FROM users WHERE google_email = $1 OR email = $1 ORDER BY (google_email = $1) DESC LIMIT 1', [email]);
    if (!user) {
      // Google-only accounts get an unusable random password; they always sign in with Google.
      user = await one(
        `INSERT INTO users (id, name, email, password_hash) VALUES ($1, $2, $3, $4)
         ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email RETURNING *`,
        [id(), String(claims.name || email.split('@')[0]).slice(0, 80), email, await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 10)],
      );
    }
    // Returning users who granted access before get no new refresh token unless consent is asked again.
    if (canSend && !tokens.refresh_token && !user.google_refresh_token) {
      return res.redirect(`/api/auth/google?consent=1${state.ask ? `&ask=${encodeURIComponent(state.ask)}` : ''}`);
    }
    await setSession(res, user);
  } else if (!tokens.refresh_token) {
    console.error('Google returned no refresh token for connect');
    return back('error');
  }

  if (!canSend) return back('noscope');
  if (tokens.refresh_token) {
    await query('UPDATE users SET google_email = $2, google_refresh_token = $3 WHERE id = $1', [
      user.id,
      claims.email,
      await encrypt(tokens.refresh_token),
    ]);
  }
  back(isLogin ? 'signedIn' : 'connected');
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

  // One address (`to`) or a group (`recipients`); each person gets their own copy.
  const list = Array.isArray(req.body.recipients) ? req.body.recipients : [req.body.to];
  const recipients = [...new Set(list.map((s) => String(s || '').trim().toLowerCase()).filter(Boolean))];
  const subject = String(req.body.subject || '').trim().slice(0, 300);
  const body = String(req.body.body || '').slice(0, 10000);
  if (!recipients.length) return fail(res, 400, msg(req, 'noRecipients'));
  if (recipients.length > MAX_RECIPIENTS) return fail(res, 400, msg(req, 'tooManyRecipients', { max: MAX_RECIPIENTS }));
  if (!recipients.every((r) => EMAIL_RE.test(r))) return fail(res, 400, msg(req, 'recipientInvalid'));
  if (!subject || !body.trim()) return fail(res, 400, msg(req, 'subjectBodyRequired'));

  const task = req.body.taskId ? await findTask(req.body.taskId, user.id) : null;
  if (usage(user).emails + recipients.length > PLANS[user.plan].emails) return fail(res, 402, msg(req, 'emailLimit'));

  const sent = [];
  let failure = null;
  try {
    const accessToken = await gmailAccessToken(user);
    for (const to of recipients) {
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
      sent.push(to);
    }
  } catch (err) {
    failure = err;
  }

  const rows = [];
  for (const to of sent) {
    rows.push(await one(
      `INSERT INTO emails (id, user_id, task_id, to_addr, subject, body, status) VALUES ($1, $2, $3, $4, $5, $6, 'sent') RETURNING *`,
      [id(), user.id, task?.id || null, to, subject, body],
    ));
  }
  if (task && rows.length) await query('UPDATE tasks SET last_email_at = $2 WHERE id = $1', [task.id, rows[0].sent_at]);
  const updated = sent.length ? await bumpUsage(user.id, 'email', sent.length) : user;

  if (failure) {
    if (failure instanceof GmailAuthError) {
      await query('UPDATE users SET google_refresh_token = NULL WHERE id = $1', [user.id]);
      return fail(res, 401, sent.length ? msg(req, 'sendPartial', { sent: sent.length, total: recipients.length }) : msg(req, 'gmailReconnect'));
    }
    console.error('Email error:', failure.message);
    return fail(res, 502, sent.length ? msg(req, 'sendPartial', { sent: sent.length, total: recipients.length }) : msg(req, 'sendFailed'));
  }
  res.json({ sent: sent.length, email: emailOut(rows[0]), user: publicUser(updated) });
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
