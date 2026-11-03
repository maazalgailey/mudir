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
// Speech-to-text, tried in order. gpt-transcribe is OpenAI's named successor to the
// gpt-4o transcribe models; the others are fallbacks if a model is unavailable to the key.
const TRANSCRIBE_MODELS = [...new Set([process.env.OPENAI_TRANSCRIBE_MODEL, 'gpt-transcribe', 'gpt-4o-transcribe', 'whisper-1'].filter(Boolean))];

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
    noSpeechHeard: 'لم أسمع شيئًا، حاول مرة أخرى',
    notOnMudir: 'لا يوجد حساب في مُدير بهذا البريد بعد. أرسل له دعوة للانضمام.',
    cantConnectSelf: 'هذا بريدك أنت',
    connectionNotFound: 'طلب الاتصال غير موجود',
    notConnected: 'يمكنك دعوة الأشخاص المتصلين بك في مُدير فقط',
    meetingNotFound: 'الاجتماع غير موجود',
    onlyOrganizer: 'منظّم الاجتماع فقط يمكنه ذلك',
    invalidDate: 'التاريخ أو الوقت غير صالح',
    alreadyDone: 'تم تنفيذ هذا مسبقًا، لن يُكرَّر',
    transcribeFailed: 'تعذّر تحويل الصوت إلى نص، حاول مرة أخرى',
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
    noSpeechHeard: "I didn't hear anything. Please try again.",
    notOnMudir: "There's no Mudir account with this email yet. Send them an invite to join.",
    cantConnectSelf: "That's your own email",
    connectionNotFound: 'Connection request not found',
    notConnected: 'You can only invite people you are connected with on Mudir',
    meetingNotFound: 'Meeting not found',
    onlyOrganizer: 'Only the organizer can do that',
    invalidDate: 'The date or time is not valid',
    alreadyDone: 'This was already done, so it was not repeated',
    transcribeFailed: "Couldn't turn your voice into text. Please try again.",
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

// ---------- Activity log and one-time action keys ----------
async function audit(userId, action, detail = {}) {
  try {
    await query('INSERT INTO audit_log (id, user_id, action, detail) VALUES ($1, $2, $3, $4)', [id(), userId, action, JSON.stringify(detail)]);
  } catch (err) {
    console.error('Audit log failed:', err.message);
  }
}

// Returns false when this key was already used, so a double tap or retry never repeats an action.
async function claimKey(userId, key) {
  if (!key) return true;
  const rows = await query('INSERT INTO action_keys (user_id, key) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING key', [userId, String(key).slice(0, 100)]);
  return rows.length > 0;
}
async function releaseKey(userId, key) {
  if (key) await query('DELETE FROM action_keys WHERE user_id = $1 AND key = $2', [userId, String(key).slice(0, 100)]);
}

// ---------- Connections (other Mudir accounts) ----------
async function connectionsOf(userId) {
  return query(
    `SELECT c.id, c.status, c.requester_id, c.created_at, u.id AS other_id, u.name AS other_name, u.email AS other_email
     FROM connections c
     JOIN users u ON u.id = CASE WHEN c.requester_id = $1 THEN c.addressee_id ELSE c.requester_id END
     WHERE c.requester_id = $1 OR c.addressee_id = $1
     ORDER BY u.name`,
    [userId],
  );
}

async function connectedUsers(userId) {
  return (await connectionsOf(userId)).filter((c) => c.status === 'accepted').map((c) => ({ id: c.other_id, name: c.other_name, email: c.other_email }));
}

function connectionOut(c, userId) {
  return {
    id: c.id,
    status: c.status,
    direction: c.requester_id === userId ? 'out' : 'in',
    user: { id: c.other_id, name: c.other_name, email: c.other_email },
  };
}

app.get('/api/connections', auth, h(async (req, res) => {
  res.json({ connections: (await connectionsOf(req.user.id)).map((c) => connectionOut(c, req.user.id)) });
}));

app.post('/api/connections', auth, h(async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return fail(res, 400, msg(req, 'invalidEmail'));
  const other = await one('SELECT id, name, email FROM users WHERE email = $1 OR google_email = $1 LIMIT 1', [email]);
  if (!other) return fail(res, 404, msg(req, 'notOnMudir'));
  if (other.id === req.user.id) return fail(res, 400, msg(req, 'cantConnectSelf'));
  const existing = await one(
    'SELECT * FROM connections WHERE (requester_id = $1 AND addressee_id = $2) OR (requester_id = $2 AND addressee_id = $1)',
    [req.user.id, other.id],
  );
  if (existing) {
    // They already asked us: sending a request back simply accepts theirs.
    if (existing.status === 'pending' && existing.addressee_id === req.user.id) {
      await query(`UPDATE connections SET status = 'accepted' WHERE id = $1`, [existing.id]);
      await audit(req.user.id, 'connection.accept', { with: other.id });
    }
  } else {
    await query('INSERT INTO connections (id, requester_id, addressee_id) VALUES ($1, $2, $3)', [id(), req.user.id, other.id]);
    await audit(req.user.id, 'connection.request', { to: other.id });
  }
  res.json({ connections: (await connectionsOf(req.user.id)).map((c) => connectionOut(c, req.user.id)) });
}));

app.post('/api/connections/:id/accept', auth, h(async (req, res) => {
  const rows = await query(`UPDATE connections SET status = 'accepted' WHERE id = $1 AND addressee_id = $2 RETURNING id`, [req.params.id, req.user.id]);
  if (!rows.length) return fail(res, 404, msg(req, 'connectionNotFound'));
  await audit(req.user.id, 'connection.accept', { connection: req.params.id });
  res.json({ connections: (await connectionsOf(req.user.id)).map((c) => connectionOut(c, req.user.id)) });
}));

// Decline, cancel or remove, by either side.
app.delete('/api/connections/:id', auth, h(async (req, res) => {
  const rows = await query('DELETE FROM connections WHERE id = $1 AND (requester_id = $2 OR addressee_id = $2) RETURNING id', [req.params.id, req.user.id]);
  if (!rows.length) return fail(res, 404, msg(req, 'connectionNotFound'));
  await audit(req.user.id, 'connection.remove', { connection: req.params.id });
  res.json({ connections: (await connectionsOf(req.user.id)).map((c) => connectionOut(c, req.user.id)) });
}));

// ---------- Meetings ----------
const toMin = (time) => (TIME_RE.test(time) ? Number(time.slice(0, 2)) * 60 + Number(time.slice(3)) : null);

async function meetingsFor(userId, from, to) {
  const rows = await query(
    `SELECT m.*, o.name AS organizer_name,
       COALESCE(json_agg(json_build_object('id', a.user_id, 'name', au.name, 'response', a.response)) FILTER (WHERE a.user_id IS NOT NULL), '[]') AS attendees
     FROM meetings m
     JOIN users o ON o.id = m.organizer_id
     LEFT JOIN meeting_attendees a ON a.meeting_id = m.id
     LEFT JOIN users au ON au.id = a.user_id
     WHERE m.status = 'active' AND m.date >= $2 AND m.date <= $3
       AND (m.organizer_id = $1 OR EXISTS (SELECT 1 FROM meeting_attendees x WHERE x.meeting_id = m.id AND x.user_id = $1))
     GROUP BY m.id, o.name
     ORDER BY m.date, m.time`,
    [userId, from, to],
  );
  return rows.map((m) => meetingOut(m, userId));
}

function meetingOut(m, userId) {
  const attendees = typeof m.attendees === 'string' ? JSON.parse(m.attendees) : m.attendees || [];
  const mine = attendees.find((a) => a.id === userId);
  return {
    id: m.id,
    title: m.title,
    notes: m.notes,
    date: m.date,
    time: m.time,
    durationMin: m.duration_min,
    location: m.location,
    organizer: { id: m.organizer_id, name: m.organizer_name },
    isOrganizer: m.organizer_id === userId,
    myResponse: m.organizer_id === userId ? 'accepted' : mine?.response || 'pending',
    attendees,
  };
}

// Clashes for everyone involved. Other people's items only ever show as "busy", never their titles.
async function findConflicts(me, { date, time, durationMin }, participantIds, excludeMeetingId = null) {
  const start = toMin(time);
  if (start == null || !DATE_RE.test(date)) return [];
  const end = start + (durationMin || 30);
  const overlaps = (t, dur) => {
    const s = toMin(t);
    return s != null && s < end && s + dur > start;
  };
  const conflicts = [];
  for (const uid of [...new Set(participantIds)]) {
    const person = uid === me.id ? me : await one('SELECT id, name FROM users WHERE id = $1', [uid]);
    if (!person) continue;
    for (const m of await meetingsFor(uid, date, date)) {
      if (m.id === excludeMeetingId || m.myResponse === 'declined' || !overlaps(m.time, m.durationMin)) continue;
      conflicts.push({ userId: uid, name: person.name, time: m.time, title: uid === me.id ? m.title : null });
    }
    for (const t of await query(`SELECT title, time FROM tasks WHERE user_id = $1 AND date = $2 AND time <> '' AND NOT done`, [uid, date])) {
      if (overlaps(t.time, 30)) conflicts.push({ userId: uid, name: person.name, time: t.time, title: uid === me.id ? t.title : null });
    }
  }
  return conflicts;
}

function cleanMeeting(body) {
  return {
    title: String(body.title || '').trim().slice(0, 200),
    notes: String(body.notes || '').slice(0, 4000),
    date: String(body.date || ''),
    time: String(body.time || ''),
    durationMin: Math.min(Math.max(parseInt(body.durationMin, 10) || 30, 5), 600),
    location: String(body.location || '').trim().slice(0, 200),
    attendeeIds: [...new Set((Array.isArray(body.attendeeIds) ? body.attendeeIds : []).map(String))].slice(0, 50),
  };
}

app.get('/api/meetings', auth, h(async (req, res) => {
  const from = DATE_RE.test(req.query.from) ? req.query.from : '0000-01-01';
  const to = DATE_RE.test(req.query.to) ? req.query.to : '9999-12-31';
  res.json({ meetings: await meetingsFor(req.user.id, from, to) });
}));

app.post('/api/meetings/check', auth, h(async (req, res) => {
  const m = cleanMeeting(req.body);
  res.json({ conflicts: await findConflicts(req.user, m, [req.user.id, ...m.attendeeIds]) });
}));

app.post('/api/meetings', auth, h(async (req, res) => {
  const m = cleanMeeting(req.body);
  if (!m.title) return fail(res, 400, msg(req, 'titleRequired'));
  if (!DATE_RE.test(m.date) || (m.time && !TIME_RE.test(m.time))) return fail(res, 400, msg(req, 'invalidDate'));
  const allowed = new Set((await connectedUsers(req.user.id)).map((u) => u.id));
  if (!m.attendeeIds.length || !m.attendeeIds.every((a) => allowed.has(a))) return fail(res, 400, msg(req, 'notConnected'));
  if (!(await claimKey(req.user.id, req.body.key))) return fail(res, 409, msg(req, 'alreadyDone'));

  const conflicts = await findConflicts(req.user, m, [req.user.id, ...m.attendeeIds]);
  const meetingId = id();
  await query(
    `INSERT INTO meetings (id, organizer_id, title, notes, date, time, duration_min, location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [meetingId, req.user.id, m.title, m.notes, m.date, m.time, m.durationMin, m.location],
  );
  for (const uid of m.attendeeIds) await query('INSERT INTO meeting_attendees (meeting_id, user_id) VALUES ($1, $2)', [meetingId, uid]);
  await audit(req.user.id, 'meeting.create', { meeting: meetingId, attendees: m.attendeeIds.length, date: m.date });
  const [meeting] = (await meetingsFor(req.user.id, m.date, m.date)).filter((x) => x.id === meetingId);
  res.json({ meeting, conflicts });
}));

app.post('/api/meetings/:id/respond', auth, h(async (req, res) => {
  const response = ['accepted', 'declined'].includes(req.body.response) ? req.body.response : null;
  if (!response) return fail(res, 400, msg(req, 'notAvailable'));
  const rows = await query('UPDATE meeting_attendees SET response = $3 WHERE meeting_id = $1 AND user_id = $2 RETURNING meeting_id', [req.params.id, req.user.id, response]);
  if (!rows.length) return fail(res, 404, msg(req, 'meetingNotFound'));
  await audit(req.user.id, `meeting.${response}`, { meeting: req.params.id });
  res.json({ ok: true, response });
}));

app.post('/api/meetings/:id/cancel', auth, h(async (req, res) => {
  const m = await one('SELECT organizer_id FROM meetings WHERE id = $1', [req.params.id]);
  if (!m) return fail(res, 404, msg(req, 'meetingNotFound'));
  if (m.organizer_id !== req.user.id) return fail(res, 403, msg(req, 'onlyOrganizer'));
  await query(`UPDATE meetings SET status = 'cancelled' WHERE id = $1`, [req.params.id]);
  await audit(req.user.id, 'meeting.cancel', { meeting: req.params.id });
  res.json({ ok: true });
}));

// Badge counts: connection requests and meeting invitations waiting for an answer.
app.get('/api/notifications', auth, h(async (req, res) => {
  const requests = (await connectionsOf(req.user.id)).filter((c) => c.status === 'pending' && c.requester_id !== req.user.id);
  const invites = (await meetingsFor(req.user.id, new Date().toISOString().slice(0, 10), '9999-12-31')).filter((m) => !m.isOrganizer && m.myResponse === 'pending');
  res.json({ requests: requests.length, invites });
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
async function openaiJSON(system, user, history = []) {
  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY.trim()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: system },
          ...history,
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

// ---------- Speech to text ----------
function editDistance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
  }
  return d[a.length][b.length];
}

// Snap near-miss spellings of saved names to the saved spelling ("Algaili" → "Algailey").
// Only words of 4+ letters, same first letter, and at most 1 edit (2 for long names) are changed.
function snapNames(text, names) {
  const vocab = [...new Set(names.flatMap((n) => String(n).split(/\s+/)).filter((w) => w.length >= 4))];
  if (!vocab.length) return text;
  return text.replace(/[\p{L}\p{M}'-]{4,}/gu, (word) => {
    const w = normalize(word);
    let best = null;
    for (const v of vocab) {
      const nv = normalize(v);
      if (nv === w) return v;
      if (nv[0] !== w[0] || Math.abs(nv.length - w.length) > 2) continue;
      const dist = editDistance(w, nv);
      const allowed = nv.length >= 7 ? 2 : 1;
      if (dist <= allowed && (!best || dist < best.dist)) best = { v, dist };
    }
    return best ? best.v : word;
  });
}

// The browser records audio (webm on Chrome/Android, mp4 on iPhone) and posts the raw bytes here.
const AUDIO_EXT = { 'audio/webm': 'webm', 'audio/mp4': 'mp4', 'audio/x-m4a': 'm4a', 'audio/m4a': 'm4a', 'audio/aac': 'm4a', 'audio/ogg': 'ogg', 'audio/wav': 'wav', 'audio/x-wav': 'wav', 'audio/wave': 'wav', 'audio/mpeg': 'mp3' };

app.post('/api/transcribe', auth, express.raw({ type: () => true, limit: '4mb' }), h(async (req, res) => {
  if (!openaiEnabled) return fail(res, 503, msg(req, 'aiUnavailable'));
  if (usage(req.user).aiDrafts >= PLANS[req.user.plan].aiDrafts) return fail(res, 402, msg(req, 'draftLimit'));
  const audio = req.body;
  if (!Buffer.isBuffer(audio) || audio.length < 800) return fail(res, 400, msg(req, 'noSpeechHeard'));
  const type = String(req.get('content-type') || 'audio/webm').split(';')[0].trim().toLowerCase();
  const ext = AUDIO_EXT[type] || 'webm';
  const lang = req.get('x-speech-lang') === 'en' ? 'en' : req.get('x-speech-lang') === 'ar' ? 'ar' : langOf(req);

  // Saved names and groups as a spelling hint, so "سارة" and "Omar" come back spelled the way they are saved.
  const contacts = await query('SELECT name, group_name FROM contacts WHERE user_id = $1 LIMIT 200', [req.user.id]);
  const names = [...new Set(contacts.flatMap((c) => [c.name, c.group_name]).filter(Boolean))].join(', ');
  const hint = (lang === 'ar'
    ? `مُدير (Mudir) مساعد للبريد والتقويم.${names ? ` قد يذكر المتحدث هذه الأسماء بهذا الإملاء تمامًا: ${names}.` : ''}`
    : `Mudir (مُدير) is an email and calendar assistant.${names ? ` The speaker may mention these names, spelled exactly like this: ${names}.` : ''}`
  ).slice(0, 900);

  for (const model of TRANSCRIBE_MODELS) {
    const form = new FormData();
    form.append('file', new Blob([audio], { type }), `speech.${ext}`);
    form.append('model', model);
    form.append('language', lang);
    form.append('prompt', hint);
    form.append('response_format', 'json');
    let r;
    try {
      r = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY.trim()}` },
        body: form,
      });
    } catch (err) {
      console.error('Transcription request failed:', err.message);
      return fail(res, 502, msg(req, 'transcribeFailed'));
    }
    if (r.ok) {
      const raw = String((await r.json()).text || '').trim();
      if (!raw) return fail(res, 422, msg(req, 'noSpeechHeard'));
      // People's names only: group names are ordinary words ("employees") the assistant already matches loosely.
      const text = snapNames(raw, contacts.map((c) => c.name));
      return res.json({ text, model });
    }
    const detail = await r.text();
    console.error('Transcription error', model, r.status, detail.slice(0, 300));
    // Try the next model only when this one is unavailable to the key; other errors are final.
    if (![400, 403, 404].includes(r.status) || !/model/i.test(detail)) break;
  }
  fail(res, 502, msg(req, 'transcribeFailed'));
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
      reply: isAr ? `جهّزت الرسالة إلى ${n} ${n === 1 ? 'شخص' : 'أشخاص'}. هل أرسلها؟` : `The email to ${n} ${n === 1 ? 'person' : 'people'} is ready. Should I send it?`,
      actions: [{
        type: 'email',
        recipients: [...ids],
        subject: isAr ? `رسالة من ${sender}` : `A message from ${sender}`,
        body: isAr ? `السلام عليكم،\n\n${text}\n\nمع التحية،\n${sender}` : `Hello,\n\n${text}\n\nBest regards,\n${sender}`,
      }],
    };
  }
  if (/(remind|task|todo|appointment|add|ذكرني|مهمه|مهمة|موعد|اضف|أضف)/i.test(text)) {
    return { reply: isAr ? 'أضفت المهمة إلى تقويمك.' : 'Added to your calendar.', actions: [{ type: 'task', title: text.slice(0, 200), date: today, time: '' }] };
  }
  const upcoming = tasks.filter((t) => t.date >= today).slice(0, 5);
  return {
    reply: upcoming.length
      ? (isAr ? 'القادم في تقويمك: ' : 'Coming up: ') + upcoming.map((t) => `${t.title} (${t.date})`).join('، ')
      : isAr ? 'تقويمك فارغ في الأيام القادمة.' : 'Your calendar is clear for the coming days.',
    actions: [],
  };
}

const ASSISTANT_SYSTEM = `You are Mudir (مُدير), a smart bilingual personal assistant for busy professionals, mostly in Qatar and the Gulf. You manage the user's calendar, personal tasks, meetings with their Mudir connections and their emails, and you also answer general questions helpfully.

LANGUAGE
- Always reply in the language the user wrote in. Arabic in any dialect gets a reply in natural, warm Modern Standard Arabic. Never reply in English to an Arabic message.
- Understand Gulf/Qatari dialect, for example: ابي/ابغى/أبغي = I want; باچر/باكر/بكرة = tomorrow; عقب = after; الحين = now; الجاي = next; ويّا = with; سوّ/سوي = do or make; شلون = how; وايد = a lot; زين = fine; كلّم = contact; خلّه = let it be; ميتنق/لقاء = meeting; العيال/الشباب/الربع = the team (informal). Arabic-Indic digits (٠١٢٣٤٥٦٧٨٩) are ordinary numbers. الصبح≈09:00, الظهر≈12:00, العصر≈15:30, المغرب≈17:30, الليل≈20:00 when no exact time is given.
- Emails are written in the language the user asks for, otherwise the language of the request. Arabic emails use polished formal Arabic (e.g. opening "تحية طيبة وبعد،" and closing "وتفضلوا بقبول فائق الاحترام،").

TIME
- Use "now" (the user's local time; Asia/Qatar unless told otherwise) to turn relative dates into YYYY-MM-DD and times into 24h HH:MM. A weekday name alone ("Thursday", "الخميس الجاي") means its next occurrence after today. The Qatar work week is Sunday to Thursday.

MEMORY
- "memories" are lasting facts the user asked you to keep (preferences, signature, roles of people). Apply them without being asked.
- When the user states a lasting fact or preference ("remember…", "تذكّر…", "my manager is…", "always sign as…"), add a short third-person note to "remember" in the user's language and confirm briefly. When they ask you to forget something, put the matching memory ids in "forget".
- "history" is the recent conversation. Use it for follow-ups such as "make it shorter", "add Omar too", "send it in English", "اجعلها أقصر", "غيّر الوقت إلى ٤". When revising something you prepared earlier, return the complete updated action again.

ACTIONS — return zero or more in "actions"; a request with several steps gets several actions.
- {"type":"email","recipients":[contact ids],"addresses":[email addresses said explicitly],"unmatched":[names not found],"subject":string,"body":string}
  For writing to people. Pick recipients from "contacts" by name or group: a group such as "employees", "الموظفين", "my team" or "العيال" means every contact in that group. Sign with the sender name, or the signature in memories. Never claim it was sent: the app shows it for approval.
- {"type":"meeting","title":string,"date":"YYYY-MM-DD","time":"HH:MM","durationMin":number,"location":string,"notes":string,"attendees":[connection ids],"unmatched":[names not found]}
  For meetings with other Mudir users from "connections"; they receive an invitation on their own calendar. Default duration 30 minutes. A person who is only in contacts (not connections) goes in "unmatched".
- {"type":"task","title":string,"date":"YYYY-MM-DD" or "","time":"HH:MM" or ""}
  For the user's own reminders, to-dos and personal appointments.

CLARIFY
- When something essential is missing or ambiguous (who, which day, or what time for a meeting; what an email should say), ask ONE short question in "reply" and return no actions. Do not ask about things with sensible defaults.

ANSWERS
- Answer questions about their schedule from "upcoming". Answer general questions (facts, advice, writing help, translation, calculations) helpfully in "reply", up to about 120 words.

REPLY
- "reply" is read aloud: natural and short (1–2 sentences) unless answering a question. For emails and meetings, say what you prepared and ask whether to send it. Only name people who are actually included, and say plainly who could not be found.

Return JSON only: {"reply":string,"actions":[...],"remember":[strings],"forget":[memory ids]}

EXAMPLES (ids and dates are illustrative)
User: "ابي اجتماع ويّا سارة باچر الساعة ٣ العصر عن الميزانية"
{"reply":"جهّزت دعوة اجتماع مع سارة غدًا الساعة 3 عصرًا لمناقشة الميزانية. هل أرسلها؟","actions":[{"type":"meeting","title":"مناقشة الميزانية","date":"2026-11-04","time":"15:00","durationMin":30,"location":"","notes":"","attendees":["u_sara"],"unmatched":[]}],"remember":[],"forget":[]}
User: "تذكّر إن توقيعي د. مازن الجيلي"
{"reply":"تم، سأوقّع رسائلك باسم د. مازن الجيلي من الآن.","actions":[],"remember":["يوقّع المستخدم رسائله باسم: د. مازن الجيلي"],"forget":[]}
User: "أرسل للموظفين"
{"reply":"بكل سرور. ماذا تريد أن تقول لهم في الرسالة؟","actions":[],"remember":[],"forget":[]}
User: "Remind me to renew my ID next Sunday and email Omar the report"
{"reply":"I added the reminder for Sunday and drafted the email to Omar. Should I send it?","actions":[{"type":"task","title":"Renew ID","date":"2026-11-08","time":""},{"type":"email","recipients":["c_omar"],"addresses":[],"unmatched":[],"subject":"The report","body":"Hi Omar,\\n\\nPlease find the report [details].\\n\\nBest regards,\\nMazen"}],"remember":[],"forget":[]}`;

const WEEKDAYS = { en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], ar: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'] };
const HISTORY_SENT = 16; // recent messages the assistant sees
const HISTORY_KEPT = 40; // messages kept per user
const MEMORY_MAX = 100;

// What the model sees from earlier turns: what was said, plus a compact note of what was prepared.
function historyForModel(rows) {
  return rows.map((r) => {
    const c = JSON.parse(r.content);
    return { role: r.role, content: c.context ? `${c.text}\n\n[${c.context}]` : c.text };
  });
}

function summarizeActions(actions) {
  return actions
    .map((a) => {
      if (a.type === 'email') return `Prepared email to ${a.recipients.map((r) => r.name).join(', ') || 'nobody yet'} | subject: ${a.subject} | body: ${a.body.slice(0, 900)}`;
      if (a.type === 'meeting') return `Prepared meeting "${a.title}" ${a.date} ${a.time} (${a.durationMin} min) with ${a.attendees.map((x) => x.name).join(', ')}${a.location ? ` at ${a.location}` : ''}`;
      if (a.type === 'task') return `Added task "${a.task.title}" ${a.task.date} ${a.task.time}`;
      return '';
    })
    .filter(Boolean)
    .join(' || ');
}

app.get('/api/assistant/history', auth, h(async (req, res) => {
  const rows = await query('SELECT role, content, created_at FROM assistant_messages WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2', [req.user.id, HISTORY_KEPT]);
  res.json({ messages: rows.reverse().map((r) => ({ role: r.role, text: JSON.parse(r.content).text, at: r.created_at })) });
}));

app.delete('/api/assistant/history', auth, h(async (req, res) => {
  await query('DELETE FROM assistant_messages WHERE user_id = $1', [req.user.id]);
  res.json({ ok: true });
}));

app.get('/api/memories', auth, h(async (req, res) => {
  const rows = await query('SELECT id, content, created_at FROM memories WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
  res.json({ memories: rows.map((m) => ({ id: m.id, content: m.content, at: m.created_at })) });
}));

app.delete('/api/memories/:id', auth, h(async (req, res) => {
  await query('DELETE FROM memories WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]);
  res.json({ ok: true });
}));

app.post('/api/assistant', auth, h(async (req, res) => {
  const text = String(req.body.text || '').trim().slice(0, 2000);
  if (!text) return fail(res, 400, msg(req, 'assistantEmpty'));
  if (usage(req.user).aiDrafts >= PLANS[req.user.plan].aiDrafts) return fail(res, 402, msg(req, 'draftLimit'));
  const lang = langOf(req);
  const today = DATE_RE.test(req.body.today) ? req.body.today : new Date().toISOString().slice(0, 10);
  const time = TIME_RE.test(req.body.time) ? req.body.time : '';
  const timezone = String(req.body.timezone || 'Asia/Qatar').slice(0, 60);
  const horizon = (() => {
    const d = new Date(today + 'T00:00:00Z');
    d.setUTCDate(d.getUTCDate() + 45);
    return d.toISOString().slice(0, 10);
  })();
  const weekday = new Date(today + 'T00:00:00Z').getUTCDay();

  const [contacts, connections, memories, historyRows, tasks, meetings] = await Promise.all([
    query('SELECT id, name, email, group_name FROM contacts WHERE user_id = $1 ORDER BY name LIMIT 500', [req.user.id]),
    connectedUsers(req.user.id),
    query('SELECT id, content FROM memories WHERE user_id = $1 ORDER BY created_at LIMIT $2', [req.user.id, MEMORY_MAX]),
    query('SELECT role, content FROM assistant_messages WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2', [req.user.id, HISTORY_SENT]),
    query(`SELECT * FROM tasks WHERE user_id = $1 AND NOT done AND date >= $2 AND date <= $3 ORDER BY date, time LIMIT 80`, [req.user.id, today, horizon]),
    meetingsFor(req.user.id, today, horizon),
  ]);

  let out;
  if (openaiEnabled) {
    const payload = JSON.stringify({
      now: { date: today, time, weekday: `${WEEKDAYS.en[weekday]} / ${WEEKDAYS.ar[weekday]}`, timezone },
      appLanguage: lang === 'en' ? 'English' : 'Arabic',
      sender: req.user.name,
      memories: memories.map((m) => ({ id: m.id, note: m.content })),
      contacts: contacts.map((c) => ({ id: c.id, name: c.name, group: c.group_name })),
      connections: connections.map((c) => ({ id: c.id, name: c.name })),
      upcoming: {
        tasks: tasks.map((t) => ({ title: t.title, date: t.date, time: t.time })),
        meetings: meetings.filter((m) => m.myResponse !== 'declined').map((m) => ({ title: m.title, date: m.date, time: m.time, with: [m.organizer.name, ...m.attendees.map((a) => a.name)].join(', ') })),
      },
      message: text,
    });
    try {
      out = await openaiJSON(ASSISTANT_SYSTEM, payload, historyForModel(historyRows.reverse()));
    } catch {
      return fail(res, 502, msg(req, 'aiUnavailable'));
    }
  } else {
    out = fallbackAssistant(text, contacts, tasks.map(taskOut), lang, req.user.name, today);
  }

  // Accept the older single-action shape too.
  const rawActions = Array.isArray(out.actions) ? out.actions : out.action && out[out.action] ? [{ type: out.action, ...out[out.action] }] : [];
  const actions = [];
  for (const a of rawActions.slice(0, 4)) {
    if (a?.type === 'email') {
      const ids = new Set(Array.isArray(a.recipients) ? a.recipients : []);
      const picked = contacts.filter((c) => ids.has(c.id)).map((c) => ({ name: c.name, email: c.email }));
      const extra = (Array.isArray(a.addresses) ? a.addresses : [])
        .map((x) => String(x).trim().toLowerCase())
        .filter((x) => EMAIL_RE.test(x) && !picked.some((p) => p.email === x))
        .map((x) => ({ name: x, email: x }));
      actions.push({
        type: 'email',
        key: id(),
        recipients: [...picked, ...extra],
        unmatched: (Array.isArray(a.unmatched) ? a.unmatched : []).map(String).slice(0, 10),
        subject: String(a.subject || '').slice(0, 300),
        body: String(a.body || '').slice(0, 10000),
      });
    } else if (a?.type === 'meeting') {
      const ids = new Set(Array.isArray(a.attendees) ? a.attendees : []);
      const attendees = connections.filter((c) => ids.has(c.id)).map((c) => ({ id: c.id, name: c.name }));
      const m = cleanMeeting({ ...a, attendeeIds: attendees.map((x) => x.id) });
      if (!DATE_RE.test(m.date)) m.date = today;
      if (m.time && !TIME_RE.test(m.time)) m.time = '';
      actions.push({
        type: 'meeting',
        key: id(),
        title: m.title || (lang === 'ar' ? 'اجتماع' : 'Meeting'),
        date: m.date,
        time: m.time,
        durationMin: m.durationMin,
        location: m.location,
        notes: m.notes,
        attendees,
        unmatched: (Array.isArray(a.unmatched) ? a.unmatched : []).map(String).slice(0, 10),
        conflicts: await findConflicts(req.user, m, [req.user.id, ...attendees.map((x) => x.id)]),
      });
    } else if (a?.type === 'task') {
      const title = String(a.title || text).trim().slice(0, 200);
      const row = await one(`INSERT INTO tasks (id, user_id, title, date, time) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [
        id(), req.user.id, title, DATE_RE.test(a.date) ? a.date : '', TIME_RE.test(a.time) ? a.time : '',
      ]);
      actions.push({ type: 'task', task: taskOut(row) });
    }
  }

  // Memory updates
  const remembered = [];
  const known = new Set(memories.map((m) => normalize(m.content)));
  for (const note of (Array.isArray(out.remember) ? out.remember : []).slice(0, 5)) {
    const content = String(note || '').trim().slice(0, 300);
    if (!content || known.has(normalize(content))) continue;
    known.add(normalize(content));
    remembered.push(await one('INSERT INTO memories (id, user_id, content) VALUES ($1, $2, $3) RETURNING id, content', [id(), req.user.id, content]));
  }
  const forgetIds = (Array.isArray(out.forget) ? out.forget : []).map(String).slice(0, 20);
  if (forgetIds.length) await query('DELETE FROM memories WHERE user_id = $1 AND id = ANY($2)', [req.user.id, forgetIds]);
  const overflow = memories.length + remembered.length - MEMORY_MAX;
  if (overflow > 0) {
    await query('DELETE FROM memories WHERE id IN (SELECT id FROM memories WHERE user_id = $1 ORDER BY created_at LIMIT $2)', [req.user.id, overflow]);
  }

  const reply = String(out.reply || '').slice(0, 1500);
  await query('INSERT INTO assistant_messages (id, user_id, role, content) VALUES ($1, $2, $3, $4)', [id(), req.user.id, 'user', JSON.stringify({ text })]);
  await query('INSERT INTO assistant_messages (id, user_id, role, content) VALUES ($1, $2, $3, $4)', [
    id(), req.user.id, 'assistant', JSON.stringify({ text: reply, context: summarizeActions(actions) }),
  ]);
  await query(
    `DELETE FROM assistant_messages WHERE user_id = $1 AND id NOT IN (SELECT id FROM assistant_messages WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2)`,
    [req.user.id, HISTORY_KEPT],
  );

  res.json({
    reply,
    actions,
    remembered: remembered.map((m) => m.content),
    forgot: forgetIds.length,
    user: publicUser(await bumpUsage(req.user.id, 'ai')),
  });
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
  const key = req.body.key;
  if (!(await claimKey(user.id, key))) return fail(res, 409, msg(req, 'alreadyDone'));

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
  if (sent.length) await audit(user.id, 'email.send', { recipients: sent.length, of: recipients.length, subject: subject.slice(0, 120) });
  else await releaseKey(user.id, key); // nothing went out, so the same email may be retried

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
