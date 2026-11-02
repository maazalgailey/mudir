'use strict';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

const state = {
  user: null,
  config: null,
  tasks: [],
  emails: [],
  filter: 'today',
  view: 'tasks',
  calMonth: null, // Date at first of month
  calDay: null, // 'YYYY-MM-DD'
  editingId: null,
  detailId: null,
  pendingSend: null,
  plan: null,
};

// ---------- Helpers ----------
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function ymd(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
const today = () => ymd(new Date());

const LOCALE = 'ar-EG-u-nu-latn';
function fmtDate(s, opts = { weekday: 'short', day: 'numeric', month: 'short' }) {
  if (!s) return '';
  return new Intl.DateTimeFormat(LOCALE, opts).format(new Date(s + 'T00:00:00'));
}
function fmtTime(t) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m);
  return new Intl.DateTimeFormat(LOCALE, { hour: 'numeric', minute: '2-digit' }).format(d);
}

async function api(path, opts = {}) {
  const res = await fetch(path, {
    method: opts.method || 'GET',
    headers: opts.body ? { 'Content-Type': 'application/json' } : undefined,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    credentials: 'same-origin',
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(json.error || 'حدث خطأ غير متوقع');
    err.status = res.status;
    throw err;
  }
  return json;
}

let toastTimer;
function toast(msg, isErr = false) {
  const el = $('#toast');
  el.textContent = msg;
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
    btn.innerHTML = btn.dataset.label;
  }
}

// ---------- Sheets ----------
function openSheet(id) {
  $$('.sheet').forEach((s) => (s.hidden = s.id !== id));
  $('#backdrop').hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeSheets() {
  $$('.sheet').forEach((s) => (s.hidden = true));
  $('#backdrop').hidden = true;
  document.body.style.overflow = '';
  state.detailId = null;
}
$('#backdrop').addEventListener('click', closeSheets);
document.addEventListener('click', (e) => {
  if (e.target.closest('[data-close]')) closeSheets();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSheets();
});

// ---------- Auth ----------
let authMode = 'login';
$$('[data-auth]').forEach((b) =>
  b.addEventListener('click', () => {
    authMode = b.dataset.auth;
    $$('[data-auth]').forEach((x) => x.classList.toggle('active', x === b));
    $$('[data-only="register"]').forEach((x) => (x.hidden = authMode !== 'register'));
    $('#auth-submit').textContent = authMode === 'login' ? 'دخول' : 'إنشاء الحساب';
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
  }
});

$('#logout').addEventListener('click', async () => {
  await api('/api/auth/logout', { method: 'POST' });
  state.user = null;
  $('#app').hidden = true;
  $('#auth').hidden = false;
});

// ---------- Boot ----------
async function boot() {
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
  await loadTasks();
  renderHeader();

  const params = new URLSearchParams(location.search);
  if (params.get('billing') === 'success') {
    toast('تم الاشتراك بنجاح! جاري تفعيل الباقة الاحترافية…');
    setTimeout(refreshUser, 2500);
  } else if (params.get('billing') === 'cancel') {
    toast('تم إلغاء عملية الدفع');
  }
  if (params.has('billing')) history.replaceState(null, '', location.pathname + location.hash);

  showView(location.hash.replace('#', '') || 'tasks');
}

async function refreshUser() {
  state.user = (await api('/api/me')).user;
  renderHeader();
  if (state.view === 'account') renderAccount();
}

async function loadTasks() {
  state.tasks = (await api('/api/tasks')).tasks;
}

function renderHeader() {
  const u = state.user;
  const h = new Date().getHours();
  const greet = h < 12 ? 'صباح الخير' : 'مساء الخير';
  $('#hello').textContent = `${greet}، ${u.name.split(' ')[0]}`;
  $('#today-label').textContent = fmtDate(today(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const badge = $('#plan-badge');
  badge.textContent = u.plan === 'pro' ? 'احترافي ✦' : 'مجاني';
  badge.classList.toggle('pro', u.plan === 'pro');
}

// ---------- Navigation ----------
const VIEWS = ['tasks', 'calendar', 'emails', 'account'];
function showView(v) {
  if (!VIEWS.includes(v)) v = 'tasks';
  state.view = v;
  VIEWS.forEach((x) => ($(`#view-${x}`).hidden = x !== v));
  $$('.tab').forEach((t) => t.classList.toggle('active', t.dataset.view === v));
  $('#fab').hidden = v === 'account' || v === 'emails';
  if (location.hash !== '#' + v) history.replaceState(null, '', '#' + v);
  window.scrollTo(0, 0);
  render();
}
$$('.tab').forEach((t) => t.addEventListener('click', () => showView(t.dataset.view)));

function render() {
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
    $$('#task-filters .chip').forEach((x) => x.classList.toggle('active', x === c));
    renderTasks();
  }),
);

function filterTasks() {
  const t = today();
  return state.tasks.filter((x) => {
    switch (state.filter) {
      case 'today': return !x.done && (x.date === t || (x.date && x.date < t) || !x.date);
      case 'upcoming': return !x.done && x.date > t;
      case 'overdue': return !x.done && x.date && x.date < t;
      case 'done': return x.done;
      default: return true;
    }
  });
}

const PRIO = { high: 'عالية', medium: 'متوسطة', low: 'منخفضة' };

function taskItem(task, extra = {}) {
  const t = today();
  const overdue = !task.done && task.date && task.date < t;
  const meta = [];
  if (task.date) meta.push(`<span class="tag ${overdue ? 'overdue' : ''}">${overdue ? 'متأخرة · ' : ''}${esc(fmtDate(task.date))}${task.time ? ' · ' + esc(fmtTime(task.time)) : ''}</span>`);
  if (task.contactName || task.contactEmail) meta.push(`<span class="tag">👤 ${esc(task.contactName || task.contactEmail)}</span>`);
  if (task.draft?.body) meta.push('<span class="tag">✎ مسودة</span>');
  if (task.lastEmailAt) meta.push('<span class="tag">✉ أُرسل</span>');
  if (extra.reason) meta.push(`<span class="tag reason">${esc(extra.reason)}</span>`);
  return `<li class="task p-${task.priority} ${task.done ? 'done' : ''}">
    ${extra.rank ? `<span class="rank">${extra.rank}</span>` : `<button class="task-check" data-toggle="${task.id}" aria-label="${task.done ? 'إلغاء الإكمال' : 'إكمال'}">✓</button>`}
    <button class="task-main" data-open="${task.id}">
      <span class="task-title">${esc(task.title)}</span>
      <span class="task-meta">${meta.join('')}</span>
    </button>
  </li>`;
}

function emptyState(text) {
  return `<li class="empty"><span class="big">🌿</span>${text}</li>`;
}

function renderTasks() {
  const list = $('#task-list');
  const planBox = $('#plan-result');
  $('#ai-plan-btn .pro-tag').hidden = state.user.plan === 'pro';

  if (state.plan) {
    const byId = Object.fromEntries(state.tasks.map((t) => [t.id, t]));
    planBox.innerHTML = `<div class="plan-summary"><strong>✦ اقتراح اليوم:</strong> ${esc(state.plan.summary)}
      <button class="btn ghost sm" id="plan-clear" style="margin-top:8px">إخفاء الترتيب</button></div>`;
    $('#plan-clear').onclick = () => { state.plan = null; renderTasks(); };
    const items = state.plan.plan.filter((p) => byId[p.id] && !byId[p.id].done);
    list.innerHTML = items.length ? items.map((p, i) => taskItem(byId[p.id], { rank: i + 1, reason: p.reason })).join('') : emptyState('لا توجد مهام مفتوحة.');
    return;
  }
  planBox.innerHTML = '';
  const tasks = filterTasks();
  const msgs = { today: 'لا مهام لليوم. أضف مهمة بالزر +', upcoming: 'لا مهام قادمة', overdue: 'لا مهام متأخرة — رائع!', done: 'لم تُكمل أي مهمة بعد', all: 'ابدأ بإضافة أول مهمة' };
  list.innerHTML = tasks.length ? tasks.map((t) => taskItem(t)).join('') : emptyState(msgs[state.filter]);
}

document.addEventListener('click', async (e) => {
  const tog = e.target.closest('[data-toggle]');
  if (tog) {
    const task = state.tasks.find((t) => t.id === tog.dataset.toggle);
    const { task: updated } = await api(`/api/tasks/${task.id}`, { method: 'PATCH', body: { done: !task.done } });
    Object.assign(task, updated);
    if (updated.done) toast('أحسنت! تم إكمال المهمة ✓');
    render();
    return;
  }
  const open = e.target.closest('[data-open]');
  if (open) openDetail(open.dataset.open);
});

$('#ai-plan-btn').addEventListener('click', async () => {
  if (state.user.plan !== 'pro') {
    toast('ترتيب الأولويات الذكي متاح في الباقة الاحترافية');
    showView('account');
    return;
  }
  const btn = $('#ai-plan-btn');
  btn.disabled = true;
  btn.querySelector('small').textContent = 'جارٍ التحليل…';
  try {
    state.plan = await api('/api/ai/plan', { method: 'POST' });
    renderTasks();
  } catch (err) {
    toast(err.message, true);
  } finally {
    btn.disabled = false;
    btn.querySelector('small').textContent = 'دع الذكاء الاصطناعي يقترح بماذا تبدأ';
  }
});

// ---------- Task editor ----------
let editPrio = 'medium';
$$('#prio-seg .seg-btn').forEach((b) =>
  b.addEventListener('click', () => {
    editPrio = b.dataset.prio;
    $$('#prio-seg .seg-btn').forEach((x) => x.classList.toggle('active', x === b));
  }),
);

function openEditor(task, presetDate) {
  state.editingId = task?.id || null;
  const f = $('#edit-form');
  f.reset();
  $('#edit-title').textContent = task ? 'تعديل المهمة' : 'مهمة جديدة';
  f.title.value = task?.title || '';
  f.date.value = task?.date ?? presetDate ?? today();
  f.time.value = task?.time || '';
  f.notes.value = task?.notes || '';
  f.contactName.value = task?.contactName || '';
  f.contactEmail.value = task?.contactEmail || '';
  editPrio = task?.priority || 'medium';
  $$('#prio-seg .seg-btn').forEach((x) => x.classList.toggle('active', x.dataset.prio === editPrio));
  openSheet('sheet-edit');
  setTimeout(() => f.title.focus(), 250);
}

$('#fab').addEventListener('click', () => openEditor(null, state.view === 'calendar' ? state.calDay : undefined));
$('#cal-add').addEventListener('click', () => openEditor(null, state.calDay));

$('#edit-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = e.target;
  const body = {
    title: f.title.value,
    date: f.date.value,
    time: f.time.value,
    notes: f.notes.value,
    priority: editPrio,
    contactName: f.contactName.value,
    contactEmail: f.contactEmail.value,
  };
  if (body.contactEmail && !f.contactEmail.checkValidity()) return toast('بريد المستلم غير صالح', true);
  const btn = f.querySelector('[type=submit]');
  busy(btn, true);
  try {
    if (state.editingId) {
      const { task } = await api(`/api/tasks/${state.editingId}`, { method: 'PATCH', body });
      Object.assign(state.tasks.find((t) => t.id === task.id), task);
      toast('تم حفظ التعديلات');
    } else {
      const { task } = await api('/api/tasks', { method: 'POST', body });
      state.tasks.push(task);
      toast('تمت إضافة المهمة');
    }
    state.tasks.sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999') || (a.time || '').localeCompare(b.time || ''));
    const reopen = state.editingId;
    closeSheets();
    render();
    if (reopen) openDetail(reopen);
  } catch (err) {
    toast(err.message, true);
  } finally {
    busy(btn, false);
  }
});

// ---------- Task detail + AI drafting ----------
const draftOpts = { kind: 'email', tone: 'formal', lang: 'ar' };

function googleCalUrl(t) {
  const d = t.date.replace(/-/g, '');
  let dates;
  if (t.time) {
    const [h, m] = t.time.split(':').map(Number);
    const end = `${String(Math.min(h + 1, 23)).padStart(2, '0')}${String(m).padStart(2, '0')}00`;
    dates = `${d}T${t.time.replace(':', '')}00/${d}T${end}`;
  } else {
    const n = new Date(t.date + 'T00:00:00');
    n.setDate(n.getDate() + 1);
    dates = `${d}/${ymd(n).replace(/-/g, '')}`;
  }
  const p = new URLSearchParams({ action: 'TEMPLATE', text: t.title, dates, details: t.notes || '' });
  return `https://calendar.google.com/calendar/render?${p}`;
}

function openDetail(id) {
  const t = state.tasks.find((x) => x.id === id);
  if (!t) return;
  state.detailId = id;
  if (t.draft?.kind) draftOpts.kind = t.draft.kind;
  const cfg = state.config.integrations;
  const u = state.user;
  const left = u.limits.aiDrafts - u.usage.aiDrafts;

  $('#detail-body').innerHTML = `
    <div class="detail-head">
      <h3>${esc(t.title)}</h3>
      <div class="task-meta">
        <span class="tag">الأولوية: ${PRIO[t.priority]}</span>
        ${t.date ? `<span class="tag">📅 ${esc(fmtDate(t.date, { weekday: 'long', day: 'numeric', month: 'long' }))}${t.time ? ' · ' + esc(fmtTime(t.time)) : ''}</span>` : '<span class="tag">بدون تاريخ</span>'}
      </div>
      ${t.notes ? `<p class="muted" style="margin-top:8px;white-space:pre-wrap">${esc(t.notes)}</p>` : ''}
    </div>
    <div class="detail-actions">
      <button class="btn ghost sm" id="d-done">${t.done ? '↺ إعادة فتح' : '✓ إكمال'}</button>
      <button class="btn ghost sm" id="d-edit">✎ تعديل</button>
      ${t.date ? `<a class="btn ghost sm" href="${esc(googleCalUrl(t))}" target="_blank" rel="noopener">＋ تقويم Google</a>
      <a class="btn ghost sm" href="/api/tasks/${t.id}/ics" download>⤓ ملف تقويم</a>` : ''}
      <button class="btn ghost sm danger-text" id="d-del">حذف</button>
    </div>

    <div class="draft-box">
      <h4><span class="spark">✦</span> مساعد الصياغة الذكي</h4>
      ${!cfg.openai ? '<p class="notice">الوضع التجريبي: ستُستخدم صياغة جاهزة حتى يُضاف مفتاح OpenAI على الخادم.</p>' : ''}
      <div class="seg" id="d-kind">
        <button type="button" class="seg-btn ${draftOpts.kind === 'email' ? 'active' : ''}" data-kind="email">بريد إلكتروني</button>
        <button type="button" class="seg-btn ${draftOpts.kind === 'message' ? 'active' : ''}" data-kind="message">رسالة قصيرة</button>
      </div>
      <div class="row gap">
        <label class="field grow"><span>اسم المستلم</span><input id="d-cname" value="${esc(t.contactName)}" /></label>
        <label class="field grow"><span>بريد المستلم</span><input id="d-cemail" type="email" dir="ltr" value="${esc(t.contactEmail)}" /></label>
      </div>
      <div class="row gap">
        <label class="field grow"><span>الأسلوب</span>
          <select id="d-tone">
            <option value="formal">رسمي</option>
            <option value="friendly">ودّي</option>
            <option value="brief">مختصر</option>
          </select>
        </label>
        <label class="field grow"><span>اللغة</span>
          <select id="d-lang">
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </label>
      </div>
      <label class="field"><span>تعليمات إضافية (اختياري)</span>
        <input id="d-instr" placeholder="مثال: اطلب تأكيد الموعد واذكر أن المستندات مرفقة" />
      </label>
      <button class="btn primary block" id="d-gen">✦ اكتب المسودة</button>
      <p class="muted small center">متبقٍ لك ${Math.max(left, 0)} من ${u.limits.aiDrafts} صياغة هذا الشهر</p>

      <div id="d-draft" ${t.draft?.body ? '' : 'hidden'} class="stack">
        <label class="field" id="d-subj-wrap"><span>الموضوع</span><input id="d-subj" value="${esc(t.draft?.subject)}" /></label>
        <label class="field"><span>النص</span><textarea id="d-text" rows="9">${esc(t.draft?.body)}</textarea></label>
        <div class="detail-actions">
          <button class="btn accent" id="d-send">✉ إرسال بالبريد</button>
          <button class="btn ghost" id="d-copy">نسخ</button>
          <button class="btn ghost" id="d-wa">واتساب</button>
          <button class="btn ghost" id="d-save">حفظ</button>
        </div>
      </div>
    </div>`;

  $('#d-tone').value = draftOpts.tone;
  $('#d-lang').value = draftOpts.lang;
  syncKind();

  $$('#d-kind .seg-btn').forEach((b) =>
    b.addEventListener('click', () => {
      draftOpts.kind = b.dataset.kind;
      $$('#d-kind .seg-btn').forEach((x) => x.classList.toggle('active', x === b));
      syncKind();
    }),
  );
  $('#d-tone').onchange = (e) => (draftOpts.tone = e.target.value);
  $('#d-lang').onchange = (e) => (draftOpts.lang = e.target.value);

  $('#d-done').onclick = async () => {
    const { task } = await api(`/api/tasks/${t.id}`, { method: 'PATCH', body: { done: !t.done } });
    Object.assign(t, task);
    closeSheets();
    render();
  };
  $('#d-edit').onclick = () => openEditor(t);
  $('#d-del').onclick = async () => {
    if (!confirm('حذف هذه المهمة نهائيًا؟')) return;
    await api(`/api/tasks/${t.id}`, { method: 'DELETE' });
    state.tasks = state.tasks.filter((x) => x.id !== t.id);
    closeSheets();
    render();
    toast('تم حذف المهمة');
  };

  $('#d-gen').onclick = generateDraft;
  $('#d-copy').onclick = async () => {
    const text = draftText();
    try {
      await navigator.clipboard.writeText(text);
      toast('تم النسخ');
    } catch {
      toast('تعذّر النسخ', true);
    }
  };
  $('#d-wa').onclick = () => window.open(`https://wa.me/?text=${encodeURIComponent($('#d-text').value)}`, '_blank', 'noopener');
  $('#d-save').onclick = () => saveDraft(true);
  $('#d-send').onclick = startSend;

  openSheet('sheet-detail');
}

function syncKind() {
  const isEmail = draftOpts.kind === 'email';
  const subj = $('#d-subj-wrap');
  if (subj) subj.hidden = !isEmail;
  const send = $('#d-send');
  if (send) send.hidden = !isEmail;
}

function draftText() {
  const subj = $('#d-subj').value.trim();
  const body = $('#d-text').value;
  return draftOpts.kind === 'email' && subj ? `${subj}\n\n${body}` : body;
}

async function saveDraft(notify) {
  const t = state.tasks.find((x) => x.id === state.detailId);
  const body = {
    contactName: $('#d-cname').value,
    contactEmail: $('#d-cemail').checkValidity() ? $('#d-cemail').value : t.contactEmail,
    draft: { subject: $('#d-subj').value, body: $('#d-text').value, kind: draftOpts.kind },
  };
  const { task } = await api(`/api/tasks/${t.id}`, { method: 'PATCH', body });
  Object.assign(t, task);
  if (notify) toast('تم حفظ المسودة');
  render();
}

async function generateDraft() {
  const btn = $('#d-gen');
  busy(btn, true, 'جارٍ الكتابة…');
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
    const t = state.tasks.find((x) => x.id === state.detailId);
    t.draft = { subject: draft.subject, body: draft.body, kind: draft.kind };
    t.contactName = $('#d-cname').value;
    $('#d-draft').hidden = false;
    $('#d-subj').value = draft.subject;
    $('#d-text').value = draft.body;
    $('#d-text').dir = draftOpts.lang === 'en' ? 'ltr' : 'rtl';
    syncKind();
    const left = user.limits.aiDrafts - user.usage.aiDrafts;
    btn.nextElementSibling.textContent = `متبقٍ لك ${Math.max(left, 0)} من ${user.limits.aiDrafts} صياغة هذا الشهر`;
    $('#d-text').scrollIntoView({ behavior: 'smooth', block: 'center' });
    render();
  } catch (err) {
    toast(err.message, true);
    if (err.status === 402) setTimeout(() => { closeSheets(); showView('account'); }, 1200);
  } finally {
    busy(btn, false);
  }
}

// ---------- Email sending (consent + confirm) ----------
function startSend() {
  const to = $('#d-cemail').value.trim();
  const subject = $('#d-subj').value.trim();
  const body = $('#d-text').value;
  if (!to || !$('#d-cemail').checkValidity()) return toast('أدخل بريدًا صحيحًا للمستلم', true);
  if (!subject || !body.trim()) return toast('الموضوع والنص مطلوبان', true);

  state.pendingSend = { taskId: state.detailId, to, subject, body };
  saveDraft(false).catch(() => {});

  if (!state.user.emailConsent) {
    $('#consent-check').checked = false;
    $('#consent-accept').disabled = true;
    openSheetKeepDetail('sheet-consent');
    return;
  }
  showConfirm();
}

// Keeps detailId so we can return to the task after the dialog.
function openSheetKeepDetail(id) {
  const keep = state.detailId;
  openSheet(id);
  state.detailId = keep;
}

$('#consent-check').addEventListener('change', (e) => ($('#consent-accept').disabled = !e.target.checked));
$('#consent-accept').addEventListener('click', async () => {
  const { user } = await api('/api/me', { method: 'PATCH', body: { emailConsent: true } });
  state.user = user;
  toast('تم منح الإذن');
  if (state.pendingSend) showConfirm();
  else closeSheets();
});

function showConfirm() {
  const p = state.pendingSend;
  const live = state.config.integrations.email;
  $('#confirm-preview').innerHTML = `
    <dl>
      <dt>إلى</dt><dd dir="ltr" style="text-align:right">${esc(p.to)}</dd>
      <dt>من</dt><dd>${esc(state.user.name)} عبر مُدير (الردود تصل إلى ${esc(state.user.email)})</dd>
      <dt>الموضوع</dt><dd>${esc(p.subject)}</dd>
    </dl>
    <pre>${esc(p.body)}</pre>
    ${live ? '' : '<p class="notice" style="margin-top:8px">الوضع التجريبي: لن يُرسل البريد فعليًا حتى تُضاف إعدادات SMTP على الخادم.</p>'}`;
  openSheetKeepDetail('sheet-confirm');
}

$('#confirm-send').addEventListener('click', async () => {
  const btn = $('#confirm-send');
  busy(btn, true, 'جارٍ الإرسال…');
  try {
    const { email, user } = await api('/api/email/send', { method: 'POST', body: { ...state.pendingSend, confirm: true } });
    state.user = user;
    const t = state.tasks.find((x) => x.id === state.pendingSend.taskId);
    if (t) t.lastEmailAt = email.sentAt;
    state.pendingSend = null;
    closeSheets();
    render();
    toast(email.status === 'demo' ? 'تم تسجيل البريد (وضع تجريبي)' : 'تم إرسال البريد بنجاح ✉');
  } catch (err) {
    toast(err.message, true);
  } finally {
    busy(btn, false);
  }
});

// ---------- Calendar ----------
const WEEK = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
$('#cal-week').innerHTML = WEEK.map((d) => `<div>${d.slice(0, 3)}</div>`).join('');
$('#cal-prev').addEventListener('click', () => shiftMonth(-1));
$('#cal-next').addEventListener('click', () => shiftMonth(1));
function shiftMonth(n) {
  const m = state.calMonth;
  state.calMonth = new Date(m.getFullYear(), m.getMonth() + n, 1);
  renderCalendar();
}

function renderCalendar() {
  const m = state.calMonth;
  $('#cal-title').textContent = new Intl.DateTimeFormat(LOCALE, { month: 'long', year: 'numeric' }).format(m);
  const offset = (m.getDay() + 1) % 7; // week starts Saturday
  const start = new Date(m.getFullYear(), m.getMonth(), 1 - offset);
  const counts = {};
  state.tasks.forEach((t) => { if (t.date && !t.done) counts[t.date] = (counts[t.date] || 0) + 1; });
  const t0 = today();
  const daysInMonth = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
  const cells = Math.ceil((offset + daysInMonth) / 7) * 7;
  let html = '';
  for (let i = 0; i < cells; i++) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    const key = ymd(d);
    const cls = ['cal-cell', d.getMonth() !== m.getMonth() && 'out', key === t0 && 'today', key === state.calDay && 'sel'].filter(Boolean).join(' ');
    const dots = '<i></i>'.repeat(Math.min(counts[key] || 0, 3));
    html += `<button class="${cls}" data-day="${key}" aria-label="${esc(fmtDate(key, { day: 'numeric', month: 'long' }))}"><span>${d.getDate()}</span><span class="dots">${dots}</span></button>`;
  }
  $('#cal-grid').innerHTML = html;
  $$('#cal-grid [data-day]').forEach((b) => b.addEventListener('click', () => { state.calDay = b.dataset.day; renderCalendar(); }));

  $('#cal-day-title').textContent = fmtDate(state.calDay, { weekday: 'long', day: 'numeric', month: 'long' });
  const dayTasks = state.tasks.filter((t) => t.date === state.calDay);
  $('#cal-day-list').innerHTML = dayTasks.length ? dayTasks.map((t) => taskItem(t)).join('') : emptyState('لا مهام في هذا اليوم');
}

// ---------- Emails ----------
async function renderEmails() {
  const list = $('#email-list');
  try {
    state.emails = (await api('/api/email/log')).emails;
  } catch (err) {
    list.innerHTML = emptyState(esc(err.message));
    return;
  }
  list.innerHTML = state.emails.length
    ? state.emails
        .map(
          (e) => `<li class="email-item"><details>
          <summary>
            <div class="row between"><strong>${esc(e.subject)}</strong>${e.status === 'demo' ? '<span class="status off">تجريبي</span>' : '<span class="status on">أُرسل</span>'}</div>
            <p class="muted small"><span dir="ltr">${esc(e.to)}</span> · ${esc(new Intl.DateTimeFormat(LOCALE, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(e.sentAt)))}</p>
          </summary>
          <pre>${esc(e.body)}</pre>
        </details></li>`,
        )
        .join('')
    : emptyState('لم تُرسل أي رسالة بعد. افتح مهمة واستخدم مساعد الصياغة.');
}

// ---------- Account ----------
function meter(label, used, limit) {
  const pct = Math.min(100, Math.round((used / limit) * 100));
  return `<div class="meter"><div class="row between small"><span>${label}</span><span class="muted">${used} / ${limit}</span></div>
    <div class="meter-bar"><i class="${pct >= 100 ? 'full' : ''}" style="width:${pct}%"></i></div></div>`;
}

function renderAccount() {
  const u = state.user;
  const c = state.config;
  $('#acc-name').textContent = u.name;
  $('#acc-email').textContent = u.email;
  $('#consent-toggle').checked = u.emailConsent;
  $('#usage').innerHTML = meter('صياغات الذكاء الاصطناعي', u.usage.aiDrafts, u.limits.aiDrafts) + meter('رسائل البريد', u.usage.emails, u.limits.emails);

  const isPro = u.plan === 'pro';
  let action = '';
  if (isPro && u.hasBilling) action = '<button class="btn ghost block" id="billing-portal">إدارة الاشتراك والفواتير</button>';
  else if (!isPro && c.integrations.stripe) action = `<button class="btn accent block" id="billing-upgrade">ترقية إلى الاحترافي — ${esc(c.proPriceLabel)}</button>`;
  if (c.demoUpgrade) {
    action += `<button class="btn ghost block" id="billing-demo" style="margin-top:8px">${isPro ? 'العودة للمجاني' : 'تجربة الاحترافي'} (وضع الاختبار)</button>
      <p class="muted small center" style="margin-top:6px">الدفع غير مفعّل بعد — أضف مفاتيح Stripe لتفعيل الاشتراكات الحقيقية.</p>`;
  }

  $('#plan-card').innerHTML = `
    <div class="row between"><h3 class="section-title">باقتك</h3><span class="plan-badge ${isPro ? 'pro' : ''}">${isPro ? 'احترافي ✦' : 'مجاني'}</span></div>
    <div class="plans">
      <div class="plan"><h4>مجاني</h4><div class="price">0</div><ul>
        <li>مهام وتقويم بلا حدود</li><li>${c.plans.free.aiDrafts} صياغات ذكية شهريًا</li><li>${c.plans.free.emails} رسالة بريد شهريًا</li></ul></div>
      <div class="plan pro"><h4>احترافي ✦</h4><div class="price">${esc(c.proPriceLabel)}</div><ul>
        <li>${c.plans.pro.aiDrafts} صياغة شهريًا</li><li>${c.plans.pro.emails} رسالة بريد</li><li>ترتيب الأولويات بالذكاء الاصطناعي</li></ul></div>
    </div>
    ${action}`;

  $('#billing-upgrade')?.addEventListener('click', async (e) => {
    busy(e.currentTarget, true, 'جارٍ التحويل لصفحة الدفع…');
    try {
      location.href = (await api('/api/billing/checkout', { method: 'POST' })).url;
    } catch (err) {
      toast(err.message, true);
      busy(e.currentTarget, false);
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
    toast(state.user.plan === 'pro' ? 'تم تفعيل الاحترافي (اختبار)' : 'عدت إلى الباقة المجانية');
  });

  const names = { openai: 'OpenAI — صياغة وترتيب', email: 'البريد (SMTP)', stripe: 'Stripe — الاشتراكات' };
  $('#integrations').innerHTML = Object.entries(c.integrations)
    .map(([k, on]) => `<li><span>${names[k]}</span><span class="status ${on ? 'on' : 'off'}">${on ? 'متصل' : 'تجريبي'}</span></li>`)
    .join('');
}

$('#consent-toggle').addEventListener('change', async (e) => {
  try {
    state.user = (await api('/api/me', { method: 'PATCH', body: { emailConsent: e.target.checked } })).user;
    toast(e.target.checked ? 'تم منح إذن الإرسال' : 'تم سحب إذن الإرسال');
  } catch (err) {
    e.target.checked = !e.target.checked;
    toast(err.message, true);
  }
});

boot().catch((err) => {
  console.error(err);
  $('#auth').hidden = false;
});
