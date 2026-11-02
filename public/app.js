'use strict';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

// ---------- Translations ----------
const I18N = {
  ar: {
    brand: 'مُدير',
    otherLang: 'English',
    heroTitle: 'مساحة واحدة لمهامك ومواعيدك ورسائلك',
    heroText: 'نظّم يومك، ودع الذكاء الاصطناعي يكتب رسائلك، ثم أرسلها من بريدك أنت.',
    heroP1: 'قائمة مهام ولوحة وتقويم في مكان واحد',
    heroP2: 'صياغة رسائل ذكية بالعربية والإنجليزية',
    heroP3: 'إرسال من بريدك بعد تأكيدك فقط',
    welcome: 'أهلًا بك',
    welcomeSub: 'سجّل الدخول أو أنشئ حسابًا مجانيًا',
    login: 'تسجيل الدخول',
    register: 'حساب جديد',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    submitLogin: 'دخول',
    submitRegister: 'إنشاء الحساب',
    goodMorning: 'صباح الخير، {name}',
    goodEvening: 'مساء الخير، {name}',
    navTasks: 'المهام',
    navCalendar: 'التقويم',
    navEmails: 'البريد المُرسل',
    navAccount: 'الحساب',
    newTask: 'مهمة جديدة',
    close: 'إغلاق',
    prevMonth: 'الشهر السابق',
    nextMonth: 'الشهر التالي',
    fToday: 'اليوم',
    fUpcoming: 'القادمة',
    fOverdue: 'المتأخرة',
    fAll: 'الكل',
    fDone: 'المكتملة',
    searchPh: 'بحث في المهام…',
    viewList: 'عرض القائمة',
    viewBoard: 'عرض اللوحة',
    statToday: 'لليوم',
    statOverdue: 'متأخرة',
    statDone: 'مكتملة',
    aiPlan: 'رتّب أولوياتي',
    aiPlanBusy: 'جارٍ التحليل…',
    planTitle: 'اقتراح اليوم',
    hidePlan: 'إخفاء الترتيب',
    proOnlyToast: 'ترتيب الأولويات الذكي متاح في الباقة الاحترافية',
    emptyToday: 'لا مهام لليوم. استمتع بيومك!',
    emptyUpcoming: 'لا مهام قادمة',
    emptyOverdue: 'لا مهام متأخرة — رائع!',
    emptyDone: 'لم تُكمل أي مهمة بعد',
    emptyAll: 'ابدأ بإضافة أول مهمة',
    emptySearch: 'لا نتائج لـ «{q}»',
    emptyDay: 'لا مهام في هذا اليوم',
    noOpenTasks: 'لا توجد مهام مفتوحة. أحسنت!',
    newRowPh: 'مهمة جديدة… ثم Enter',
    pHigh: 'عالية',
    pMedium: 'متوسطة',
    pLow: 'منخفضة',
    sTodo: 'للتنفيذ',
    sDoing: 'قيد التنفيذ',
    sDone: 'مكتملة',
    tagOverdue: 'متأخرة',
    tagDraft: 'مسودة',
    tagSent: 'أُرسل',
    noDate: 'بدون تاريخ',
    newTaskTitle: 'مهمة جديدة',
    fTitle: 'العنوان',
    titlePh: 'مثال: متابعة عرض السعر مع العميل',
    fDate: 'التاريخ',
    fTime: 'الوقت',
    fPriority: 'الأولوية',
    fStatus: 'الحالة',
    fNotes: 'ملاحظات',
    notesPh: 'اكتب التفاصيل هنا… تساعد الذكاء الاصطناعي على صياغة أدق',
    fContactName: 'اسم المستلم',
    fContactEmail: 'بريد المستلم',
    cancel: 'إلغاء',
    save: 'حفظ',
    untitled: 'بلا عنوان',
    tAdded: 'تمت إضافة المهمة',
    tDeleted: 'تم حذف المهمة',
    tDone: 'أحسنت! اكتملت المهمة',
    copied: 'تم النسخ',
    copyFailed: 'تعذّر النسخ',
    invalidEmail: 'بريد المستلم غير صالح',
    needRecipient: 'أدخل بريد المستلم أولًا',
    needSubjectBody: 'الموضوع والنص مطلوبان',
    emailSent: 'تم إرسال البريد من {email}',
    confirmDelete: 'حذف هذه المهمة نهائيًا؟',
    saving: 'جارٍ الحفظ…',
    saved: 'تم الحفظ',
    titleRequired: 'العنوان مطلوب',
    delete: 'حذف',
    addGoogleCal: 'تقويم Google',
    downloadIcs: 'ملف تقويم',
    assistant: 'مساعد الصياغة',
    demoAi: 'وضع تجريبي: ستُستخدم صياغة جاهزة حتى يُضاف مفتاح OpenAI على الخادم.',
    kindEmail: 'بريد إلكتروني',
    kindMessage: 'رسالة قصيرة',
    tone: 'الأسلوب',
    toneFormal: 'رسمي',
    toneFriendly: 'ودّي',
    toneBrief: 'مختصر',
    draftLang: 'لغة الرسالة',
    instructions: 'تعليمات إضافية (اختياري)',
    instructionsPh: 'مثال: اطلب تأكيد الموعد',
    writeDraft: 'اكتب المسودة',
    writing: 'جارٍ الكتابة…',
    remaining: 'متبقٍ {n} من {max} صياغة هذا الشهر',
    subject: 'الموضوع',
    body: 'النص',
    sendGmail: 'إرسال من Gmail',
    connectGmailToSend: 'اربط Gmail للإرسال',
    openIn: 'افتح في…',
    mailApp: 'تطبيق البريد',
    copy: 'نسخ',
    whatsapp: 'واتساب',
    confirmTitle: 'تأكيد الإرسال',
    to: 'إلى',
    from: 'من',
    editDraft: 'تعديل',
    sendNow: 'إرسال الآن',
    sending: 'جارٍ الإرسال…',
    addForDay: 'مهمة لهذا اليوم',
    exportCal: 'تصدير كل المهام إلى تقويمك',
    exportNote: 'يعمل مع تقويم Google وApple وOutlook.',
    sentTitle: 'البريد المُرسل',
    noEmails: 'لم تُرسل أي رسالة بعد. افتح مهمة واستخدم مساعد الصياغة.',
    logout: 'تسجيل الخروج',
    usageTitle: 'الاستخدام هذا الشهر',
    aiDrafts: 'صياغات الذكاء الاصطناعي',
    emailsSent: 'رسائل البريد',
    language: 'اللغة',
    gmailTitle: 'الإرسال من بريدك',
    gmailConnectedAs: 'متصل بـ {email}',
    gmailNotConnected: 'اربط Gmail لترسل الرسائل من بريدك مباشرة، بعد تأكيدك لكل رسالة.',
    connectGmail: 'ربط Gmail',
    disconnect: 'فصل',
    gmailOffNote: 'الإرسال المباشر غير مفعّل على الخادم بعد. يمكنك فتح أي مسودة في Gmail أو Outlook وإرسالها من هناك.',
    gmailNote: 'نطلب إذن «الإرسال فقط» — لا نقرأ بريدك أبدًا.',
    gmailConnectedToast: 'تم ربط Gmail بنجاح',
    gmailDeniedToast: 'لم يتم ربط Gmail',
    gmailErrorToast: 'تعذّر ربط Gmail، حاول مرة أخرى',
    gmailNoScopeToast: 'يجب السماح بإذن الإرسال لربط Gmail',
    disconnectedToast: 'تم فصل Gmail',
    yourPlan: 'باقتك',
    planFree: 'مجاني',
    planPro: 'احترافي',
    perMonth: '/ شهريًا',
    current: 'الحالية',
    featTasks: 'مهام وتقويم بلا حدود',
    featDrafts: '{n} صياغة ذكية شهريًا',
    featEmails: '{n} رسالة بريد شهريًا',
    featPriority: 'ترتيب الأولويات بالذكاء الاصطناعي',
    upgrade: 'ترقية إلى الاحترافي',
    manageBilling: 'إدارة الاشتراك والفواتير',
    demoTry: 'تجربة الاحترافي (اختبار)',
    demoBack: 'العودة للمجاني (اختبار)',
    demoNote: 'الدفع غير مفعّل بعد.',
    billingSuccess: 'تم الاشتراك بنجاح! جارٍ تفعيل الباقة…',
    billingCancel: 'تم إلغاء عملية الدفع',
    usageMini: '{n} / {max} صياغة',
    redirectCheckout: 'جارٍ التحويل لصفحة الدفع…',
  },
  en: {
    brand: 'Mudir',
    otherLang: 'العربية',
    heroTitle: 'One place for your tasks, dates and messages',
    heroText: 'Plan your day, let AI draft your messages, then send them from your own email.',
    heroP1: 'Tasks, board and calendar in one place',
    heroP2: 'Smart drafts in Arabic and English',
    heroP3: 'Send from your own email, only after you confirm',
    welcome: 'Welcome',
    welcomeSub: 'Sign in or create a free account',
    login: 'Sign in',
    register: 'Create account',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    submitLogin: 'Sign in',
    submitRegister: 'Create account',
    goodMorning: 'Good morning, {name}',
    goodEvening: 'Good evening, {name}',
    navTasks: 'Tasks',
    navCalendar: 'Calendar',
    navEmails: 'Sent mail',
    navAccount: 'Account',
    newTask: 'New task',
    close: 'Close',
    prevMonth: 'Previous month',
    nextMonth: 'Next month',
    fToday: 'Today',
    fUpcoming: 'Upcoming',
    fOverdue: 'Overdue',
    fAll: 'All',
    fDone: 'Completed',
    searchPh: 'Search tasks…',
    viewList: 'List view',
    viewBoard: 'Board view',
    statToday: 'Due today',
    statOverdue: 'Overdue',
    statDone: 'Completed',
    aiPlan: 'Prioritize my day',
    aiPlanBusy: 'Thinking…',
    planTitle: "Today's suggestion",
    hidePlan: 'Hide order',
    proOnlyToast: 'Smart prioritization is a Pro feature',
    emptyToday: 'Nothing due today. Enjoy your day!',
    emptyUpcoming: 'No upcoming tasks',
    emptyOverdue: 'Nothing overdue — great!',
    emptyDone: 'No completed tasks yet',
    emptyAll: 'Add your first task to get started',
    emptySearch: 'No results for “{q}”',
    emptyDay: 'No tasks on this day',
    noOpenTasks: 'No open tasks. Nice work!',
    newRowPh: 'New task… then Enter',
    pHigh: 'High',
    pMedium: 'Medium',
    pLow: 'Low',
    sTodo: 'To do',
    sDoing: 'In progress',
    sDone: 'Done',
    tagOverdue: 'Overdue',
    tagDraft: 'Draft',
    tagSent: 'Sent',
    noDate: 'No date',
    newTaskTitle: 'New task',
    fTitle: 'Title',
    titlePh: 'e.g. Follow up on the client quote',
    fDate: 'Date',
    fTime: 'Time',
    fPriority: 'Priority',
    fStatus: 'Status',
    fNotes: 'Notes',
    notesPh: 'Write details here… they help the AI draft better messages',
    fContactName: 'Recipient name',
    fContactEmail: 'Recipient email',
    cancel: 'Cancel',
    save: 'Save',
    untitled: 'Untitled',
    tAdded: 'Task added',
    tDeleted: 'Task deleted',
    tDone: 'Nice! Task completed',
    copied: 'Copied',
    copyFailed: "Couldn't copy",
    invalidEmail: "The recipient's email is not valid",
    needRecipient: "Add the recipient's email first",
    needSubjectBody: 'Subject and message are required',
    emailSent: 'Email sent from {email}',
    confirmDelete: 'Delete this task permanently?',
    saving: 'Saving…',
    saved: 'Saved',
    titleRequired: 'Title is required',
    delete: 'Delete',
    addGoogleCal: 'Google Calendar',
    downloadIcs: 'Calendar file',
    assistant: 'Writing assistant',
    demoAi: 'Demo mode: a ready-made template is used until an OpenAI key is added on the server.',
    kindEmail: 'Email',
    kindMessage: 'Short message',
    tone: 'Tone',
    toneFormal: 'Formal',
    toneFriendly: 'Friendly',
    toneBrief: 'Brief',
    draftLang: 'Message language',
    instructions: 'Extra instructions (optional)',
    instructionsPh: 'e.g. Ask them to confirm the meeting time',
    writeDraft: 'Write draft',
    writing: 'Writing…',
    remaining: '{n} of {max} drafts left this month',
    subject: 'Subject',
    body: 'Message',
    sendGmail: 'Send from Gmail',
    connectGmailToSend: 'Connect Gmail to send',
    openIn: 'Open in…',
    mailApp: 'Mail app',
    copy: 'Copy',
    whatsapp: 'WhatsApp',
    confirmTitle: 'Confirm sending',
    to: 'To',
    from: 'From',
    editDraft: 'Edit',
    sendNow: 'Send now',
    sending: 'Sending…',
    addForDay: 'Task for this day',
    exportCal: 'Export all tasks to your calendar',
    exportNote: 'Works with Google, Apple and Outlook calendars.',
    sentTitle: 'Sent mail',
    noEmails: 'Nothing sent yet. Open a task and use the writing assistant.',
    logout: 'Sign out',
    usageTitle: 'Usage this month',
    aiDrafts: 'AI drafts',
    emailsSent: 'Emails sent',
    language: 'Language',
    gmailTitle: 'Send from your email',
    gmailConnectedAs: 'Connected as {email}',
    gmailNotConnected: 'Connect Gmail to send messages from your own address, after you confirm each one.',
    connectGmail: 'Connect Gmail',
    disconnect: 'Disconnect',
    gmailOffNote: "Direct sending isn't enabled on the server yet. You can open any draft in Gmail or Outlook and send it from there.",
    gmailNote: 'We only ask for “send” permission — we never read your inbox.',
    gmailConnectedToast: 'Gmail connected',
    gmailDeniedToast: 'Gmail was not connected',
    gmailErrorToast: "Couldn't connect Gmail. Please try again.",
    gmailNoScopeToast: 'Allow the “send email” permission to connect Gmail',
    disconnectedToast: 'Gmail disconnected',
    yourPlan: 'Your plan',
    planFree: 'Free',
    planPro: 'Pro',
    perMonth: '/ month',
    current: 'Current',
    featTasks: 'Unlimited tasks and calendar',
    featDrafts: '{n} AI drafts a month',
    featEmails: '{n} emails a month',
    featPriority: 'AI prioritization',
    upgrade: 'Upgrade to Pro',
    manageBilling: 'Manage subscription & invoices',
    demoTry: 'Try Pro (test mode)',
    demoBack: 'Back to Free (test mode)',
    demoNote: 'Payments are not enabled yet.',
    billingSuccess: 'Subscribed! Activating your plan…',
    billingCancel: 'Checkout cancelled',
    usageMini: '{n} / {max} drafts',
    redirectCheckout: 'Taking you to checkout…',
  },
};

const store = {
  get(k) {
    try { return localStorage.getItem(k); } catch { return null; }
  },
  set(k, v) {
    try { localStorage.setItem(k, v); } catch { /* storage unavailable */ }
  },
};

const state = {
  lang: store.get('mudir.lang') === 'en' ? 'en' : 'ar',
  layout: store.get('mudir.layout') === 'board' ? 'board' : 'list',
  user: null,
  config: null,
  tasks: [],
  emails: [],
  filter: 'today',
  search: '',
  view: 'tasks',
  calMonth: null,
  calDay: null,
  detailId: null,
  newStatus: 'todo',
  pendingSend: null,
  plan: null,
};

function t(key, vars = {}) {
  const s = I18N[state.lang][key] ?? I18N.ar[key] ?? key;
  return s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
}

// ---------- Helpers ----------
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}
const icon = (name, cls = '') => `<svg class="ic ${cls}"><use href="#i-${name}"/></svg>`;

function ymd(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
const today = () => ymd(new Date());
const locale = () => (state.lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US');

function fmtDate(s, opts = { weekday: 'short', day: 'numeric', month: 'short' }) {
  if (!s) return '';
  return new Intl.DateTimeFormat(locale(), opts).format(new Date(s + 'T00:00:00'));
}
function fmtTime(tm) {
  if (!tm) return '';
  const [h, m] = tm.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m);
  return new Intl.DateTimeFormat(locale(), { hour: 'numeric', minute: '2-digit' }).format(d);
}

async function api(path, opts = {}) {
  const headers = { 'X-Lang': state.lang };
  if (opts.body) headers['Content-Type'] = 'application/json';
  const res = await fetch(path, {
    method: opts.method || 'GET',
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    credentials: 'same-origin',
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(json.error || 'Error');
    err.status = res.status;
    throw err;
  }
  return json;
}

let toastTimer;
function toast(text, isErr = false) {
  const el = $('#toast');
  el.textContent = text;
  el.classList.toggle('err', isErr);
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
}

function busy(btn, on, label) {
  if (on) {
    btn.dataset.label = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span> ${label || ''}`;
  } else {
    btn.disabled = false;
    if (btn.dataset.label) btn.innerHTML = btn.dataset.label;
  }
}

function sortTasks() {
  state.tasks.sort(
    (a, b) => (a.date || '9999').localeCompare(b.date || '9999') || (a.time || '').localeCompare(b.time || '') || String(a.createdAt).localeCompare(String(b.createdAt)),
  );
}

// ---------- Language ----------
function applyLang() {
  const html = document.documentElement;
  html.lang = state.lang;
  html.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  document.title = state.lang === 'ar' ? 'مُدير · Mudir' : 'Mudir · مُدير';
  $$('[data-i18n]').forEach((el) => (el.textContent = t(el.dataset.i18n)));
  $$('[data-i18n-ph]').forEach((el) => (el.placeholder = t(el.dataset.i18nPh)));
  $$('[data-i18n-aria]').forEach((el) => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
  $$('[data-lang-toggle] span').forEach((el) => (el.textContent = t('otherLang')));
  $$('[data-set-lang]').forEach((b) => b.classList.toggle('active', b.dataset.setLang === state.lang));
  $('#auth-submit').textContent = authMode === 'login' ? t('submitLogin') : t('submitRegister');
  buildWeekHeader();
}

function setLang(lang) {
  state.lang = lang;
  store.set('mudir.lang', lang);
  applyLang();
  if (state.user) {
    renderHeader();
    render();
    if (state.detailId) openDetail(state.detailId);
  }
}
document.addEventListener('click', (e) => {
  if (e.target.closest('[data-lang-toggle]')) setLang(state.lang === 'ar' ? 'en' : 'ar');
  const set = e.target.closest('[data-set-lang]');
  if (set) setLang(set.dataset.setLang);
});

// ---------- Sheets ----------
function openSheet(sheetId) {
  $$('.sheet').forEach((s) => (s.hidden = s.id !== sheetId));
  $('#backdrop').hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeSheets() {
  flushSave();
  $$('.sheet').forEach((s) => (s.hidden = true));
  $('#backdrop').hidden = true;
  document.body.style.overflow = '';
  state.detailId = null;
}
$('#backdrop').addEventListener('click', closeSheets);
document.addEventListener('click', (e) => {
  if (e.target.closest('[data-close]')) closeSheets();
  if (e.target.closest('[data-back-detail]') && state.pendingSend) openDetail(state.pendingSend.taskId);
  if (!e.target.closest('.menu-wrap')) $$('.menu').forEach((m) => (m.hidden = true));
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSheets();
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k' && state.user) {
    e.preventDefault();
    if (state.view !== 'tasks') showView('tasks');
    $('#search').focus();
  }
});

// ---------- Auth ----------
let authMode = 'login';
$$('[data-auth]').forEach((b) =>
  b.addEventListener('click', () => {
    authMode = b.dataset.auth;
    $$('[data-auth]').forEach((x) => x.classList.toggle('active', x === b));
    $$('[data-only="register"]').forEach((x) => (x.hidden = authMode !== 'register'));
    $('#auth-submit').textContent = authMode === 'login' ? t('submitLogin') : t('submitRegister');
    $('#auth-form').password.autocomplete = authMode === 'login' ? 'current-password' : 'new-password';
    $('#auth-error').textContent = '';
  }),
);

$('#auth-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = e.target;
  const btn = $('#auth-submit');
  $('#auth-error').textContent = '';
  busy(btn, true);
  try {
    const body = { email: f.email.value, password: f.password.value };
    if (authMode === 'register') body.name = f.name.value;
    const { user } = await api(`/api/auth/${authMode}`, { method: 'POST', body });
    state.user = user;
    f.reset();
    await enterApp();
  } catch (err) {
    $('#auth-error').textContent = err.message;
  } finally {
    busy(btn, false);
    btn.textContent = authMode === 'login' ? t('submitLogin') : t('submitRegister');
  }
});

$('#logout').addEventListener('click', async () => {
  await api('/api/auth/logout', { method: 'POST' });
  state.user = null;
  state.tasks = [];
  $('#app').hidden = true;
  $('#auth').hidden = false;
});

// ---------- Boot ----------
async function boot() {
  applyLang();
  state.config = await api('/api/config');
  try {
    state.user = (await api('/api/me')).user;
    await enterApp();
  } catch {
    $('#auth').hidden = false;
  }
}

async function enterApp() {
  $('#auth').hidden = true;
  $('#app').hidden = false;
  const now = new Date();
  state.calMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  state.calDay = today();
  state.tasks = (await api('/api/tasks')).tasks;
  sortTasks();
  renderHeader();

  const params = new URLSearchParams(location.search);
  const gmail = params.get('gmail');
  const gmailToasts = { connected: 'gmailConnectedToast', denied: 'gmailDeniedToast', error: 'gmailErrorToast', noscope: 'gmailNoScopeToast' };
  if (gmailToasts[gmail]) toast(t(gmailToasts[gmail]), gmail !== 'connected');
  if (params.get('billing') === 'success') {
    toast(t('billingSuccess'));
    setTimeout(refreshUser, 2500);
  } else if (params.get('billing') === 'cancel') {
    toast(t('billingCancel'));
  }
  if (params.toString()) history.replaceState(null, '', location.pathname + location.hash);

  showView(location.hash.replace('#', '') || 'tasks');
}

async function refreshUser() {
  state.user = (await api('/api/me')).user;
  renderHeader();
  if (state.view === 'account') renderAccount();
}

function renderHeader() {
  const u = state.user;
  const first = u.name.split(' ')[0];
  $('#hello').textContent = t(new Date().getHours() < 12 ? 'goodMorning' : 'goodEvening', { name: first });
  $('#today-label').textContent = fmtDate(today(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const pro = u.plan === 'pro';
  const badge = $('#plan-badge');
  badge.textContent = pro ? t('planPro') : t('planFree');
  badge.classList.toggle('pro', pro);
  const left = u.limits.aiDrafts - u.usage.aiDrafts;
  $('#plan-mini').innerHTML = `
    <div class="row" style="justify-content:space-between"><span class="strong">${pro ? icon('crown') + ' ' : ''}${pro ? t('planPro') : t('planFree')}</span>
      <span class="muted small">${esc(t('usageMini', { n: u.usage.aiDrafts, max: u.limits.aiDrafts }))}</span></div>
    <div class="meter-bar"><i class="${left <= 0 ? 'full' : ''}" style="width:${Math.min(100, (u.usage.aiDrafts / u.limits.aiDrafts) * 100)}%"></i></div>
    ${pro ? '' : `<button class="btn ghost sm block" data-go="account">${icon('crown')}${esc(t('upgrade'))}</button>`}`;
  $('#nav-count').textContent = state.tasks.filter((x) => !x.done).length || '';
}

// ---------- Navigation ----------
const VIEWS = ['tasks', 'calendar', 'emails', 'account'];
function showView(v) {
  if (!VIEWS.includes(v)) v = 'tasks';
  state.view = v;
  VIEWS.forEach((x) => ($(`#view-${x}`).hidden = x !== v));
  $$('[data-view]').forEach((el) => el.classList.toggle('active', el.dataset.view === v));
  $('.fab').hidden = v === 'account' || v === 'emails';
  if (location.hash !== '#' + v) history.replaceState(null, '', '#' + v);
  window.scrollTo(0, 0);
  render();
}
document.addEventListener('click', (e) => {
  const nav = e.target.closest('[data-view]');
  if (nav && !nav.closest('.sheet')) showView(nav.dataset.view);
  const go = e.target.closest('[data-go]');
  if (go) showView(go.dataset.go);
});

function render() {
  if (!state.user) return;
  $('#nav-count').textContent = state.tasks.filter((x) => !x.done).length || '';
  if (state.view === 'tasks') renderTasks();
  if (state.view === 'calendar') renderCalendar();
  if (state.view === 'emails') renderEmails();
  if (state.view === 'account') renderAccount();
}

// ---------- Tasks ----------
$$('#task-filters .chip').forEach((c) =>
  c.addEventListener('click', () => {
    state.filter = c.dataset.filter;
    state.plan = null;
    renderTasks();
  }),
);
$$('#layout-seg [data-layout]').forEach((b) =>
  b.addEventListener('click', () => {
    state.layout = b.dataset.layout;
    store.set('mudir.layout', state.layout);
    state.plan = null;
    renderTasks();
  }),
);
$('#search').addEventListener('input', (e) => {
  state.search = e.target.value;
  renderTasks();
});

function matchesFilter(x) {
  const td = today();
  switch (state.filter) {
    case 'today': return !x.done && (!x.date || x.date <= td);
    case 'upcoming': return !x.done && x.date > td;
    case 'overdue': return !x.done && x.date && x.date < td;
    case 'done': return x.done;
    default: return true;
  }
}

function visibleTasks() {
  const q = state.search.trim().toLowerCase();
  if (q) return state.tasks.filter((x) => `${x.title} ${x.notes} ${x.contactName} ${x.contactEmail}`.toLowerCase().includes(q));
  return state.layout === 'board' ? state.tasks : state.tasks.filter(matchesFilter);
}

const PRIO_COLOR = { high: 'red', medium: 'yellow', low: 'green' };
const PRIO_KEY = { high: 'pHigh', medium: 'pMedium', low: 'pLow' };
const STATUS_KEY = { todo: 'sTodo', doing: 'sDoing', done: 'sDone' };
const STATUS_COLOR = { todo: '', doing: 'blue', done: 'green' };

function metaTags(task, extra = {}) {
  const td = today();
  const overdue = !task.done && task.date && task.date < td;
  const tags = [];
  if (extra.reason) tags.push(`<span class="tag purple">${icon('sparkle')}${esc(extra.reason)}</span>`);
  if (task.status === 'doing' && !extra.board) tags.push(`<span class="tag blue">${esc(t('sDoing'))}</span>`);
  if (task.date) {
    tags.push(`<span class="tag ${overdue ? 'red' : ''}">${icon('calendar')}${esc(fmtDate(task.date))}${task.time ? ' · ' + esc(fmtTime(task.time)) : ''}</span>`);
  }
  tags.push(`<span class="tag ${PRIO_COLOR[task.priority]}">${esc(t(PRIO_KEY[task.priority]))}</span>`);
  if (task.contactName || task.contactEmail) tags.push(`<span class="tag">${icon('user')}${esc(task.contactName || task.contactEmail)}</span>`);
  if (task.lastEmailAt) tags.push(`<span class="tag green">${icon('send')}${esc(t('tagSent'))}</span>`);
  else if (task.draft?.body) tags.push(`<span class="tag purple">${icon('edit')}${esc(t('tagDraft'))}</span>`);
  return tags.join('');
}

function taskRow(task, extra = {}) {
  return `<li class="task ${task.done ? 'done' : ''}">
    ${extra.rank
      ? `<span class="rank">${extra.rank}</span>`
      : `<button class="task-check" data-toggle="${task.id}" aria-label="${esc(task.title)}">${icon('check')}</button>`}
    <button class="task-main" data-open="${task.id}">
      <span class="task-title">${esc(task.title)}</span>
      <span class="task-meta">${metaTags(task, extra)}</span>
    </button>
  </li>`;
}

function emptyRow(text, ic = 'check') {
  return `<li class="empty">${icon(ic)}<span>${esc(text)}</span></li>`;
}

function renderStats() {
  const td = today();
  const open = state.tasks.filter((x) => !x.done);
  const dueToday = open.filter((x) => x.date === td).length;
  const overdue = open.filter((x) => x.date && x.date < td).length;
  const done = state.tasks.length - open.length;
  $('#stats').innerHTML = `
    <div class="stat"><b>${dueToday}</b><span>${icon('calendar')}${esc(t('statToday'))}</span></div>
    <div class="stat ${overdue ? 'warn' : ''}"><b>${overdue}</b><span>${icon('alert')}${esc(t('statOverdue'))}</span></div>
    <div class="stat"><b>${done}</b><span>${icon('check')}${esc(t('statDone'))}</span></div>`;
}

function renderTasks() {
  renderStats();
  $$('#task-filters .chip').forEach((x) => x.classList.toggle('active', x.dataset.filter === state.filter));
  $('#task-filters').hidden = state.layout === 'board';
  $$('#layout-seg [data-layout]').forEach((b) => b.classList.toggle('active', b.dataset.layout === state.layout));
  $('#ai-plan-btn .pro-tag').hidden = state.user.plan === 'pro';
  const list = $('#task-list');
  const board = $('#board');
  const planBox = $('#plan-result');

  if (state.plan) {
    const byId = Object.fromEntries(state.tasks.map((x) => [x.id, x]));
    planBox.innerHTML = `<div class="callout purple">${icon('sparkle')}<div class="grow"><strong>${esc(t('planTitle'))}</strong><span>${esc(state.plan.summary)}</span>
      <button class="btn quiet sm" id="plan-clear" style="align-self:flex-start">${esc(t('hidePlan'))}</button></div></div>`;
    $('#plan-clear').onclick = () => {
      state.plan = null;
      renderTasks();
    };
    const items = state.plan.plan.filter((p) => byId[p.id] && !byId[p.id].done);
    board.hidden = true;
    list.hidden = false;
    list.innerHTML = items.length ? items.map((p, i) => taskRow(byId[p.id], { rank: i + 1, reason: p.reason })).join('') : emptyRow(t('noOpenTasks'));
    return;
  }
  planBox.innerHTML = '';
  const tasks = visibleTasks();

  if (state.layout === 'board') {
    list.hidden = true;
    board.hidden = false;
    renderBoard(tasks);
    return;
  }
  board.hidden = true;
  list.hidden = false;
  const emptyKey = { today: 'emptyToday', upcoming: 'emptyUpcoming', overdue: 'emptyOverdue', done: 'emptyDone', all: 'emptyAll' }[state.filter];
  const q = state.search.trim();
  const rows = tasks.length ? tasks.map((x) => taskRow(x)).join('') : emptyRow(q ? t('emptySearch', { q }) : t(emptyKey), q ? 'search' : 'check');
  const newRow = state.filter === 'done' || q ? '' : `<li class="task new-row">${icon('plus')}<input id="quick-add" placeholder="${esc(t('newRowPh'))}" maxlength="200" /></li>`;
  list.innerHTML = rows + newRow;
}

function renderBoard(tasks) {
  const cols = ['todo', 'doing', 'done'];
  $('#board').innerHTML = cols
    .map((s) => {
      const items = tasks.filter((x) => (x.status || (x.done ? 'done' : 'todo')) === s);
      return `<div class="col">
        <div class="col-head"><span class="tag ${STATUS_COLOR[s]}">${esc(t(STATUS_KEY[s]))}</span><span class="muted small">${items.length}</span></div>
        <div class="col-body" data-drop="${s}">
          ${items.map((x) => `<button class="card-task" draggable="true" data-open="${x.id}" data-drag="${x.id}"><span class="task-title">${esc(x.title)}</span><span class="task-meta">${metaTags(x, { board: true })}</span></button>`).join('')}
        </div>
        <button class="col-add" data-col-add="${s}">${icon('plus')}${esc(t('newTask'))}</button>
      </div>`;
    })
    .join('');
}

// Board drag and drop (pointer devices)
document.addEventListener('dragstart', (e) => {
  const card = e.target.closest?.('[data-drag]');
  if (!card) return;
  e.dataTransfer.setData('text/plain', card.dataset.drag);
  e.dataTransfer.effectAllowed = 'move';
  card.classList.add('dragging');
});
document.addEventListener('dragend', (e) => e.target.closest?.('[data-drag]')?.classList.remove('dragging'));
document.addEventListener('dragover', (e) => {
  const col = e.target.closest?.('[data-drop]');
  if (!col) return;
  e.preventDefault();
  $$('[data-drop]').forEach((c) => c.classList.toggle('over', c === col));
});
document.addEventListener('dragleave', (e) => {
  if (e.target.matches?.('[data-drop]')) e.target.classList.remove('over');
});
document.addEventListener('drop', async (e) => {
  const col = e.target.closest?.('[data-drop]');
  if (!col) return;
  e.preventDefault();
  col.classList.remove('over');
  const task = state.tasks.find((x) => x.id === e.dataTransfer.getData('text/plain'));
  if (!task || task.status === col.dataset.drop) return;
  await updateTask(task.id, { status: col.dataset.drop });
  if (col.dataset.drop === 'done') toast(t('tDone'));
});

async function updateTask(taskId, body) {
  const { task } = await api(`/api/tasks/${taskId}`, { method: 'PATCH', body });
  Object.assign(state.tasks.find((x) => x.id === task.id), task);
  sortTasks();
  render();
  renderHeader();
  return task;
}

document.addEventListener('click', async (e) => {
  const tog = e.target.closest('[data-toggle]');
  if (tog) {
    const task = state.tasks.find((x) => x.id === tog.dataset.toggle);
    const updated = await updateTask(task.id, { done: !task.done });
    if (updated.done) toast(t('tDone'));
    return;
  }
  const open = e.target.closest('[data-open]');
  if (open) return openDetail(open.dataset.open);
  const colAdd = e.target.closest('[data-col-add]');
  if (colAdd) openEditor(undefined, colAdd.dataset.colAdd);
  if (e.target.closest('[data-new-task]')) openEditor(state.view === 'calendar' ? state.calDay : undefined);
});

// Inline "+ New" row: Enter creates the task and keeps the cursor there for the next one.
document.addEventListener('keydown', async (e) => {
  if (e.target.id !== 'quick-add' || e.key !== 'Enter' || e.isComposing) return;
  const title = e.target.value.trim();
  if (!title) return;
  e.target.disabled = true;
  const date = state.filter === 'today' || state.filter === 'overdue' ? today() : '';
  try {
    const { task } = await api('/api/tasks', { method: 'POST', body: { title, date } });
    state.tasks.push(task);
    sortTasks();
    renderTasks();
    renderHeader();
    $('#quick-add')?.focus();
  } catch (err) {
    toast(err.message, true);
    e.target.disabled = false;
  }
});

$('#ai-plan-btn').addEventListener('click', async () => {
  if (state.user.plan !== 'pro') {
    toast(t('proOnlyToast'));
    showView('account');
    return;
  }
  const btn = $('#ai-plan-btn');
  btn.disabled = true;
  const label = btn.querySelector('[data-i18n]');
  label.textContent = t('aiPlanBusy');
  try {
    state.plan = await api('/api/ai/plan', { method: 'POST' });
    renderTasks();
  } catch (err) {
    toast(err.message, true);
  } finally {
    btn.disabled = false;
    label.textContent = t('aiPlan');
  }
});

// ---------- New task sheet ----------
let editPrio = 'medium';
$$('#prio-seg .seg-btn').forEach((b) =>
  b.addEventListener('click', () => {
    editPrio = b.dataset.prio;
    $$('#prio-seg .seg-btn').forEach((x) => x.classList.toggle('active', x === b));
  }),
);

function openEditor(presetDate, status = 'todo') {
  const f = $('#edit-form');
  f.reset();
  state.newStatus = status;
  $('#edit-title').textContent = t('newTaskTitle');
  f.date.value = presetDate ?? (state.layout === 'list' && state.filter === 'upcoming' ? '' : today());
  editPrio = 'medium';
  $$('#prio-seg .seg-btn').forEach((x) => x.classList.toggle('active', x.dataset.prio === editPrio));
  openSheet('sheet-edit');
  setTimeout(() => f.title.focus(), 200);
}

$('#edit-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = e.target;
  if (f.contactEmail.value && !f.contactEmail.checkValidity()) return toast(t('invalidEmail'), true);
  const btn = f.querySelector('[type=submit]');
  busy(btn, true);
  try {
    const { task } = await api('/api/tasks', {
      method: 'POST',
      body: {
        title: f.title.value,
        date: f.date.value,
        time: f.time.value,
        notes: f.notes.value,
        priority: editPrio,
        status: state.newStatus,
        contactName: f.contactName.value,
        contactEmail: f.contactEmail.value,
      },
    });
    state.tasks.push(task);
    sortTasks();
    closeSheets();
    render();
    renderHeader();
    toast(t('tAdded'));
  } catch (err) {
    toast(err.message, true);
  } finally {
    busy(btn, false);
    btn.textContent = t('save');
  }
});

// ---------- Task page (Notion-style peek with autosave) ----------
// The message language follows the site language until the user picks one explicitly.
const draftOpts = { kind: 'email', tone: 'formal', lang: null, langPicked: false };
let pendingSave = null;
let saveTimer = null;

function setSaveState(text) {
  const el = $('#save-state');
  if (el) el.textContent = text;
}

function queueSave(body, delay = 600) {
  if (!state.detailId) return;
  if (pendingSave && pendingSave.id !== state.detailId) flushSave();
  pendingSave = { id: state.detailId, body: { ...(pendingSave?.body || {}), ...body } };
  setSaveState(t('saving'));
  clearTimeout(saveTimer);
  saveTimer = setTimeout(flushSave, delay);
}

async function flushSave() {
  clearTimeout(saveTimer);
  if (!pendingSave) return;
  const { id, body } = pendingSave;
  pendingSave = null;
  try {
    const { task } = await api(`/api/tasks/${id}`, { method: 'PATCH', body });
    const local = state.tasks.find((x) => x.id === id);
    if (local) Object.assign(local, task);
    sortTasks();
    if (state.detailId === id) setSaveState(t('saved'));
    render();
    renderHeader();
  } catch (err) {
    toast(err.message, true);
  }
}

function googleCalUrl(task) {
  const d = task.date.replace(/-/g, '');
  let dates;
  if (task.time) {
    const [h, m] = task.time.split(':').map(Number);
    const end = `${String(Math.min(h + 1, 23)).padStart(2, '0')}${String(m).padStart(2, '0')}00`;
    dates = `${d}T${task.time.replace(':', '')}00/${d}T${end}`;
  } else {
    const n = new Date(task.date + 'T00:00:00');
    n.setDate(n.getDate() + 1);
    dates = `${d}/${ymd(n).replace(/-/g, '')}`;
  }
  return `https://calendar.google.com/calendar/render?${new URLSearchParams({ action: 'TEMPLATE', text: task.title, dates, details: task.notes || '' })}`;
}

function calLinks(task) {
  if (!task.date) return '';
  return `<a class="btn quiet sm" href="${esc(googleCalUrl(task))}" target="_blank" rel="noopener">${icon('external')}${esc(t('addGoogleCal'))}</a>
    <a class="btn quiet sm" href="/api/tasks/${task.id}/ics" download>${icon('download')}${esc(t('downloadIcs'))}</a>`;
}

function segButtons(name, options, current) {
  return options
    .map(([value, label, dot]) => `<button type="button" class="seg-btn ${value === current ? 'active' : ''}" data-${name}="${value}">${dot ? `<i class="dot p-${value}"></i>` : ''}${esc(label)}</button>`)
    .join('');
}

function autoGrow(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

function openDetail(taskId) {
  const task = state.tasks.find((x) => x.id === taskId);
  if (!task) return;
  if (pendingSave && pendingSave.id !== taskId) flushSave();
  state.detailId = taskId;
  if (task.draft?.kind) draftOpts.kind = task.draft.kind;
  if (!draftOpts.langPicked) draftOpts.lang = state.lang;
  const u = state.user;
  const cfg = state.config.integrations;
  const left = Math.max(u.limits.aiDrafts - u.usage.aiDrafts, 0);
  const status = task.status || (task.done ? 'done' : 'todo');

  $('#detail-body').innerHTML = `
    <div class="stack" style="gap:18px">
      <div class="detail-top">
        <span class="save-state" id="save-state"></span>
        <div class="row" style="gap:2px">
          <button class="icon-btn" id="d-del" aria-label="${esc(t('delete'))}">${icon('trash')}</button>
          <button class="icon-btn" data-close aria-label="${esc(t('close'))}">${icon('x')}</button>
        </div>
      </div>
      <input class="page-title" id="d-title" value="${esc(task.title)}" placeholder="${esc(t('untitled'))}" maxlength="200" />
      <dl class="props">
        <dt>${icon('circle-dot')}${esc(t('fStatus'))}</dt>
        <dd><div class="seg mini" id="d-status">${segButtons('status', [['todo', t('sTodo')], ['doing', t('sDoing')], ['done', t('sDone')]], status)}</div></dd>
        <dt>${icon('calendar')}${esc(t('fDate'))}</dt>
        <dd><input class="prop-input" type="date" id="d-date" value="${esc(task.date)}" /><input class="prop-input" type="time" id="d-time" value="${esc(task.time)}" /><span id="d-callinks" class="row" style="gap:2px">${calLinks(task)}</span></dd>
        <dt>${icon('alert')}${esc(t('fPriority'))}</dt>
        <dd><div class="seg mini" id="d-prio">${segButtons('prio', [['high', t('pHigh'), 1], ['medium', t('pMedium'), 1], ['low', t('pLow'), 1]], task.priority)}</div></dd>
        <dt>${icon('user')}${esc(t('fContactName'))}</dt>
        <dd><input class="prop-input wide" id="d-cname" value="${esc(task.contactName)}" placeholder="—" /></dd>
        <dt>${icon('mail')}${esc(t('fContactEmail'))}</dt>
        <dd><input class="prop-input wide" id="d-cemail" type="email" dir="ltr" value="${esc(task.contactEmail)}" placeholder="name@example.com" /></dd>
      </dl>
      <textarea class="page-notes" id="d-notes" placeholder="${esc(t('notesPh'))}">${esc(task.notes)}</textarea>

      <div class="draft-box">
        <div class="block-title">${icon('sparkle')}${esc(t('assistant'))}</div>
        ${cfg.openai ? '' : `<div class="callout yellow">${icon('alert')}<span>${esc(t('demoAi'))}</span></div>`}
        <div class="seg" id="d-kind">${segButtons('kind', [['email', t('kindEmail')], ['message', t('kindMessage')]], draftOpts.kind)}</div>
        <div class="row gap wrap">
          <label class="field grow"><span>${esc(t('tone'))}</span>
            <select id="d-tone">
              <option value="formal">${esc(t('toneFormal'))}</option>
              <option value="friendly">${esc(t('toneFriendly'))}</option>
              <option value="brief">${esc(t('toneBrief'))}</option>
            </select>
          </label>
          <label class="field grow"><span>${esc(t('draftLang'))}</span>
            <select id="d-lang"><option value="ar">العربية</option><option value="en">English</option></select>
          </label>
        </div>
        <label class="field"><span>${esc(t('instructions'))}</span><input id="d-instr" placeholder="${esc(t('instructionsPh'))}" /></label>
        <button class="btn primary block" id="d-gen">${icon('sparkle')}<span>${esc(t('writeDraft'))}</span></button>
        <p class="muted small center" id="d-left">${esc(t('remaining', { n: left, max: u.limits.aiDrafts }))}</p>

        <div id="d-draft" class="stack" ${task.draft?.body ? '' : 'hidden'}>
          <label class="field" id="d-subj-wrap"><span>${esc(t('subject'))}</span><input id="d-subj" value="${esc(task.draft?.subject)}" /></label>
          <label class="field"><span>${esc(t('body'))}</span><textarea id="d-text" rows="9">${esc(task.draft?.body)}</textarea></label>
          <div class="send-row" id="d-send-row"></div>
        </div>
      </div>
    </div>`;

  $('#d-tone').value = draftOpts.tone;
  $('#d-lang').value = draftOpts.lang;
  syncDraftDir();
  renderSendRow();
  autoGrow($('#d-notes'));

  // Autosaving properties
  const title = $('#d-title');
  title.addEventListener('input', () => title.value.trim() && queueSave({ title: title.value }));
  title.addEventListener('blur', () => {
    if (!title.value.trim()) {
      title.value = task.title;
      toast(t('titleRequired'), true);
    }
  });
  title.addEventListener('keydown', (e) => e.key === 'Enter' && $('#d-notes').focus());
  $$('#d-status [data-status]').forEach((b) =>
    b.addEventListener('click', () => {
      $$('#d-status .seg-btn').forEach((x) => x.classList.toggle('active', x === b));
      queueSave({ status: b.dataset.status }, 0);
      if (b.dataset.status === 'done') toast(t('tDone'));
    }),
  );
  $$('#d-prio [data-prio]').forEach((b) =>
    b.addEventListener('click', () => {
      $$('#d-prio .seg-btn').forEach((x) => x.classList.toggle('active', x === b));
      queueSave({ priority: b.dataset.prio }, 0);
    }),
  );
  const onDate = () => {
    queueSave({ date: $('#d-date').value, time: $('#d-time').value }, 0);
    $('#d-callinks').innerHTML = calLinks({ ...task, date: $('#d-date').value, time: $('#d-time').value });
  };
  $('#d-date').addEventListener('change', onDate);
  $('#d-time').addEventListener('change', onDate);
  $('#d-cname').addEventListener('input', (e) => queueSave({ contactName: e.target.value }));
  $('#d-cemail').addEventListener('input', (e) => {
    if (!e.target.value || e.target.checkValidity()) queueSave({ contactEmail: e.target.value });
    renderSendRow();
  });
  $('#d-notes').addEventListener('input', (e) => {
    autoGrow(e.target);
    queueSave({ notes: e.target.value });
  });

  // Drafting
  $$('#d-kind [data-kind]').forEach((b) =>
    b.addEventListener('click', () => {
      draftOpts.kind = b.dataset.kind;
      $$('#d-kind .seg-btn').forEach((x) => x.classList.toggle('active', x === b));
      renderSendRow();
    }),
  );
  $('#d-tone').onchange = (e) => (draftOpts.tone = e.target.value);
  $('#d-lang').onchange = (e) => {
    draftOpts.lang = e.target.value;
    draftOpts.langPicked = true;
    syncDraftDir();
  };
  const saveDraftFields = () => queueSave({ draft: { subject: $('#d-subj').value, body: $('#d-text').value, kind: draftOpts.kind } });
  $('#d-subj').addEventListener('input', saveDraftFields);
  $('#d-text').addEventListener('input', saveDraftFields);
  $('#d-gen').onclick = generateDraft;

  $('#d-del').onclick = async () => {
    if (!confirm(t('confirmDelete'))) return;
    pendingSave = null;
    await api(`/api/tasks/${task.id}`, { method: 'DELETE' });
    state.tasks = state.tasks.filter((x) => x.id !== task.id);
    closeSheets();
    render();
    renderHeader();
    toast(t('tDeleted'));
  };

  openSheet('sheet-detail');
}

function syncDraftDir() {
  const dir = draftOpts.lang === 'en' ? 'ltr' : 'rtl';
  ['#d-subj', '#d-text'].forEach((s) => $(s) && ($(s).dir = dir));
}

function draftValues() {
  return { to: $('#d-cemail').value.trim(), subject: $('#d-subj').value.trim(), body: $('#d-text').value };
}

function renderSendRow() {
  const row = $('#d-send-row');
  if (!row) return;
  const isEmail = draftOpts.kind === 'email';
  $('#d-subj-wrap').hidden = !isEmail;
  const u = state.user;
  const gmailOn = state.config.integrations.gmail;
  let primary = '';
  if (isEmail && u.gmail) primary = `<button class="btn primary" id="d-send">${icon('send')}${esc(t('sendGmail'))}</button>`;
  else if (isEmail && gmailOn) primary = `<button class="btn primary" id="d-connect">${icon('link')}${esc(t('connectGmailToSend'))}</button>`;
  row.innerHTML = `${primary}
    ${isEmail
      ? `<div class="menu-wrap"><button class="btn ghost" id="d-openin">${icon('external')}${esc(t('openIn'))}</button>
          <div class="menu" id="d-menu" hidden>
            <a href="#" data-compose="gmail" target="_blank" rel="noopener">${icon('mail')}Gmail</a>
            <a href="#" data-compose="outlook" target="_blank" rel="noopener">${icon('mail')}Outlook</a>
            <a href="#" data-compose="mailto">${icon('mail')}${esc(t('mailApp'))}</a>
          </div></div>`
      : `<button class="btn ghost" id="d-wa">${icon('chat')}${esc(t('whatsapp'))}</button>`}
    <button class="btn ghost" id="d-copy">${icon('copy')}${esc(t('copy'))}</button>`;

  $('#d-send')?.addEventListener('click', startSend);
  $('#d-connect')?.addEventListener('click', async () => {
    await flushSave();
    location.href = '/api/google/connect';
  });
  $('#d-openin')?.addEventListener('click', () => ($('#d-menu').hidden = !$('#d-menu').hidden));
  $$('[data-compose]', row).forEach((a) =>
    a.addEventListener('click', (e) => {
      const { to, subject, body } = draftValues();
      const urls = {
        gmail: `https://mail.google.com/mail/?${new URLSearchParams({ view: 'cm', fs: '1', to, su: subject, body })}`,
        outlook: `https://outlook.live.com/mail/0/deeplink/compose?${new URLSearchParams({ to, subject, body })}`,
        mailto: `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      };
      a.href = urls[a.dataset.compose];
      if (a.dataset.compose === 'mailto') {
        e.preventDefault();
        location.href = a.href;
      }
      $('#d-menu').hidden = true;
    }),
  );
  $('#d-wa')?.addEventListener('click', () => window.open(`https://wa.me/?text=${encodeURIComponent($('#d-text').value)}`, '_blank', 'noopener'));
  $('#d-copy').addEventListener('click', async () => {
    const { subject, body } = draftValues();
    try {
      await navigator.clipboard.writeText(isEmail && subject ? `${subject}\n\n${body}` : body);
      toast(t('copied'));
    } catch {
      toast(t('copyFailed'), true);
    }
  });
}

async function generateDraft() {
  const btn = $('#d-gen');
  await flushSave();
  busy(btn, true, t('writing'));
  try {
    const { draft, user } = await api('/api/ai/draft', {
      method: 'POST',
      body: {
        taskId: state.detailId,
        kind: draftOpts.kind,
        tone: draftOpts.tone,
        lang: draftOpts.lang,
        contactName: $('#d-cname').value,
        instructions: $('#d-instr').value,
      },
    });
    state.user = user;
    const task = state.tasks.find((x) => x.id === state.detailId);
    task.draft = { subject: draft.subject, body: draft.body, kind: draft.kind };
    $('#d-draft').hidden = false;
    $('#d-subj').value = draft.subject;
    $('#d-text').value = draft.body;
    syncDraftDir();
    renderSendRow();
    $('#d-left').textContent = t('remaining', { n: Math.max(user.limits.aiDrafts - user.usage.aiDrafts, 0), max: user.limits.aiDrafts });
    $('#d-text').scrollIntoView({ behavior: 'smooth', block: 'center' });
    render();
    renderHeader();
  } catch (err) {
    toast(err.message, true);
    if (err.status === 402) setTimeout(() => { closeSheets(); showView('account'); }, 1200);
  } finally {
    busy(btn, false);
  }
}

function startSend() {
  const { to, subject, body } = draftValues();
  if (!to) return toast(t('needRecipient'), true);
  if (!$('#d-cemail').checkValidity()) return toast(t('invalidEmail'), true);
  if (!subject || !body.trim()) return toast(t('needSubjectBody'), true);
  state.pendingSend = { taskId: state.detailId, to, subject, body };
  flushSave();
  $('#confirm-preview').innerHTML = `
    <dl>
      <dt>${esc(t('from'))}</dt><dd>${esc(state.user.name)} &lt;<span dir="ltr">${esc(state.user.gmail)}</span>&gt;</dd>
      <dt>${esc(t('to'))}</dt><dd dir="ltr" style="text-align:start">${esc(to)}</dd>
      <dt>${esc(t('subject'))}</dt><dd>${esc(subject)}</dd>
    </dl>
    <pre dir="auto">${esc(body)}</pre>`;
  const keep = state.detailId;
  openSheet('sheet-confirm');
  state.detailId = keep;
}

$('#confirm-send').addEventListener('click', async () => {
  const btn = $('#confirm-send');
  busy(btn, true, t('sending'));
  try {
    const { email, user } = await api('/api/email/send', { method: 'POST', body: { ...state.pendingSend, confirm: true } });
    state.user = user;
    const task = state.tasks.find((x) => x.id === state.pendingSend.taskId);
    if (task) task.lastEmailAt = email.sentAt;
    state.pendingSend = null;
    closeSheets();
    render();
    renderHeader();
    toast(t('emailSent', { email: user.gmail }));
  } catch (err) {
    toast(err.message, true);
    if (err.status === 401) refreshUser();
  } finally {
    busy(btn, false);
  }
});

// ---------- Calendar ----------
function weekStartsSaturday() {
  return state.lang === 'ar';
}

function buildWeekHeader() {
  // 2024-01-06 is a Saturday, 2024-01-07 a Sunday.
  const start = weekStartsSaturday() ? 6 : 7;
  const fmt = new Intl.DateTimeFormat(locale(), { weekday: 'short' });
  $('#cal-week').innerHTML = Array.from({ length: 7 }, (_, i) => `<div>${esc(fmt.format(new Date(2024, 0, start + i)))}</div>`).join('');
}

$('#cal-prev').addEventListener('click', () => shiftMonth(-1));
$('#cal-next').addEventListener('click', () => shiftMonth(1));
$('#cal-add').addEventListener('click', () => openEditor(state.calDay));
function shiftMonth(n) {
  const m = state.calMonth;
  state.calMonth = new Date(m.getFullYear(), m.getMonth() + n, 1);
  renderCalendar();
}

function renderCalendar() {
  const m = state.calMonth;
  $('#cal-title').textContent = new Intl.DateTimeFormat(locale(), { month: 'long', year: 'numeric' }).format(m);
  const offset = weekStartsSaturday() ? (m.getDay() + 1) % 7 : m.getDay();
  const start = new Date(m.getFullYear(), m.getMonth(), 1 - offset);
  const daysInMonth = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
  const cells = Math.ceil((offset + daysInMonth) / 7) * 7;
  const counts = {};
  state.tasks.forEach((x) => {
    if (x.date && !x.done) counts[x.date] = (counts[x.date] || 0) + 1;
  });
  const t0 = today();
  let html = '';
  for (let i = 0; i < cells; i++) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    const key = ymd(d);
    const cls = ['cal-cell', d.getMonth() !== m.getMonth() && 'out', key === t0 && 'today', key === state.calDay && 'sel'].filter(Boolean).join(' ');
    html += `<button class="${cls}" data-day="${key}" aria-label="${esc(fmtDate(key, { day: 'numeric', month: 'long' }))}"><span>${d.getDate()}</span><span class="dots">${'<i></i>'.repeat(Math.min(counts[key] || 0, 3))}</span></button>`;
  }
  $('#cal-grid').innerHTML = html;
  $$('#cal-grid [data-day]').forEach((b) =>
    b.addEventListener('click', () => {
      state.calDay = b.dataset.day;
      renderCalendar();
    }),
  );
  $('#cal-day-title').textContent = fmtDate(state.calDay, { weekday: 'long', day: 'numeric', month: 'long' });
  const dayTasks = state.tasks.filter((x) => x.date === state.calDay);
  $('#cal-day-list').innerHTML = dayTasks.length ? dayTasks.map((x) => taskRow(x)).join('') : emptyRow(t('emptyDay'), 'calendar');
}

// ---------- Sent mail ----------
async function renderEmails() {
  const list = $('#email-list');
  try {
    state.emails = (await api('/api/email/log')).emails;
  } catch (err) {
    list.innerHTML = emptyRow(err.message, 'alert');
    return;
  }
  const fmt = new Intl.DateTimeFormat(locale(), { dateStyle: 'medium', timeStyle: 'short' });
  list.innerHTML = state.emails.length
    ? state.emails
        .map(
          (e) => `<li class="email-item"><details>
          <summary>
            <span class="strong">${esc(e.subject)}</span>
            <span class="muted small"><span dir="ltr">${esc(e.to)}</span> · ${esc(fmt.format(new Date(e.sentAt)))}</span>
          </summary>
          <pre dir="auto">${esc(e.body)}</pre>
        </details></li>`,
        )
        .join('')
    : emptyRow(t('noEmails'), 'mail');
}

// ---------- Account ----------
function meter(label, used, limit) {
  const pct = Math.min(100, Math.round((used / limit) * 100));
  return `<div class="meter"><div class="meter-row"><span>${esc(label)}</span><span class="muted">${used} / ${limit}</span></div>
    <div class="meter-bar"><i class="${pct >= 100 ? 'full' : ''}" style="width:${pct}%"></i></div></div>`;
}

function renderAccount() {
  const u = state.user;
  const c = state.config;
  $('#acc-avatar').textContent = (u.name.trim()[0] || '?').toUpperCase();
  $('#acc-name').textContent = u.name;
  $('#acc-email').textContent = u.email;
  $('#usage').innerHTML = meter(t('aiDrafts'), u.usage.aiDrafts, u.limits.aiDrafts) + meter(t('emailsSent'), u.usage.emails, u.limits.emails);
  $$('[data-set-lang]').forEach((b) => b.classList.toggle('active', b.dataset.setLang === state.lang));

  // Gmail
  let gmail;
  if (!c.integrations.gmail) {
    gmail = `<div class="callout">${icon('alert')}<span>${esc(t('gmailOffNote'))}</span></div>`;
  } else if (u.gmail) {
    gmail = `<div class="gmail-row"><span class="gmail-logo">${icon('mail')}</span>
      <div class="grow"><p class="strong">Gmail</p><p class="muted small" dir="ltr" style="text-align:start">${esc(u.gmail)}</p></div>
      <button class="btn ghost sm" id="gmail-disconnect">${esc(t('disconnect'))}</button></div>
      <p class="muted small" style="margin-top:10px">${esc(t('gmailNote'))}</p>`;
  } else {
    gmail = `<div class="gmail-row"><span class="gmail-logo">${icon('mail')}</span><p class="grow">${esc(t('gmailNotConnected'))}</p></div>
      <a class="btn primary block" href="/api/google/connect" style="margin-top:12px">${icon('link')}${esc(t('connectGmail'))}</a>
      <p class="muted small" style="margin-top:8px">${esc(t('gmailNote'))}</p>`;
  }
  $('#gmail-card').innerHTML = `<h3 class="card-title">${esc(t('gmailTitle'))}</h3>${gmail}`;
  $('#gmail-disconnect')?.addEventListener('click', async () => {
    state.user = (await api('/api/google/disconnect', { method: 'POST' })).user;
    renderAccount();
    toast(t('disconnectedToast'));
  });

  // Plan
  const isPro = u.plan === 'pro';
  let action = '';
  if (isPro && u.hasBilling) action = `<button class="btn ghost block" id="billing-portal">${esc(t('manageBilling'))}</button>`;
  else if (!isPro && c.integrations.stripe) action = `<button class="btn primary block" id="billing-upgrade">${icon('crown')}${esc(t('upgrade'))} — ${esc(c.proPrice)}${esc(t('perMonth'))}</button>`;
  if (c.demoUpgrade) {
    action += `<button class="btn ghost block" id="billing-demo" style="margin-top:8px">${esc(isPro ? t('demoBack') : t('demoTry'))}</button>
      <p class="muted small center" style="margin-top:6px">${esc(t('demoNote'))}</p>`;
  }
  $('#plan-card').innerHTML = `
    <h3 class="card-title">${esc(t('yourPlan'))}</h3>
    <div class="plans">
      <div class="plan ${isPro ? '' : 'current'}"><h4>${esc(t('planFree'))}${isPro ? '' : ` <span class="tag blue">${esc(t('current'))}</span>`}</h4><div class="price">0</div><ul>
        <li>${esc(t('featTasks'))}</li><li>${esc(t('featDrafts', { n: c.plans.free.aiDrafts }))}</li><li>${esc(t('featEmails', { n: c.plans.free.emails }))}</li></ul></div>
      <div class="plan ${isPro ? 'current' : ''}"><h4>${icon('crown')}${esc(t('planPro'))}${isPro ? ` <span class="tag blue">${esc(t('current'))}</span>` : ''}</h4><div class="price">${esc(c.proPrice)} <small>${esc(t('perMonth'))}</small></div><ul>
        <li>${esc(t('featDrafts', { n: c.plans.pro.aiDrafts }))}</li><li>${esc(t('featEmails', { n: c.plans.pro.emails }))}</li><li>${esc(t('featPriority'))}</li></ul></div>
    </div>
    ${action}`;

  $('#billing-upgrade')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    busy(btn, true, t('redirectCheckout'));
    try {
      location.href = (await api('/api/billing/checkout', { method: 'POST' })).url;
    } catch (err) {
      toast(err.message, true);
      busy(btn, false);
    }
  });
  $('#billing-portal')?.addEventListener('click', async () => {
    try {
      location.href = (await api('/api/billing/portal', { method: 'POST' })).url;
    } catch (err) {
      toast(err.message, true);
    }
  });
  $('#billing-demo')?.addEventListener('click', async () => {
    state.user = (await api('/api/billing/demo-upgrade', { method: 'POST' })).user;
    renderHeader();
    renderAccount();
  });
}

boot().catch((err) => {
  console.error(err);
  $('#auth').hidden = false;
});
