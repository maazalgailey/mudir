'use strict';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

// ---------- Translations ----------
const I18N = {
  ar: {
    brand: 'مُدير',
    otherLang: 'English',
    heroTitle: 'قل ما تريد… ومُدير يُنجزه',
    heroText: 'تقويمك، فريقك، وبريدك في مكان واحد. اطلب بصوتك أو عبر Siri، وراجع كل رسالة قبل إرسالها.',
    heroDemoMe: '«ابي اجتماع ويّا سارة باچر الساعة ٣، وارسل للموظفين إن الدوام يبدأ ٩»',
    heroDemoMudir: 'جهّزت دعوة الاجتماع مع سارة (لا تعارض في الوقت) ورسالة الدوام إلى 12 موظفًا. هل أرسلهما؟',
    welcome: 'أهلًا بك',
    welcomeSub: 'سجّل الدخول للمتابعة',
    continueGoogle: 'المتابعة باستخدام Google',
    googleNote: 'يربط بريدك Gmail تلقائيًا لترسل منه بعد موافقتك.',
    orEmail: 'أو بالبريد الإلكتروني',
    login: 'تسجيل الدخول',
    register: 'حساب جديد',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    submitLogin: 'دخول',
    submitRegister: 'إنشاء الحساب',
    goodMorning: 'صباح الخير، {name}',
    goodEvening: 'مساء الخير، {name}',
    navCalendar: 'التقويم',
    navPeople: 'الأشخاص',
    navSettings: 'الإعدادات',
    askMudir: 'اسأل مُدير',
    askHint: '«ذكّرني بالاجتماع غدًا 10 صباحًا» أو «راسل فريقي…»',
    askPh: 'اكتب أو تحدّث…',
    speak: 'تحدّث',
    sendCommand: 'إرسال',
    close: 'إغلاق',
    prevMonth: 'الشهر السابق',
    nextMonth: 'الشهر التالي',
    today: 'اليوم',
    exportCal: 'تصدير التقويم',
    addTaskPh: 'أضف مهمة لهذا اليوم…',
    add: 'إضافة',
    emptyDay: 'لا شيء في هذا اليوم بعد',
    more: '+{n} أخرى',
    // Assistant
    thinking: 'لحظة…',
    listening: 'أستمع… خذ وقتك، سأنتظر حتى تنتهي',
    noSpeech: 'المتصفح لا يدعم الإدخال الصوتي هنا. اكتب طلبك بدلًا من ذلك.',
    stopSpeaking: 'إنهاء التحدث',
    transcribing: 'أكتب ما قلته…',
    noSpeechHeard: 'لم أسمع شيئًا، حاول مرة أخرى',
    transcribeFailed: 'تعذّر تحويل الصوت إلى نص',
    micDenied: 'اسمح لمُدير باستخدام الميكروفون من إعدادات المتصفح ثم حاول مرة أخرى',
    micMissing: 'لم يتم العثور على ميكروفون',
    speechLang: 'لغة التحدث',
    speechLangSet: 'لغة التحدث: {lang}',
    ex1: 'أرسل للموظفين إيميل إن الدوام باچر يبدأ الساعة ٩ الصبح',
    ex2: 'ابي اجتماع ويّا سارة يوم الأحد الساعة ١١ عن ميزانية الربع الجاي',
    ex3: 'ارسل لعمر واتساب إني بتأخر ربع ساعة',
    ex4: 'تذكّر إن توقيعي د. مازن الجيلي، مدير العمليات',
    ex5: 'ذكّرني أجدد البطاقة الخميس الجاي وراسل خالد عن موعد التسليم',
    ex6: 'وش عندي هالأسبوع؟ وفي أي يوم أنا فاضي العصر؟',
    exTitle: 'جرّب أن تقول:',
    phoneLabel: 'رقم الجوال (واتساب)',
    emailOptional: 'البريد الإلكتروني (اختياري)',
    waTitle: 'رسالة واتساب',
    smsTitle: 'رسالة نصية',
    messageText: 'نص الرسالة',
    openWhatsApp: 'افتح في واتساب',
    openSms: 'افتح الرسائل',
    opened: 'تم الفتح',
    waHint: 'يفتح واتساب والرسالة مكتوبة؛ اضغط إرسال هناك. لكل شخص زر خاص به.',
    noPhone: 'بدون رقم جوال: {names}',
    noEmail: 'بدون بريد إلكتروني: {names}',
    addPhoneHint: 'أضف أرقامهم في «الأشخاص»',
    to: 'إلى',
    subject: 'الموضوع',
    body: 'النص',
    notFound: 'لم أجد: {names}',
    addThem: 'أضفهم في «الأشخاص»',
    noRecipientsYet: 'لا يوجد مستلمون بعد. أضف أشخاصًا أو اكتب البريد مباشرة.',
    sendToN: 'إرسال إلى {n}',
    sendToOne: 'إرسال',
    connectToSend: 'اربط Gmail للإرسال',
    openInGmail: 'افتح في Gmail',
    cancel: 'إلغاء',
    cancelled: 'تم الإلغاء. لم يُرسل شيء.',
    sentToN: 'أُرسلت إلى {n} من بريدك',
    taskAdded: 'تمت الإضافة إلى التقويم',
    openTask: 'فتح',
    addRecipientPh: 'أضف بريدًا…',
    // Connections & meetings
    connect: 'تواصل مع مستخدم',
    connectHelp: 'أدخل بريد شخص لديه حساب في مُدير. بعد قبوله يمكنكما ترتيب الاجتماعات، وتظهر الدعوات في تقويمه مباشرة.',
    sendRequest: 'إرسال طلب التواصل',
    contactsTitle: 'جهات الاتصال للبريد',
    onMudir: 'متصلون في مُدير',
    requests: 'طلبات تواصل',
    waiting: 'بانتظار القبول',
    accept: 'قبول',
    decline: 'رفض',
    remove: 'إزالة',
    meetingBtn: 'اجتماع',
    newMeeting: 'اجتماع جديد',
    meetingTitle: 'عنوان الاجتماع',
    fTime: 'الوقت',
    duration: 'المدة (دقيقة)',
    minutes: '{n} دقيقة',
    attendees: 'المدعوون',
    location: 'المكان',
    locationPh: 'مثال: غرفة الاجتماعات 2 أو رابط Teams',
    notesLabel: 'ملاحظات',
    sendInvite: 'إرسال الدعوة',
    inviteSent: 'أُرسلت الدعوة، وستظهر في تقويمهم',
    conflictsTitle: 'تعارض في المواعيد:',
    conflictBusy: '{name} مشغول الساعة {time}',
    conflictYou: 'لديك «{title}» الساعة {time}',
    sendAnyway: 'يمكنك الإرسال رغم ذلك.',
    invitedYou: '{name} يدعوك',
    organizer: 'المنظّم',
    youOrganize: 'أنت',
    cancelMeeting: 'إلغاء الاجتماع',
    confirmCancelMeeting: 'إلغاء هذا الاجتماع لجميع المدعوين؟',
    meetingCancelled: 'تم إلغاء الاجتماع',
    rAccepted: 'قبِل',
    rDeclined: 'اعتذر',
    rPending: 'لم يرد بعد',
    youAccepted: 'قبلت الدعوة',
    youDeclined: 'اعتذرت عن الدعوة',
    notOnMudirInvite: 'ادعُه للانضمام إلى مُدير',
    inviteEmailSubject: 'انضم إليّ في مُدير',
    inviteEmailBody: 'مرحبًا،\n\nأستخدم مُدير لتنظيم الاجتماعات والبريد. انضم من هنا لنرتب مواعيدنا معًا:\n{link}\n\nمع التحية،\n{name}',
    connRequested: 'أُرسل طلب التواصل',
    connAccepted: 'أصبحتما متصلين',
    connRemoved: 'تمت الإزالة',
    confirmRemoveConn: 'إزالة هذا الاتصال؟',
    noConnections: 'لا أحد بعد. تواصل مع زملائك في مُدير لترتيب الاجتماعات معهم بجملة واحدة.',
    connectFirst: 'تواصل مع أشخاص في مُدير أولًا لتتمكن من دعوتهم.',
    withNames: 'مع {names}',
    newChat: 'محادثة جديدة',
    chatCleared: 'بدأت محادثة جديدة',
    rememberedNote: 'سأتذكّر: {text}',
    memoryTitle: 'ما يتذكّره مُدير',
    memoryHelp: 'قل لمُدير مثلًا: «تذكّر أن توقيعي د. مازن» أو «مديرتي هي سارة». يمكنك حذف أي شيء هنا.',
    memoryEmpty: 'لا شيء بعد.',
    forget: 'انسَ هذا',
    // People
    addPerson: 'إضافة شخص',
    editPerson: 'تعديل',
    importList: 'استيراد قائمة',
    importHelp: 'شخص في كل سطر: الاسم، البريد و/أو رقم الجوال',
    importBtn: 'استيراد',
    imported: 'تمت إضافة {n}',
    group: 'المجموعة',
    groupPh: 'مثال: الموظفون',
    noGroup: 'بدون مجموعة',
    emailGroup: 'راسلهم',
    peopleEmpty: 'احفظ فريقك هنا، ثم قل: «راسل الموظفين…»',
    personSaved: 'تم الحفظ',
    personDeleted: 'تم الحذف',
    confirmDeletePerson: 'حذف هذا الشخص؟',
    emailGroupCmd: 'أرسل إلى مجموعة {group}: ',
    // Task page
    untitled: 'بلا عنوان',
    fStatus: 'الحالة',
    fDate: 'التاريخ',
    fPriority: 'الأولوية',
    fContactName: 'المستلم',
    fContactEmail: 'بريد المستلم',
    notesPh: 'ملاحظات…',
    sTodo: 'للتنفيذ',
    sDoing: 'قيد التنفيذ',
    sDone: 'مكتملة',
    pHigh: 'عالية',
    pMedium: 'متوسطة',
    pLow: 'منخفضة',
    saving: 'جارٍ الحفظ…',
    saved: 'تم الحفظ',
    titleRequired: 'العنوان مطلوب',
    delete: 'حذف',
    confirmDelete: 'حذف هذه المهمة نهائيًا؟',
    tDeleted: 'تم حذف المهمة',
    tDone: 'أحسنت! اكتملت المهمة',
    addGoogleCal: 'تقويم Google',
    downloadIcs: 'ملف تقويم',
    assistant: 'اكتب رسالة لهذه المهمة',
    kindEmail: 'بريد',
    kindMessage: 'رسالة قصيرة',
    tone: 'الأسلوب',
    toneFormal: 'رسمي',
    toneFriendly: 'ودّي',
    toneBrief: 'مختصر',
    draftLang: 'اللغة',
    instructions: 'تعليمات إضافية',
    instructionsPh: 'مثال: اطلب تأكيد الموعد',
    writeDraft: 'اكتب المسودة',
    writing: 'جارٍ الكتابة…',
    sendGmail: 'إرسال من Gmail',
    openIn: 'افتح في…',
    mailApp: 'تطبيق البريد',
    copy: 'نسخ',
    copied: 'تم النسخ',
    copyFailed: 'تعذّر النسخ',
    whatsapp: 'واتساب',
    needRecipient: 'أدخل بريد المستلم أولًا',
    invalidEmail: 'بريد المستلم غير صالح',
    needSubjectBody: 'الموضوع والنص مطلوبان',
    confirmTitle: 'تأكيد الإرسال',
    from: 'من',
    editDraft: 'تعديل',
    sendNow: 'إرسال الآن',
    sending: 'جارٍ الإرسال…',
    emailSent: 'تم الإرسال من {email}',
    // Settings
    logout: 'تسجيل الخروج',
    language: 'اللغة',
    gmailTitle: 'بريدك',
    gmailConnectedAs: 'متصل',
    gmailNotConnected: 'اربط Gmail ليرسل مُدير الرسائل من بريدك بعد موافقتك.',
    connectGmail: 'ربط Gmail',
    disconnect: 'فصل',
    gmailOffNote: 'الإرسال المباشر غير مفعّل بعد. يمكنك فتح أي رسالة في Gmail وإرسالها من هناك.',
    gmailNote: 'إذن «الإرسال فقط» — لا نقرأ بريدك أبدًا.',
    gmailConnectedToast: 'تم ربط Gmail بنجاح',
    signedInToast: 'تم تسجيل الدخول وربط Gmail',
    gmailDeniedToast: 'لم يتم ربط Gmail',
    loginDeniedToast: 'تم إلغاء تسجيل الدخول عبر Google',
    gmailErrorToast: 'تعذّر الاتصال بـ Google، حاول مرة أخرى',
    gmailNoScopeToast: 'يجب السماح بإذن «إرسال البريد» لربط Gmail',
    disconnectedToast: 'تم فصل Gmail',
    siriTitle: 'Siri',
    siriIntro: 'تحدّث مع مُدير من iPhone بدون فتح التطبيق:',
    siriSay: '«يا Siri، مُدير» ← «أرسل لموظفيني دعوة لزيارة المتحف»',
    siriStep1: 'افتح تطبيق <b>الاختصارات</b> ← <b>+</b> اختصار جديد.',
    siriStep2: 'أضف إجراء <b>إملاء النص</b> (اختر العربية).',
    siriStep3: 'أضف <b>ترميز URL</b> ليأخذ النص المُملى.',
    siriStep4: 'أضف <b>فتح عناوين URL</b>، واكتب الرابط أدناه ثم أدرج «النص المُرمّز» في آخره.',
    siriStep5: 'سمِّ الاختصار <b>مُدير</b>. الآن قل «يا Siri، مُدير».',
    siriLink: 'الرابط',
    siriNote: 'يفتح مُدير برسالتك جاهزة ويسألك قبل الإرسال.',
    copyLink: 'نسخ الرابط',
    yourPlan: 'باقتك',
    planFree: 'مجاني',
    planPro: 'مُدير برو',
    perMonth: '/ شهريًا',
    current: 'الحالية',
    featCalendar: 'التقويم والتصدير',
    featAssistant: 'مساعد مُدير الصوتي',
    featGmail: 'الإرسال من بريدك',
    featHigher: 'حدود استخدام أعلى بكثير',
    featPriority: 'أولوية في الذكاء الاصطناعي',
    featEarly: 'مزايا جديدة أولًا',
    upgrade: 'الترقية إلى برو',
    manageBilling: 'إدارة الاشتراك',
    demoTry: 'تجربة برو (اختبار)',
    demoBack: 'العودة للمجاني (اختبار)',
    billingSuccess: 'تم الاشتراك! جارٍ التفعيل…',
    billingCancel: 'تم إلغاء الدفع',
    redirectCheckout: 'جارٍ التحويل…',
    sentHistory: 'الرسائل المُرسلة',
    noEmails: 'لم تُرسل أي رسالة بعد.',
  },
  en: {
    brand: 'Mudir',
    otherLang: 'العربية',
    heroTitle: 'Say it. Mudir gets it done.',
    heroText: 'Your calendar, your team and your email in one place. Ask by voice or Siri, and review every message before it goes out.',
    heroDemoMe: '“Set up a meeting with Sara tomorrow at 3, and tell the team work starts at 9”',
    heroDemoMudir: 'The invite to Sara (no clashes) and the email to your 12 employees are ready. Send both?',
    welcome: 'Welcome',
    welcomeSub: 'Sign in to continue',
    continueGoogle: 'Continue with Google',
    googleNote: 'Connects your Gmail automatically, so you can send from it once you approve.',
    orEmail: 'or with email',
    login: 'Sign in',
    register: 'Create account',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    submitLogin: 'Sign in',
    submitRegister: 'Create account',
    goodMorning: 'Good morning, {name}',
    goodEvening: 'Good evening, {name}',
    navCalendar: 'Calendar',
    navPeople: 'People',
    navSettings: 'Settings',
    askMudir: 'Ask Mudir',
    askHint: '“Remind me about the meeting tomorrow at 10” or “Email my team…”',
    askPh: 'Type or speak…',
    speak: 'Speak',
    sendCommand: 'Send',
    close: 'Close',
    prevMonth: 'Previous month',
    nextMonth: 'Next month',
    today: 'Today',
    exportCal: 'Export calendar',
    addTaskPh: 'Add something to this day…',
    add: 'Add',
    emptyDay: 'Nothing on this day yet',
    more: '+{n} more',
    thinking: 'One moment…',
    listening: 'Listening… take your time, I’ll wait until you finish',
    noSpeech: "Voice input isn't supported in this browser. Type your request instead.",
    stopSpeaking: 'Finish speaking',
    transcribing: 'Writing down what you said…',
    noSpeechHeard: "I didn't hear anything. Please try again.",
    transcribeFailed: "Couldn't turn your voice into text",
    micDenied: 'Allow microphone access for Mudir in your browser settings, then try again',
    micMissing: 'No microphone was found',
    speechLang: 'Speaking language',
    speechLangSet: 'Speaking language: {lang}',
    ex1: 'Email my employees that work starts at 9am tomorrow',
    ex2: 'Set up a meeting with Sara on Sunday at 11 about next quarter’s budget',
    ex3: "WhatsApp Omar that I'm running 15 minutes late",
    ex4: 'Remember my signature is Dr. Mazen Algailey, Head of Operations',
    ex5: 'Remind me to renew my ID next Thursday and email Khalid about the deadline',
    ex6: "What's on this week, and which afternoon am I free?",
    exTitle: 'Try saying:',
    phoneLabel: 'Mobile number (WhatsApp)',
    emailOptional: 'Email (optional)',
    waTitle: 'WhatsApp message',
    smsTitle: 'Text message',
    messageText: 'Message',
    openWhatsApp: 'Open in WhatsApp',
    openSms: 'Open Messages',
    opened: 'Opened',
    waHint: 'Opens WhatsApp with the message written; tap send there. Each person has their own button.',
    noPhone: 'No mobile number: {names}',
    noEmail: 'No email address: {names}',
    addPhoneHint: 'Add their numbers in People',
    to: 'To',
    subject: 'Subject',
    body: 'Message',
    notFound: "Couldn't find: {names}",
    addThem: 'Add them in People',
    noRecipientsYet: 'No recipients yet. Add people or type an address.',
    sendToN: 'Send to {n}',
    sendToOne: 'Send',
    connectToSend: 'Connect Gmail to send',
    openInGmail: 'Open in Gmail',
    cancel: 'Cancel',
    cancelled: 'Cancelled. Nothing was sent.',
    sentToN: 'Sent to {n} from your Gmail',
    taskAdded: 'Added to your calendar',
    openTask: 'Open',
    addRecipientPh: 'Add an email…',
    connect: 'Connect with someone',
    connectHelp: 'Enter the email of someone who has a Mudir account. Once they accept, you can set up meetings and the invitations appear right on their calendar.',
    sendRequest: 'Send connection request',
    contactsTitle: 'Email contacts',
    onMudir: 'Connected on Mudir',
    requests: 'Connection requests',
    waiting: 'Waiting to accept',
    accept: 'Accept',
    decline: 'Decline',
    remove: 'Remove',
    meetingBtn: 'Meeting',
    newMeeting: 'New meeting',
    meetingTitle: 'Meeting title',
    fTime: 'Time',
    duration: 'Duration (min)',
    minutes: '{n} min',
    attendees: 'Invite',
    location: 'Location',
    locationPh: 'e.g. Meeting room 2 or a Teams link',
    notesLabel: 'Notes',
    sendInvite: 'Send invitation',
    inviteSent: 'Invitation sent. It will appear on their calendar.',
    conflictsTitle: 'Schedule clash:',
    conflictBusy: '{name} is busy at {time}',
    conflictYou: 'You have “{title}” at {time}',
    sendAnyway: 'You can still send it.',
    invitedYou: '{name} invited you',
    organizer: 'Organizer',
    youOrganize: 'You',
    cancelMeeting: 'Cancel meeting',
    confirmCancelMeeting: 'Cancel this meeting for everyone invited?',
    meetingCancelled: 'Meeting cancelled',
    rAccepted: 'Accepted',
    rDeclined: 'Declined',
    rPending: 'No reply yet',
    youAccepted: 'You accepted',
    youDeclined: 'You declined',
    notOnMudirInvite: 'Invite them to join Mudir',
    inviteEmailSubject: 'Join me on Mudir',
    inviteEmailBody: 'Hi,\n\nI use Mudir to organise meetings and email. Join here so we can schedule things together:\n{link}\n\nBest regards,\n{name}',
    connRequested: 'Connection request sent',
    connAccepted: "You're now connected",
    connRemoved: 'Removed',
    confirmRemoveConn: 'Remove this connection?',
    noConnections: 'Nobody yet. Connect with colleagues on Mudir to set up meetings with them in one sentence.',
    connectFirst: 'Connect with people on Mudir first so you can invite them.',
    withNames: 'with {names}',
    newChat: 'New chat',
    chatCleared: 'Started a new chat',
    rememberedNote: "I'll remember: {text}",
    memoryTitle: 'What Mudir remembers',
    memoryHelp: 'Tell Mudir things like “Remember my signature is Dr. Mazen” or “My manager is Sara”. You can delete anything here.',
    memoryEmpty: 'Nothing yet.',
    forget: 'Forget this',
    addPerson: 'Add person',
    editPerson: 'Edit',
    importList: 'Import list',
    importHelp: 'One person per line: name, email and/or mobile number',
    importBtn: 'Import',
    imported: 'Added {n}',
    group: 'Group',
    groupPh: 'e.g. Employees',
    noGroup: 'No group',
    emailGroup: 'Email them',
    peopleEmpty: 'Save your team here, then say: “Email my employees…”',
    personSaved: 'Saved',
    personDeleted: 'Deleted',
    confirmDeletePerson: 'Delete this person?',
    emailGroupCmd: 'Email the {group} group: ',
    untitled: 'Untitled',
    fStatus: 'Status',
    fDate: 'Date',
    fPriority: 'Priority',
    fContactName: 'Recipient',
    fContactEmail: 'Recipient email',
    notesPh: 'Notes…',
    sTodo: 'To do',
    sDoing: 'In progress',
    sDone: 'Done',
    pHigh: 'High',
    pMedium: 'Medium',
    pLow: 'Low',
    saving: 'Saving…',
    saved: 'Saved',
    titleRequired: 'Title is required',
    delete: 'Delete',
    confirmDelete: 'Delete this task permanently?',
    tDeleted: 'Task deleted',
    tDone: 'Nice! Task completed',
    addGoogleCal: 'Google Calendar',
    downloadIcs: 'Calendar file',
    assistant: 'Write a message for this task',
    kindEmail: 'Email',
    kindMessage: 'Short message',
    tone: 'Tone',
    toneFormal: 'Formal',
    toneFriendly: 'Friendly',
    toneBrief: 'Brief',
    draftLang: 'Language',
    instructions: 'Extra instructions',
    instructionsPh: 'e.g. Ask them to confirm the time',
    writeDraft: 'Write draft',
    writing: 'Writing…',
    sendGmail: 'Send from Gmail',
    openIn: 'Open in…',
    mailApp: 'Mail app',
    copy: 'Copy',
    copied: 'Copied',
    copyFailed: "Couldn't copy",
    whatsapp: 'WhatsApp',
    needRecipient: "Add the recipient's email first",
    invalidEmail: "The recipient's email is not valid",
    needSubjectBody: 'Subject and message are required',
    confirmTitle: 'Confirm sending',
    from: 'From',
    editDraft: 'Edit',
    sendNow: 'Send now',
    sending: 'Sending…',
    emailSent: 'Sent from {email}',
    logout: 'Sign out',
    language: 'Language',
    gmailTitle: 'Your email',
    gmailConnectedAs: 'Connected',
    gmailNotConnected: 'Connect Gmail so Mudir can send from your address after you approve.',
    connectGmail: 'Connect Gmail',
    disconnect: 'Disconnect',
    gmailOffNote: "Direct sending isn't enabled yet. You can open any message in Gmail and send it from there.",
    gmailNote: '“Send only” permission — we never read your inbox.',
    gmailConnectedToast: 'Gmail connected',
    signedInToast: 'Signed in and Gmail connected',
    gmailDeniedToast: 'Gmail was not connected',
    loginDeniedToast: 'Google sign-in was cancelled',
    gmailErrorToast: "Couldn't reach Google. Please try again.",
    gmailNoScopeToast: 'Allow the “send email” permission to connect Gmail',
    disconnectedToast: 'Gmail disconnected',
    siriTitle: 'Siri',
    siriIntro: 'Talk to Mudir from your iPhone without opening the app:',
    siriSay: '“Hey Siri, Mudir” → “Email my employees to visit the museum”',
    siriStep1: 'Open the <b>Shortcuts</b> app → <b>+</b> new shortcut.',
    siriStep2: 'Add the <b>Dictate Text</b> action.',
    siriStep3: 'Add <b>URL Encode</b> so it takes the dictated text.',
    siriStep4: 'Add <b>Open URLs</b>, type the link below, then insert “URL Encoded Text” at its end.',
    siriStep5: 'Name the shortcut <b>Mudir</b>. Now say “Hey Siri, Mudir”.',
    siriLink: 'Link',
    siriNote: 'Mudir opens with your message ready and asks before sending.',
    copyLink: 'Copy link',
    yourPlan: 'Your plan',
    planFree: 'Free',
    planPro: 'Mudir Pro',
    perMonth: '/ month',
    current: 'Current',
    featCalendar: 'Calendar & export',
    featAssistant: 'Mudir voice assistant',
    featGmail: 'Send from your own email',
    featHigher: 'Much higher usage limits',
    featPriority: 'Priority AI',
    featEarly: 'New features first',
    upgrade: 'Upgrade to Pro',
    manageBilling: 'Manage subscription',
    demoTry: 'Try Pro (test mode)',
    demoBack: 'Back to Free (test mode)',
    billingSuccess: 'Subscribed! Activating…',
    billingCancel: 'Checkout cancelled',
    redirectCheckout: 'Redirecting…',
    sentHistory: 'Sent messages',
    noEmails: 'Nothing sent yet.',
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
const session = {
  get(k) {
    try { return sessionStorage.getItem(k); } catch { return null; }
  },
  set(k, v) {
    try { v == null ? sessionStorage.removeItem(k) : sessionStorage.setItem(k, v); } catch { /* storage unavailable */ }
  },
};

const state = {
  lang: store.get('mudir.lang') === 'en' ? 'en' : 'ar',
  user: null,
  config: null,
  tasks: [],
  contacts: [],
  connections: [],
  meetings: [],
  meetingsRange: '',
  notif: { requests: 0, invites: [] },
  historyLoaded: false,
  view: 'calendar',
  calMonth: null,
  calDay: null,
  detailId: null,
  pendingSend: null,
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
const initial = (name) => (String(name || '?').trim()[0] || '?').toUpperCase();

async function api(path, opts = {}) {
  const headers = { 'X-Lang': state.lang };
  if (opts.body) headers['Content-Type'] = 'application/json';
  const res = await fetch(path, { method: opts.method || 'GET', headers, body: opts.body ? JSON.stringify(opts.body) : undefined, credentials: 'same-origin' });
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
  toastTimer = setTimeout(() => el.classList.remove('show'), 3400);
}

function busy(btn, on, label) {
  if (on) {
    btn.dataset.label = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span> ${esc(label || '')}`;
  } else {
    btn.disabled = false;
    if (btn.dataset.label) btn.innerHTML = btn.dataset.label;
  }
}

function sortTasks() {
  state.tasks.sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999') || (a.time || '').localeCompare(b.time || '') || String(a.createdAt).localeCompare(String(b.createdAt)));
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
  $$('[data-i18n-title]').forEach((el) => (el.title = t(el.dataset.i18nTitle)));
  $$('[data-lang-toggle] span').forEach((el) => (el.textContent = t('otherLang')));
  $$('[data-set-lang]').forEach((b) => b.classList.toggle('active', b.dataset.setLang === state.lang));
  $('#auth-submit').textContent = authMode === 'login' ? t('submitLogin') : t('submitRegister');
  buildWeekHeader();
  renderExamples();
  updateSpeechLangBtn();
}

function setLang(lang) {
  state.lang = lang;
  store.set('mudir.lang', lang);
  applyLang();
  if (state.user) {
    render();
    if (state.detailId && !$('#sheet-detail').hidden) openDetail(state.detailId);
    if (!$('#sheet-day').hidden) openDay(state.calDay);
  }
}
document.addEventListener('click', (e) => {
  if (e.target.closest('[data-lang-toggle]')) setLang(state.lang === 'ar' ? 'en' : 'ar');
  const set = e.target.closest('[data-set-lang]');
  if (set) setLang(set.dataset.setLang);
});

// ---------- Sheets ----------
function openSheet(id) {
  $$('.sheet').forEach((s) => (s.hidden = s.id !== id));
  $('#backdrop').hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeSheets() {
  flushSave();
  stopListening();
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
    openAssistant();
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
    state.user = (await api(`/api/auth/${authMode}`, { method: 'POST', body })).user;
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
  state.contacts = [];
  state.connections = [];
  state.meetings = [];
  clearInterval(pollTimer);
  $('#as-thread').innerHTML = '';
  $('#app').hidden = true;
  showAuth();
});

function showAuth() {
  const google = state.config?.integrations.gmail;
  const pendingAsk = session.get('mudir.ask');
  $('#google-login').hidden = !google;
  $('#google-login').href = `/api/auth/google${pendingAsk ? `?ask=${encodeURIComponent(pendingAsk)}` : ''}`;
  $('#google-note').hidden = !google;
  $('#auth-divider').hidden = !google;
  $('#auth').hidden = false;
}

// ---------- Boot ----------
async function boot() {
  const params = new URLSearchParams(location.search);
  // Siri / shortcut links arrive as ?ask=…; keep the request across sign-in.
  if (params.get('ask')) session.set('mudir.ask', params.get('ask'));
  applyLang();
  state.config = await api('/api/config');
  try {
    state.user = (await api('/api/me')).user;
    await enterApp();
  } catch {
    showAuth();
    const toastKey = { loginDenied: 'loginDeniedToast', error: 'gmailErrorToast' }[params.get('gmail')];
    if (toastKey) toast(t(toastKey), true);
  }
}

async function enterApp() {
  $('#auth').hidden = true;
  $('#app').hidden = false;
  const now = new Date();
  state.calMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  state.calDay = today();
  const [{ tasks }, { contacts }, { connections }, notif] = await Promise.all([
    api('/api/tasks'),
    api('/api/contacts'),
    api('/api/connections'),
    api('/api/notifications'),
  ]);
  state.tasks = tasks;
  state.contacts = contacts;
  state.connections = connections;
  state.notif = notif;
  state.meetingsRange = '';
  state.historyLoaded = false;
  sortTasks();
  updateBadges();
  startPolling();

  const params = new URLSearchParams(location.search);
  const gmailToasts = { connected: 'gmailConnectedToast', signedIn: 'signedInToast', denied: 'gmailDeniedToast', error: 'gmailErrorToast', noscope: 'gmailNoScopeToast' };
  const g = params.get('gmail');
  if (gmailToasts[g]) toast(t(gmailToasts[g]), !['connected', 'signedIn'].includes(g));
  if (params.get('billing') === 'success') {
    toast(t('billingSuccess'));
    setTimeout(refreshUser, 2500);
  } else if (params.get('billing') === 'cancel') toast(t('billingCancel'));
  if (params.toString()) history.replaceState(null, '', location.pathname + location.hash);

  showView(location.hash.replace('#', '') || 'calendar');

  const ask = session.get('mudir.ask');
  if (ask) {
    session.set('mudir.ask', null);
    openAssistant(ask, { voice: true });
  }
}

// ---------- Notifications (connection requests, meeting invitations) ----------
let pollTimer = null;
function startPolling() {
  clearInterval(pollTimer);
  pollTimer = setInterval(refreshNotifications, 60000);
}
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && state.user) refreshNotifications();
});

async function refreshNotifications() {
  if (!state.user) return;
  try {
    const before = JSON.stringify(state.notif);
    state.notif = await api('/api/notifications');
    if (JSON.stringify(state.notif) === before) return;
    updateBadges();
    state.connections = (await api('/api/connections')).connections;
    state.meetingsRange = ''; // invitations changed: reload the calendar's meetings
    render();
  } catch { /* offline or signed out; try again later */ }
}

function updateBadges() {
  $$('[data-badge="people"]').forEach((b) => {
    b.textContent = state.notif.requests || '';
    b.hidden = !state.notif.requests;
  });
}

async function refreshUser() {
  state.user = (await api('/api/me')).user;
  render();
}

// ---------- Navigation ----------
const VIEWS = ['calendar', 'people', 'settings'];
function showView(v) {
  if (v === 'account') v = 'settings';
  if (!VIEWS.includes(v)) v = 'calendar';
  state.view = v;
  VIEWS.forEach((x) => ($(`#view-${x}`).hidden = x !== v));
  $$('[data-view]').forEach((el) => el.classList.toggle('active', el.dataset.view === v));
  if (location.hash !== '#' + v) history.replaceState(null, '', '#' + v);
  window.scrollTo(0, 0);
  render();
}
document.addEventListener('click', (e) => {
  const nav = e.target.closest('[data-view]');
  if (nav) {
    e.preventDefault();
    if (nav.closest('.sheet')) closeSheets();
    showView(nav.dataset.view);
  }
  if (e.target.closest('[data-ask]')) openAssistant(undefined, { listen: Boolean(e.target.closest('[data-voice]')) });
});

function render() {
  if (!state.user) return;
  if (state.view === 'calendar') renderCalendar();
  if (state.view === 'people') renderPeople();
  if (state.view === 'settings') renderSettings();
}

// ---------- Calendar ----------
const weekStartsSaturday = () => state.lang === 'ar';
function buildWeekHeader() {
  // 2024-01-06 is a Saturday, 2024-01-07 a Sunday.
  const start = weekStartsSaturday() ? 6 : 7;
  const fmt = new Intl.DateTimeFormat(locale(), { weekday: 'short' });
  $('#cal-week').innerHTML = Array.from({ length: 7 }, (_, i) => `<div>${esc(fmt.format(new Date(2024, 0, start + i)))}</div>`).join('');
}

$('#cal-prev').addEventListener('click', () => shiftMonth(-1));
$('#cal-next').addEventListener('click', () => shiftMonth(1));
$('#cal-today').addEventListener('click', () => {
  const n = new Date();
  state.calMonth = new Date(n.getFullYear(), n.getMonth(), 1);
  state.calDay = today();
  renderCalendar();
});
function shiftMonth(n) {
  const m = state.calMonth;
  state.calMonth = new Date(m.getFullYear(), m.getMonth() + n, 1);
  renderCalendar();
}

function renderCalendar() {
  const u = state.user;
  $('#hello').textContent = t(new Date().getHours() < 12 ? 'goodMorning' : 'goodEvening', { name: u.name.split(' ')[0] });
  const m = state.calMonth;
  $('#cal-title').textContent = new Intl.DateTimeFormat(locale(), { month: 'long', year: 'numeric' }).format(m);
  const offset = weekStartsSaturday() ? (m.getDay() + 1) % 7 : m.getDay();
  const start = new Date(m.getFullYear(), m.getMonth(), 1 - offset);
  const cells = Math.ceil((offset + new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate()) / 7) * 7;
  const range = `${ymd(start)}:${ymd(new Date(start.getFullYear(), start.getMonth(), start.getDate() + cells - 1))}`;
  if (state.meetingsRange !== range) loadMeetings(range);
  const byDay = {};
  const meetingsByDay = {};
  state.tasks.forEach((x) => x.date && (byDay[x.date] ||= []).push(x));
  state.meetings.filter((x) => x.myResponse !== 'declined').forEach((x) => (meetingsByDay[x.date] ||= []).push(x));
  const t0 = today();
  let html = '';
  for (let i = 0; i < cells; i++) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    const key = ymd(d);
    const items = byDay[key] || [];
    const meets = meetingsByDay[key] || [];
    const open = items.filter((x) => !x.done);
    const cls = ['cal-cell', d.getMonth() !== m.getMonth() && 'out', key === t0 && 'today', key === state.calDay && 'sel'].filter(Boolean).join(' ');
    const chips = [
      ...meets.map((x) => `<button class="chip-task meeting ${x.myResponse === 'pending' ? 'pending' : ''}" data-meeting="${x.id}">${x.time ? esc(x.time) + ' ' : ''}${esc(x.title)}</button>`),
      ...items.map((x) => `<button class="chip-task p-${x.priority} ${x.done ? 'done' : ''}" data-open="${x.id}">${x.time ? esc(x.time) + ' ' : ''}${esc(x.title)}</button>`),
    ];
    const total = chips.length;
    const more = total > 3 ? `<span class="more">${esc(t('more', { n: total - 3 }))}</span>` : '';
    const dots = '<i class="m"></i>'.repeat(Math.min(meets.length, 3)) + '<i></i>'.repeat(Math.min(open.length, Math.max(0, 3 - meets.length)));
    html += `<div class="${cls}" role="button" tabindex="0" data-day="${key}" aria-label="${esc(fmtDate(key, { weekday: 'long', day: 'numeric', month: 'long' }))}${total ? ` · ${total}` : ''}">
      <span class="num">${d.getDate()}</span>
      <span class="dots">${dots}</span>
      <div class="cell-tasks">${chips.slice(0, 3).join('')}${more}</div>
    </div>`;
  }
  $('#cal-grid').innerHTML = html;
  renderInvites();
}

async function loadMeetings(range) {
  state.meetingsRange = range;
  const [from, to] = range.split(':');
  try {
    const { meetings } = await api(`/api/meetings?from=${from}&to=${to}`);
    if (state.meetingsRange !== range) return; // the month changed meanwhile
    state.meetings = meetings;
    if (state.view === 'calendar') renderCalendar();
    if (!$('#sheet-day').hidden) openDay(state.calDay);
  } catch {
    state.meetingsRange = '';
  }
}

// Pending meeting invitations, answerable right from the top of the calendar.
function renderInvites() {
  const box = $('#invites');
  const invites = state.notif.invites || [];
  box.hidden = !invites.length;
  box.innerHTML = invites
    .map((m) => `<div class="invite">
      <svg class="ic lead"><use href="#i-meeting"/></svg>
      <button class="grow quiet-link" data-meeting="${m.id}" style="border:0;background:none;text-align:start;padding:0">
        <p class="strong">${esc(m.title)}</p>
        <p class="muted small">${esc(t('invitedYou', { name: m.organizer.name }))} · ${esc(fmtDate(m.date))}${m.time ? ' · ' + esc(fmtTime(m.time)) : ''}</p>
      </button>
      <div class="row gap">
        <button class="btn ghost" data-respond="declined" data-id="${m.id}">${esc(t('decline'))}</button>
        <button class="btn primary" data-respond="accepted" data-id="${m.id}">${esc(t('accept'))}</button>
      </div>
    </div>`)
    .join('');
}

$('#cal-grid').addEventListener('click', (e) => {
  if (e.target.closest('[data-open], [data-meeting]')) return; // a chip opens its task or meeting itself
  const cell = e.target.closest('[data-day]');
  if (cell) openDay(cell.dataset.day);
});
$('#cal-grid').addEventListener('keydown', (e) => {
  const cell = e.target.closest('[data-day]');
  if (cell && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    openDay(cell.dataset.day);
  }
});

// ---------- Day sheet ----------
function taskRow(task) {
  const meta = [];
  if (task.time) meta.push(`<span class="tag">${icon('calendar')}${esc(fmtTime(task.time))}</span>`);
  if (task.priority === 'high') meta.push(`<span class="tag red">${esc(t('pHigh'))}</span>`);
  if (task.contactName) meta.push(`<span class="tag">${icon('user')}${esc(task.contactName)}</span>`);
  if (task.lastEmailAt) meta.push(`<span class="tag green">${icon('send')}</span>`);
  return `<li class="task ${task.done ? 'done' : ''}">
    <button class="task-check" data-toggle="${task.id}" aria-label="${esc(task.title)}">${icon('check')}</button>
    <button class="task-main" data-open="${task.id}"><span class="task-title">${esc(task.title)}</span><span class="task-meta">${meta.join('')}</span></button>
  </li>`;
}

function openDay(day) {
  state.calDay = day;
  renderCalendar();
  $('#day-title').textContent = fmtDate(day, { weekday: 'long', day: 'numeric', month: 'long' });
  const items = state.tasks.filter((x) => x.date === day);
  const meets = state.meetings.filter((x) => x.date === day && x.myResponse !== 'declined');
  $('#day-meetings').innerHTML = meets.map(meetingRow).join('');
  $('#day-list').innerHTML = items.length || meets.length ? items.map(taskRow).join('') : `<li class="empty">${icon('calendar')}<span>${esc(t('emptyDay'))}</span></li>`;
  $('#day-add').reset();
  openSheet('sheet-day');
  if (matchMedia('(hover: hover)').matches) setTimeout(() => $('#day-add').title.focus(), 150);
}

$('#day-add').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = e.target;
  const title = f.title.value.trim();
  if (!title) return;
  try {
    const { task } = await api('/api/tasks', { method: 'POST', body: { title, date: state.calDay, time: f.time.value } });
    state.tasks.push(task);
    sortTasks();
    openDay(state.calDay);
    $('#day-add').title.focus();
  } catch (err) {
    toast(err.message, true);
  }
});

async function updateTask(id, body) {
  const { task } = await api(`/api/tasks/${id}`, { method: 'PATCH', body });
  Object.assign(state.tasks.find((x) => x.id === task.id), task);
  sortTasks();
  render();
  return task;
}

document.addEventListener('click', async (e) => {
  const tog = e.target.closest('[data-toggle]');
  if (tog) {
    const task = state.tasks.find((x) => x.id === tog.dataset.toggle);
    const updated = await updateTask(task.id, { done: !task.done });
    if (!$('#sheet-day').hidden) openDay(state.calDay);
    if (updated.done) toast(t('tDone'));
    return;
  }
  const open = e.target.closest('[data-open]');
  if (open) openDetail(open.dataset.open);
});

// ---------- Meetings ----------
const responseLabel = (r) => t({ accepted: 'rAccepted', declined: 'rDeclined', pending: 'rPending' }[r] || 'rPending');
const findMeeting = (mid) => state.meetings.find((x) => x.id === mid) || (state.notif.invites || []).find((x) => x.id === mid);
// WhatsApp needs the number without "+"; iPhones separate the SMS body with "&", others with "?".
const waLink = (phone, text = '') => `https://wa.me/${String(phone).replace(/\D/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
const smsLink = (phone, text = '') => `sms:${phone}${text ? `${/iPhone|iPad|Macintosh/.test(navigator.userAgent) ? '&' : '?'}body=${encodeURIComponent(text)}` : ''}`;
const newKey = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

function meetingRow(m) {
  const who = [m.isOrganizer ? null : m.organizer.name, ...m.attendees.filter((a) => a.id !== state.user.id).map((a) => a.name)].filter(Boolean);
  return `<li><button class="meeting-row" data-meeting="${m.id}">
    <svg class="ic lead"><use href="#i-meeting"/></svg>
    <span class="grow"><span class="task-title">${esc(m.title)}</span>
      <span class="task-meta">${m.time ? `<span class="tag purple">${icon('clock')}${esc(fmtTime(m.time))}</span>` : ''}<span class="tag">${icon('users')}${esc(who.join('، '))}</span>
      ${m.myResponse === 'pending' ? `<span class="status-pill pending">${esc(t('rPending'))}</span>` : ''}</span></span>
  </button></li>`;
}

function conflictsHtml(conflicts) {
  if (!conflicts?.length) return '';
  return `<div class="callout red">${icon('alert')}<div class="grow"><strong>${esc(t('conflictsTitle'))}</strong>
    <ul>${conflicts.map((c) => `<li>${esc(c.title ? t('conflictYou', { title: c.title, time: fmtTime(c.time) }) : t('conflictBusy', { name: c.name, time: fmtTime(c.time) }))}</li>`).join('')}</ul>
    <span class="muted small">${esc(t('sendAnyway'))}</span></div></div>`;
}

function openMeeting(mid) {
  const m = findMeeting(mid);
  if (!m) return;
  const end = (() => {
    if (!m.time) return '';
    const [h, mm] = m.time.split(':').map(Number);
    const total = h * 60 + mm + m.durationMin;
    return `${String(Math.floor(total / 60) % 24).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
  })();
  let actions = '';
  if (m.isOrganizer) {
    actions = `<button class="btn ghost lg danger-text" data-cancel-meeting="${m.id}">${icon('x')}${esc(t('cancelMeeting'))}</button>`;
  } else {
    actions = `<div class="row gap">
      <button class="btn ${m.myResponse === 'declined' ? 'primary' : 'ghost'} grow lg" data-respond="declined" data-id="${m.id}">${esc(t('decline'))}</button>
      <button class="btn ${m.myResponse === 'accepted' ? 'primary' : 'ghost'} grow lg" data-respond="accepted" data-id="${m.id}">${icon('check')}${esc(t('accept'))}</button>
    </div>`;
  }
  $('#meeting-body').innerHTML = `
    <div class="stack" style="gap:16px">
      <div class="sheet-head">
        <h3 class="row gap"><svg class="ic" style="color:var(--purple-t)"><use href="#i-meeting"/></svg><span dir="auto">${esc(m.title)}</span></h3>
        <button class="icon-btn lg" type="button" data-close aria-label="${esc(t('close'))}">${icon('x')}</button>
      </div>
      <dl class="meeting-facts">
        <dt>${icon('calendar')}${esc(t('fDate'))}</dt><dd>${esc(fmtDate(m.date, { weekday: 'long', day: 'numeric', month: 'long' }))}</dd>
        ${m.time ? `<dt>${icon('clock')}${esc(t('fTime'))}</dt><dd dir="ltr">${esc(fmtTime(m.time))} – ${esc(fmtTime(end))}</dd>` : ''}
        ${m.location ? `<dt>${icon('pin')}${esc(t('location'))}</dt><dd dir="auto">${esc(m.location)}</dd>` : ''}
        <dt>${icon('user')}${esc(t('organizer'))}</dt><dd>${esc(m.isOrganizer ? t('youOrganize') : m.organizer.name)}</dd>
        <dt>${icon('users')}${esc(t('attendees'))}</dt>
        <dd>${m.attendees.map((a) => `<span class="row gap" style="gap:4px">${esc(a.id === state.user.id ? t('youOrganize') : a.name)} <span class="status-pill ${a.response}">${esc(responseLabel(a.response))}</span></span>`).join('')}</dd>
      </dl>
      ${m.notes ? `<p class="notes" dir="auto">${esc(m.notes)}</p>` : ''}
      ${actions}
    </div>`;
  openSheet('sheet-meeting');
}

document.addEventListener('click', async (e) => {
  const open = e.target.closest('[data-meeting]');
  if (open) return openMeeting(open.dataset.meeting);

  const respond = e.target.closest('[data-respond]');
  if (respond) {
    const { id: mid } = respond.dataset;
    const response = respond.dataset.respond;
    respond.disabled = true;
    try {
      await api(`/api/meetings/${mid}/respond`, { method: 'POST', body: { response } });
      toast(t(response === 'accepted' ? 'youAccepted' : 'youDeclined'));
      state.notif.invites = (state.notif.invites || []).filter((x) => x.id !== mid);
      const m = state.meetings.find((x) => x.id === mid);
      if (m) {
        m.myResponse = response;
        const me = m.attendees.find((a) => a.id === state.user.id);
        if (me) me.response = response;
      }
      state.meetingsRange = '';
      if (!$('#sheet-meeting').hidden) closeSheets();
      render();
    } catch (err) {
      toast(err.message, true);
      respond.disabled = false;
    }
    return;
  }

  const cancel = e.target.closest('[data-cancel-meeting]');
  if (cancel && confirm(t('confirmCancelMeeting'))) {
    try {
      await api(`/api/meetings/${cancel.dataset.cancelMeeting}/cancel`, { method: 'POST' });
      state.meetings = state.meetings.filter((x) => x.id !== cancel.dataset.cancelMeeting);
      closeSheets();
      render();
      toast(t('meetingCancelled'));
    } catch (err) {
      toast(err.message, true);
    }
  }
});

// New meeting form
let meetingFormKey = null;
let conflictTimer = null;
const acceptedConnections = () => state.connections.filter((c) => c.status === 'accepted').map((c) => c.user);

function openMeetingForm({ date, attendeeIds = [] } = {}) {
  const f = $('#meeting-form');
  f.reset();
  meetingFormKey = newKey();
  f.date.value = date || today();
  const people = acceptedConnections();
  $('#mf-attendees').innerHTML = people.length
    ? people.map((p) => `<label><input type="checkbox" name="attendee" value="${p.id}" ${attendeeIds.includes(p.id) ? 'checked' : ''} />${esc(p.name)}</label>`).join('')
    : `<div class="callout">${icon('alert')}<span>${esc(t('connectFirst'))} <a href="#people" data-view="people">${esc(t('connect'))}</a></span></div>`;
  $('#mf-conflicts').innerHTML = '';
  f.querySelector('[type=submit]').disabled = !people.length;
  openSheet('sheet-meeting-form');
  if (matchMedia('(hover: hover)').matches) setTimeout(() => f.title.focus(), 150);
}

function meetingFormValues() {
  const f = $('#meeting-form');
  return {
    title: f.title.value,
    date: f.date.value,
    time: f.time.value,
    durationMin: Number(f.durationMin.value),
    location: f.location.value,
    notes: f.notes.value,
    attendeeIds: $$('input[name=attendee]:checked', f).map((x) => x.value),
  };
}

$('#meeting-form').addEventListener('change', () => {
  clearTimeout(conflictTimer);
  conflictTimer = setTimeout(async () => {
    const v = meetingFormValues();
    if (!v.date || !v.time) return;
    try {
      $('#mf-conflicts').innerHTML = conflictsHtml((await api('/api/meetings/check', { method: 'POST', body: v })).conflicts);
    } catch { /* the check is advisory */ }
  }, 300);
});

$('#meeting-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('[type=submit]');
  const v = meetingFormValues();
  if (!v.attendeeIds.length) return toast(t('connectFirst'), true);
  busy(btn, true, t('sending'));
  try {
    await api('/api/meetings', { method: 'POST', body: { ...v, key: meetingFormKey } });
    state.meetingsRange = '';
    closeSheets();
    render();
    toast(t('inviteSent'));
  } catch (err) {
    toast(err.message, true);
  } finally {
    busy(btn, false);
  }
});

$('#day-meeting').addEventListener('click', () => openMeetingForm({ date: state.calDay }));

// ---------- Connections ----------
function renderConnections() {
  const incoming = state.connections.filter((c) => c.status === 'pending' && c.direction === 'in');
  const accepted = state.connections.filter((c) => c.status === 'accepted');
  const outgoing = state.connections.filter((c) => c.status === 'pending' && c.direction === 'out');
  const person = (c, actions) => `<li class="person">
    <span class="avatar">${esc(initial(c.user.name))}</span>
    <div class="grow"><p class="strong">${esc(c.user.name)}</p><p class="muted small" dir="ltr" style="text-align:start">${esc(c.user.email)}</p></div>
    <div class="actions row gap">${actions}</div>
  </li>`;
  let html = '';
  if (incoming.length) {
    html += `<div class="group"><div class="group-head"><span class="row gap"><span class="tag red">${esc(t('requests'))}</span><span class="muted small">${incoming.length}</span></span></div>
      <ul class="people connections">${incoming.map((c) => person(c, `<button class="btn ghost" data-conn-remove="${c.id}">${esc(t('decline'))}</button><button class="btn primary" data-conn-accept="${c.id}">${esc(t('accept'))}</button>`)).join('')}</ul></div>`;
  }
  html += `<div class="group"><div class="group-head"><span class="row gap"><span class="tag blue">${esc(t('onMudir'))}</span><span class="muted small">${accepted.length}</span></span></div>`;
  html += accepted.length || outgoing.length
    ? `<ul class="people connections">${accepted.map((c) => person(c, `<button class="btn ghost" data-conn-meet="${c.user.id}">${icon('meeting')}${esc(t('meetingBtn'))}</button><button class="icon-btn lg" data-conn-remove="${c.id}" data-confirm aria-label="${esc(t('remove'))}">${icon('x')}</button>`)).join('')}
        ${outgoing.map((c) => person(c, `<span class="status-pill pending">${esc(t('waiting'))}</span><button class="icon-btn lg" data-conn-remove="${c.id}" aria-label="${esc(t('remove'))}">${icon('x')}</button>`)).join('')}</ul>`
    : `<div class="empty-card">${icon('user-plus')}<p>${esc(t('noConnections'))}</p></div>`;
  html += '</div>';
  $('#connections').innerHTML = html;
}

$('#connections').addEventListener('click', async (e) => {
  const acc = e.target.closest('[data-conn-accept]');
  const rem = e.target.closest('[data-conn-remove]');
  const meet = e.target.closest('[data-conn-meet]');
  if (meet) return openMeetingForm({ attendeeIds: [meet.dataset.connMeet] });
  try {
    if (acc) {
      state.connections = (await api(`/api/connections/${acc.dataset.connAccept}/accept`, { method: 'POST' })).connections;
      toast(t('connAccepted'));
    } else if (rem) {
      if (rem.hasAttribute('data-confirm') && !confirm(t('confirmRemoveConn'))) return;
      state.connections = (await api(`/api/connections/${rem.dataset.connRemove}`, { method: 'DELETE' })).connections;
      toast(t('connRemoved'));
    } else return;
    state.notif.requests = state.connections.filter((c) => c.status === 'pending' && c.direction === 'in').length;
    updateBadges();
    renderConnections();
  } catch (err) {
    toast(err.message, true);
  }
});

$('#connect-open').addEventListener('click', () => {
  $('#connect-form').reset();
  $('#connect-result').innerHTML = '';
  openSheet('sheet-connect');
  if (matchMedia('(hover: hover)').matches) setTimeout(() => $('#connect-form').email.focus(), 150);
});

$('#connect-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.email.value.trim();
  const btn = e.target.querySelector('[type=submit]');
  busy(btn, true);
  try {
    state.connections = (await api('/api/connections', { method: 'POST', body: { email } })).connections;
    closeSheets();
    renderConnections();
    toast(t('connRequested'));
  } catch (err) {
    if (err.status === 404) {
      const link = location.origin;
      const body = t('inviteEmailBody', { link, name: state.user.name });
      const gmail = `https://mail.google.com/mail/?${new URLSearchParams({ view: 'cm', fs: '1', to: email, su: t('inviteEmailSubject'), body })}`;
      $('#connect-result').innerHTML = `<div class="callout yellow">${icon('alert')}<div class="grow"><span>${esc(err.message)}</span>
        <a class="btn ghost" href="${esc(gmail)}" target="_blank" rel="noopener" style="align-self:flex-start">${icon('mail')}${esc(t('notOnMudirInvite'))}</a></div></div>`;
    } else {
      toast(err.message, true);
    }
  } finally {
    busy(btn, false);
  }
});

// ---------- Ask Mudir ----------
// Voice input. Primary path: record audio and transcribe it on the server with OpenAI, which is
// accurate in Arabic and English and works the same on iPhone, Android and laptops.
// Fallback: the browser's own speech recognition, when recording or server transcription is unavailable.
const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
const canRecord = () => Boolean(navigator.mediaDevices?.getUserMedia && window.MediaRecorder);
const useServerSpeech = () => canRecord() && Boolean(state.config?.integrations.openai);
const voiceSupported = () => useServerSpeech() || Boolean(SpeechRec);
let voice = null; // the active listening session, if any
let lastWasVoice = false;
let speechOutputUnlocked = false;
let speechLang = ['ar', 'en'].includes(store.get('mudir.speechLang')) ? store.get('mudir.speechLang') : null;
const getSpeechLang = () => speechLang || state.lang;

function fmtClock(ms) {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

function updateSpeechLangBtn() {
  const btn = $('#as-speech-lang');
  btn.textContent = getSpeechLang() === 'ar' ? 'ع' : 'EN';
  btn.title = t('speechLang');
}
$('#as-speech-lang').addEventListener('click', () => {
  speechLang = getSpeechLang() === 'ar' ? 'en' : 'ar';
  store.set('mudir.speechLang', speechLang);
  updateSpeechLangBtn();
  toast(t('speechLangSet', { lang: speechLang === 'ar' ? 'العربية' : 'English' }));
});

function setLevel(v) {
  $('#as-mic').style.setProperty('--level', v);
  $('#as-status').style.setProperty('--level', v);
}

function setVoiceUI(mode, text = '') {
  const mic = $('#as-mic');
  mic.classList.toggle('recording', mode === 'recording');
  mic.classList.toggle('processing', mode === 'processing');
  mic.disabled = mode === 'processing';
  mic.setAttribute('aria-label', mode === 'recording' ? t('stopSpeaking') : t('speak'));
  const st = $('#as-status');
  st.hidden = mode === 'idle';
  st.classList.toggle('processing', mode === 'processing');
  $('#as-status-text').textContent = text;
  if (mode !== 'recording') $('#as-timer').textContent = '';
  if (mode === 'idle') setLevel(0);
}

// iOS only lets a page speak after a tap, so prime speech output on the tap that starts listening.
function unlockSpeechOutput() {
  if (speechOutputUnlocked || !('speechSynthesis' in window)) return;
  try {
    const u = new SpeechSynthesisUtterance(' ');
    u.volume = 0;
    speechSynthesis.speak(u);
    speechOutputUnlocked = true;
  } catch { /* speech output is optional */ }
}

function startVoice() {
  if (voice) return finishVoice(); // tapping again means "I'm done"
  // Never talk over the user: opening the mic silences Mudir straight away.
  try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch { /* nothing to stop */ }
  unlockSpeechOutput();
  if (useServerSpeech()) return startRecording();
  if (SpeechRec) return startBrowserRecognition();
  toast(t('noSpeech'), true);
}

async function startRecording() {
  const AC = window.AudioContext || window.webkitAudioContext;
  const ctx = AC ? new AC() : null; // created inside the tap, which iOS requires
  const s = { kind: 'record', ctx, chunks: [], heard: false, levelWorks: false, noise: [], lastLoud: 0 };
  voice = s;
  setVoiceUI('recording', t('listening'));
  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 } });
  } catch (err) {
    ctx?.close().catch(() => {});
    if (voice === s) voice = null;
    setVoiceUI('idle');
    toast(t(['NotAllowedError', 'SecurityError'].includes(err.name) ? 'micDenied' : 'micMissing'), true);
    return;
  }
  if (voice !== s) {
    // Closed or cancelled while the permission prompt was showing.
    stream.getTracks().forEach((tr) => tr.stop());
    ctx?.close().catch(() => {});
    return;
  }
  s.stream = stream;
  // Phones cut the mic when you switch apps or lock the screen: finish with what was heard.
  stream.getAudioTracks().forEach((tr) => (tr.onended = () => voice === s && finishVoice()));
  const mime = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/webm', 'audio/ogg;codecs=opus'].find((m) => MediaRecorder.isTypeSupported?.(m)) || '';
  try {
    s.recorder = new MediaRecorder(stream, mime ? { mimeType: mime, audioBitsPerSecond: 64000 } : undefined);
  } catch {
    s.recorder = new MediaRecorder(stream);
  }
  s.recorder.ondataavailable = (e) => e.data?.size && s.chunks.push(e.data);

  // Start recording first; the level meter is an extra and must never hold it up.
  s.recorder.start(250);
  s.startedAt = performance.now();
  if (ctx) {
    try {
      ctx.resume().catch(() => {});
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      ctx.createMediaStreamSource(stream).connect(analyser);
      s.analyser = analyser;
      s.buf = new Uint8Array(analyser.fftSize);
    } catch { /* level meter and auto-stop are extras; recording still works */ }
  }

  // A plain interval rather than requestAnimationFrame, which pauses whenever the page isn't painting
  // (dimmed phone screen, background tab) and would leave the mic stuck on.
  const tick = () => {
    if (voice !== s) return clearInterval(s.timer);
    const now = performance.now();
    const elapsed = now - s.startedAt;
    $('#as-timer').textContent = fmtClock(elapsed);
    if (s.analyser) {
      s.analyser.getByteTimeDomainData(s.buf);
      let sum = 0;
      for (const v of s.buf) sum += ((v - 128) / 128) ** 2;
      const rms = Math.sqrt(sum / s.buf.length);
      if (rms > 0.0008) s.levelWorks = true;
      if (elapsed < 300) s.noise.push(rms);
      const floor = s.noise.length ? s.noise.reduce((a, b) => a + b, 0) / s.noise.length : 0;
      const threshold = Math.max(0.015, floor * 2.5);
      setLevel(Math.min(1, rms * 9));
      if (rms > threshold) {
        if (s.lastLoud) s.speechMs = (s.speechMs || 0) + Math.min(now - s.lastLoud, 150);
        s.heard = true;
        s.lastLoud = now;
      }
      // Auto-stop after a pause, but only when the level meter is known to work on this device.
      // Patient auto-stop: only after real speech (0.6 s+) followed by a 3-second pause, so thinking
      // pauses mid-sentence never cut the user off. Tapping the mic still finishes immediately.
      if (s.levelWorks && (s.speechMs || 0) > 600 && now - s.lastLoud > 3000) return finishVoice();
      if (s.levelWorks && !s.heard && elapsed > 12000) return finishVoice();
    }
    if (elapsed > 60000) return finishVoice();
  };
  s.timer = setInterval(tick, 100);
  tick();
}

function startBrowserRecognition() {
  const rec = new SpeechRec();
  rec.lang = getSpeechLang() === 'ar' ? 'ar-SA' : 'en-US';
  rec.interimResults = true;
  rec.continuous = false;
  rec.maxAlternatives = 1;
  const s = { kind: 'browser', rec, text: '', startedAt: performance.now() };
  voice = s;
  setVoiceUI('recording', t('listening'));
  // Keep the latest words whether or not the browser marks them final (iPhones often never do).
  rec.onresult = (e) => {
    // Kept quietly: nothing is written on screen while the mic is open.
    s.text = [...e.results].map((r) => r[0].transcript).join(' ').trim();
  };
  rec.onerror = (e) => {
    if (['not-allowed', 'service-not-allowed'].includes(e.error)) toast(t('micDenied'), true);
  };
  rec.onend = () => {
    if (voice === s) voice = null;
    clearInterval(s.timer);
    setVoiceUI('idle');
    if (s.cancel) return;
    if (s.text) {
      lastWasVoice = true;
      runCommand(s.text);
    } else {
      toast(t('noSpeechHeard'));
    }
  };
  s.timer = setInterval(() => {
    if (voice !== s) return clearInterval(s.timer);
    $('#as-timer').textContent = fmtClock(performance.now() - s.startedAt);
  }, 250);
  try {
    rec.start();
  } catch {
    voice = null;
    setVoiceUI('idle');
    toast(t('noSpeech'), true);
  }
}

function releaseMic(s) {
  s.stream?.getTracks().forEach((tr) => tr.stop());
  s.ctx?.close().catch(() => {});
}

function finishVoice({ cancel = false } = {}) {
  const s = voice;
  if (!s) return;
  voice = null;
  clearInterval(s.timer);
  if (s.kind === 'browser') {
    s.cancel = cancel;
    try { s.rec.stop(); } catch { /* already stopped */ }
    return;
  }
  if (s.recorder && s.recorder.state !== 'inactive') {
    s.recorder.onstop = () => {
      releaseMic(s);
      if (cancel) setVoiceUI('idle');
      else uploadRecording(s);
    };
    s.recorder.stop();
  } else {
    releaseMic(s);
    setVoiceUI('idle');
  }
}

async function uploadRecording(s) {
  const duration = performance.now() - s.startedAt;
  if ((s.levelWorks && !s.heard) || duration < 500 || !s.chunks.length) {
    setVoiceUI('idle');
    toast(t('noSpeechHeard'));
    return;
  }
  const type = (s.recorder.mimeType || s.chunks[0].type || 'audio/mp4').split(';')[0];
  setVoiceUI('processing', t('transcribing'));
  try {
    const res = await fetch('/api/transcribe', {
      method: 'POST',
      headers: { 'Content-Type': type, 'X-Lang': state.lang, 'X-Speech-Lang': getSpeechLang() },
      body: new Blob(s.chunks, { type }),
      credentials: 'same-origin',
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.error || t('transcribeFailed'));
    setVoiceUI('idle');
    lastWasVoice = true;
    runCommand(json.text);
  } catch (err) {
    setVoiceUI('idle');
    toast(err.message, true);
  }
}

function stopListening() {
  finishVoice({ cancel: true });
}

// Each example shows a different ability: group email, meeting, WhatsApp, memory, multi-step, schedule question.
function renderExamples() {
  $('#as-examples').innerHTML =
    `<p class="muted small" style="width:100%">${esc(t('exTitle'))}</p>` +
    ['ex1', 'ex2', 'ex3', 'ex4', 'ex5', 'ex6'].map((k) => `<button type="button" data-example="${esc(t(k))}" dir="auto">${esc(t(k))}</button>`).join('');
}
$('#as-examples').addEventListener('click', (e) => {
  const b = e.target.closest('[data-example]');
  if (b) runCommand(b.dataset.example);
});

function openAssistant(text, { voice: fromVoice = false, listen = false } = {}) {
  openSheet('sheet-assistant');
  $('#as-mic').hidden = !voiceSupported();
  updateSpeechLangBtn();
  $('#as-examples').hidden = $('#as-thread').children.length > 0;
  if (!state.historyLoaded) loadHistory();
  if (text) {
    lastWasVoice = fromVoice;
    runCommand(text);
  } else if (listen && voiceSupported()) {
    startVoice(); // still inside the tap, so the browser allows the microphone
  } else if (matchMedia('(hover: hover)').matches) {
    setTimeout(() => $('#as-input').focus(), 150);
  }
}

function addMsg(kind, html) {
  const el = document.createElement('div');
  el.className = `as-msg ${kind}`;
  el.innerHTML = html;
  $('#as-thread').append(el);
  el.scrollIntoView({ behavior: 'smooth', block: 'end' });
  return el;
}

function speak(text) {
  // Stay quiet while the user is speaking.
  if (!lastWasVoice || voice || !('speechSynthesis' in window) || !text) return;
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = state.lang === 'ar' ? 'ar-SA' : 'en-US';
    const voice = speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith(state.lang));
    if (voice) u.voice = voice;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch { /* speech output is optional */ }
}

$('#as-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const text = $('#as-input').value.trim();
  if (!text) return;
  lastWasVoice = false;
  runCommand(text);
});

$('#as-mic').addEventListener('click', startVoice);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden' && voice) finishVoice();
});

// Earlier conversation, so follow-ups ("make it shorter") still make sense after closing the app.
async function loadHistory() {
  state.historyLoaded = true;
  try {
    const { messages } = await api('/api/assistant/history');
    if (!messages.length || $('#as-thread').children.length) return;
    const frag = document.createDocumentFragment();
    for (const m of messages.slice(-12)) {
      const el = document.createElement('div');
      el.className = `as-msg history ${m.role === 'user' ? 'me' : 'mudir'}`;
      el.innerHTML = m.role === 'user' ? esc(m.text) : `${icon('sparkle')}<span>${esc(m.text)}</span>`;
      el.dir = 'auto';
      frag.append(el);
    }
    $('#as-thread').prepend(frag);
    $('#as-examples').hidden = true;
    $('#as-thread').lastElementChild?.scrollIntoView({ block: 'end' });
  } catch { /* history is a convenience */ }
}

$('#as-new').addEventListener('click', async () => {
  try {
    await api('/api/assistant/history', { method: 'DELETE' });
  } catch { /* the thread still clears locally */ }
  $('#as-thread').innerHTML = '';
  $('#as-examples').hidden = false;
  toast(t('chatCleared'));
});

async function runCommand(text) {
  $('#as-input').value = '';
  $('#as-examples').hidden = true;
  addMsg('me', esc(text)).dir = 'auto';
  const pending = addMsg('mudir thinking', `${icon('sparkle')}<span>${esc(t('thinking'))}</span>`);
  try {
    const now = new Date();
    const res = await api('/api/assistant', {
      method: 'POST',
      body: {
        text,
        today: today(),
        time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Qatar',
      },
    });
    state.user = res.user;
    // If the user started speaking again meanwhile, hold the answer until the mic closes.
    while (voice) await new Promise((r) => setTimeout(r, 200));
    pending.classList.remove('thinking');
    pending.innerHTML = `${icon('sparkle')}<span>${esc(res.reply)}</span>`;
    pending.dir = 'auto';
    speak(res.reply);
    for (const note of res.remembered || []) {
      const el = document.createElement('div');
      el.className = 'as-memory';
      el.innerHTML = `${icon('brain')}<span>${esc(t('rememberedNote', { text: note }))}</span>`;
      $('#as-thread').append(el);
    }
    for (const action of res.actions || []) {
      if (action.type === 'email') renderEmailCard(action);
      if (action.type === 'meeting') renderMeetingCard(action);
      if (action.type === 'message') renderMessageCard(action);
      if (action.type === 'task' && action.task) renderTaskCard(action.task);
    }
    $('#as-thread').lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  } catch (err) {
    pending.classList.remove('thinking');
    pending.innerHTML = `${icon('alert')}<span>${esc(err.message)}</span>`;
  }
}

function renderTaskCard(task) {
  state.tasks.push(task);
  sortTasks();
  render();
  const card = document.createElement('div');
  card.className = 'as-card';
  card.innerHTML = `<div class="as-done">${icon('check')}${esc(t('taskAdded'))}</div>
    <div class="row gap"><span class="strong grow" dir="auto">${esc(task.title)}</span>${task.date ? `<span class="tag">${icon('calendar')}${esc(fmtDate(task.date))}${task.time ? ' · ' + esc(fmtTime(task.time)) : ''}</span>` : ''}</div>
    <button class="btn ghost lg" data-open="${task.id}">${esc(t('openTask'))}</button>`;
  $('#as-thread').append(card);
}

// A prepared WhatsApp/SMS message. Sending happens in the user's own WhatsApp: one button per person.
function renderMessageCard(m) {
  const card = document.createElement('div');
  card.className = 'as-card';
  let channel = m.channel;
  function draw() {
    const isWa = channel === 'whatsapp';
    card.innerHTML = `
      <div class="row gap"><svg class="ic" style="color:#25d366"><use href="#i-${isWa ? 'whatsapp' : 'phone'}"/></svg><strong>${esc(t(isWa ? 'waTitle' : 'smsTitle'))}</strong>
        <div class="seg mini" style="margin-inline-start:auto"><button type="button" class="seg-btn ${isWa ? 'active' : ''}" data-ch="whatsapp">WhatsApp</button><button type="button" class="seg-btn ${isWa ? '' : 'active'}" data-ch="sms">SMS</button></div></div>
      <label class="field"><span>${esc(t('messageText'))}</span><textarea data-body rows="4" dir="auto">${esc(m.body)}</textarea></label>
      ${m.recipients.length
        ? `<ul class="people">${m.recipients.map((r, i) => `<li class="person">
            <span class="avatar">${esc(initial(r.name))}</span>
            <div class="grow"><p class="strong">${esc(r.name)}</p><p class="muted small" dir="ltr" style="text-align:start">${esc(r.phone)}</p></div>
            <a class="btn ${r.opened ? 'ghost' : 'primary'}" data-open-msg="${i}" target="_blank" rel="noopener">${r.opened ? icon('check') + esc(t('opened')) : icon(isWa ? 'whatsapp' : 'phone') + esc(t(isWa ? 'openWhatsApp' : 'openSms'))}</a>
          </li>`).join('')}</ul>
          <p class="muted small">${esc(t('waHint'))}</p>`
        : `<p class="muted small">${esc(t('noRecipientsYet'))}</p>`}
      ${m.noPhone?.length ? `<div class="callout yellow">${icon('alert')}<span>${esc(t('noPhone', { names: m.noPhone.join('، ') }))} · <a href="#people" data-view="people">${esc(t('addPhoneHint'))}</a></span></div>` : ''}
      ${m.unmatched?.length ? `<div class="callout yellow">${icon('alert')}<span>${esc(t('notFound', { names: m.unmatched.join('، ') }))}</span></div>` : ''}
      <div class="as-actions"><button class="btn ghost lg" data-copy-msg>${icon('copy')}${esc(t('copy'))}</button><button class="btn quiet lg" data-cancel>${esc(t('cancel'))}</button></div>`;
  }
  draw();
  card.addEventListener('input', (e) => {
    if (e.target.matches('[data-body]')) m.body = e.target.value;
  });
  card.addEventListener('click', async (e) => {
    const ch = e.target.closest('[data-ch]');
    if (ch) {
      channel = ch.dataset.ch;
      return draw();
    }
    const open = e.target.closest('[data-open-msg]');
    if (open) {
      const r = m.recipients[Number(open.dataset.openMsg)];
      open.href = channel === 'whatsapp' ? waLink(r.phone, m.body) : smsLink(r.phone, m.body);
      if (channel === 'sms') {
        e.preventDefault();
        location.href = open.href;
      }
      r.opened = true;
      setTimeout(draw, 300);
      return;
    }
    if (e.target.closest('[data-copy-msg]')) {
      try {
        await navigator.clipboard.writeText(m.body);
        toast(t('copied'));
      } catch {
        toast(t('copyFailed'), true);
      }
      return;
    }
    if (e.target.closest('[data-cancel]')) card.innerHTML = `<p class="muted">${esc(t('cancelled'))}</p>`;
  });
  $('#as-thread').append(card);
}

// A prepared meeting: review time, people and clashes, then send the invitation.
function renderMeetingCard(meeting) {
  const attendees = [...meeting.attendees];
  const card = document.createElement('div');
  card.className = 'as-card';
  const people = acceptedConnections();

  function draw() {
    card.innerHTML = `
      <div class="row gap"><svg class="ic" style="color:var(--purple-t)"><use href="#i-meeting"/></svg><input class="prop-input wide strong" data-f="title" value="${esc(meeting.title)}" dir="auto" style="font-size:1.05rem" /></div>
      <div class="row gap wrap">
        <label class="field grow"><span>${esc(t('fDate'))}</span><input type="date" data-f="date" value="${esc(meeting.date)}" /></label>
        <label class="field grow"><span>${esc(t('fTime'))}</span><input type="time" data-f="time" value="${esc(meeting.time)}" /></label>
        <label class="field grow"><span>${esc(t('duration'))}</span><input type="number" min="5" max="600" step="5" data-f="durationMin" value="${meeting.durationMin}" /></label>
      </div>
      <div><div class="label">${esc(t('attendees'))}</div>
        <div class="rcpts">${attendees.map((a, i) => `<span class="rcpt">${esc(a.name)}<button type="button" data-rm="${i}" aria-label="${esc(t('remove'))}">${icon('x')}</button></span>`).join('')}
          ${people.filter((p) => !attendees.some((a) => a.id === p.id)).length
            ? `<select class="prop-input" data-add-att><option value="">+</option>${people.filter((p) => !attendees.some((a) => a.id === p.id)).map((p) => `<option value="${p.id}">${esc(p.name)}</option>`).join('')}</select>`
            : ''}
        </div>
        ${meeting.unmatched?.length ? `<div class="callout yellow" style="margin-top:8px">${icon('alert')}<span>${esc(t('notFound', { names: meeting.unmatched.join('، ') }))} · <a href="#people" data-view="people">${esc(t('connect'))}</a></span></div>` : ''}
      </div>
      ${meeting.location ? `<p class="muted small row gap">${icon('pin')}<span dir="auto">${esc(meeting.location)}</span></p>` : ''}
      <div data-conflicts>${conflictsHtml(meeting.conflicts)}</div>
      <div class="as-actions">
        <button class="btn primary xl" data-send-meeting ${attendees.length ? '' : 'disabled'}>${icon('send')}${esc(t('sendInvite'))}</button>
        <button class="btn quiet lg" data-cancel>${esc(t('cancel'))}</button>
      </div>`;
  }
  draw();

  let checkTimer = null;
  const recheck = () => {
    clearTimeout(checkTimer);
    checkTimer = setTimeout(async () => {
      try {
        const { conflicts } = await api('/api/meetings/check', { method: 'POST', body: { ...meeting, attendeeIds: attendees.map((a) => a.id) } });
        meeting.conflicts = conflicts;
        const box = card.querySelector('[data-conflicts]');
        if (box) box.innerHTML = conflictsHtml(conflicts);
      } catch { /* advisory */ }
    }, 300);
  };
  card.addEventListener('change', (e) => {
    const f = e.target.dataset.f;
    if (f) {
      meeting[f] = f === 'durationMin' ? Number(e.target.value) : e.target.value;
      if (f !== 'title') recheck();
    }
    if (e.target.matches('[data-add-att]') && e.target.value) {
      const p = people.find((x) => x.id === e.target.value);
      if (p) attendees.push({ id: p.id, name: p.name });
      draw();
      recheck();
    }
  });
  card.addEventListener('click', async (e) => {
    const rm = e.target.closest('[data-rm]');
    if (rm) {
      attendees.splice(Number(rm.dataset.rm), 1);
      draw();
      return recheck();
    }
    if (e.target.closest('[data-cancel]')) {
      card.innerHTML = `<p class="muted">${esc(t('cancelled'))}</p>`;
      return;
    }
    const send = e.target.closest('[data-send-meeting]');
    if (send) {
      busy(send, true, t('sending'));
      try {
        await api('/api/meetings', { method: 'POST', body: { ...meeting, attendeeIds: attendees.map((a) => a.id), key: meeting.key } });
        card.innerHTML = `<div class="as-done">${icon('check')}${esc(t('inviteSent'))}</div>`;
        speak(t('inviteSent'));
        state.meetingsRange = '';
        render();
      } catch (err) {
        toast(err.message, true);
        busy(send, false);
      }
    }
  });
  $('#as-thread').append(card);
}

// The prepared email: the user reviews recipients, subject and text before anything is sent.
function renderEmailCard(email) {
  const recipients = [...email.recipients];
  const card = document.createElement('div');
  card.className = 'as-card';
  const gmailOn = state.config.integrations.gmail;
  const connected = Boolean(state.user.gmail);

  function draw() {
    const n = recipients.length;
    card.innerHTML = `
      <div><div class="label">${esc(t('to'))}</div>
        <div class="rcpts">${recipients.map((r, i) => `<span class="rcpt" title="${esc(r.email)}">${esc(r.name)}<button type="button" data-rm="${i}" aria-label="${esc(t('delete'))}">${icon('x')}</button></span>`).join('')}
          <input class="prop-input" data-add-rcpt type="email" dir="ltr" placeholder="${esc(t('addRecipientPh'))}" style="flex:1;min-width:140px" />
        </div>
        ${n ? '' : `<p class="muted small">${esc(t('noRecipientsYet'))}</p>`}
        ${email.unmatched?.length ? `<div class="callout yellow" style="margin-top:8px">${icon('alert')}<span>${esc(t('notFound', { names: email.unmatched.join('، ') }))} · <a href="#people" data-view="people">${esc(t('addThem'))}</a></span></div>` : ''}
        ${email.noEmail?.length ? `<div class="callout yellow" style="margin-top:8px">${icon('alert')}<span>${esc(t('noEmail', { names: email.noEmail.join('، ') }))}</span></div>` : ''}
      </div>
      <label class="field"><span>${esc(t('subject'))}</span><input data-subj value="${esc(email.subject)}" dir="auto" /></label>
      <label class="field"><span>${esc(t('body'))}</span><textarea data-body rows="8" dir="auto">${esc(email.body)}</textarea></label>
      <div class="as-actions">
        ${connected
          ? `<button class="btn primary xl" data-send ${n ? '' : 'disabled'}>${icon('send')}${esc(n > 1 ? t('sendToN', { n }) : t('sendToOne'))}</button>`
          : gmailOn ? `<a class="btn primary xl" href="/api/google/connect">${icon('link')}${esc(t('connectToSend'))}</a>` : ''}
        <a class="btn ghost lg" data-gmail target="_blank" rel="noopener">${icon('external')}${esc(t('openInGmail'))}</a>
        <button class="btn quiet lg" data-cancel>${esc(t('cancel'))}</button>
      </div>`;
  }
  draw();

  card.addEventListener('input', (e) => {
    if (e.target.matches('[data-subj]')) email.subject = e.target.value;
    if (e.target.matches('[data-body]')) email.body = e.target.value;
  });
  card.addEventListener('keydown', (e) => {
    if (!e.target.matches('[data-add-rcpt]') || e.key !== 'Enter') return;
    e.preventDefault();
    const v = e.target.value.trim().toLowerCase();
    if (!e.target.checkValidity() || !v) return toast(t('invalidEmail'), true);
    const c = state.contacts.find((x) => x.email === v);
    if (!recipients.some((r) => r.email === v)) recipients.push({ name: c?.name || v, email: v });
    draw();
    card.querySelector('[data-add-rcpt]').focus();
  });
  card.addEventListener('click', async (e) => {
    const rm = e.target.closest('[data-rm]');
    if (rm) {
      recipients.splice(Number(rm.dataset.rm), 1);
      return draw();
    }
    const gm = e.target.closest('[data-gmail]');
    if (gm) {
      const list = recipients.map((r) => r.email).join(',');
      gm.href = `https://mail.google.com/mail/?${new URLSearchParams({ view: 'cm', fs: '1', [recipients.length > 1 ? 'bcc' : 'to']: list, su: email.subject, body: email.body })}`;
      return;
    }
    if (e.target.closest('[data-cancel]')) {
      card.innerHTML = `<p class="muted">${esc(t('cancelled'))}</p>`;
      return;
    }
    const send = e.target.closest('[data-send]');
    if (send) {
      busy(send, true, t('sending'));
      try {
        const res = await api('/api/email/send', {
          method: 'POST',
          body: { recipients: recipients.map((r) => r.email), subject: email.subject, body: email.body, confirm: true, key: email.key },
        });
        state.user = res.user;
        card.innerHTML = `<div class="as-done">${icon('check')}${esc(t('sentToN', { n: res.sent }))}</div>`;
        speak(t('sentToN', { n: res.sent }));
      } catch (err) {
        toast(err.message, true);
        busy(send, false);
        if (err.status === 401) refreshUser();
      }
    }
  });

  $('#as-thread').append(card);
  card.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

// ---------- People ----------
function groupsList() {
  return [...new Set(state.contacts.map((c) => c.group).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function renderPeople() {
  renderConnections();
  $('#group-options').innerHTML = groupsList().map((g) => `<option value="${esc(g)}"></option>`).join('');
  if (!state.contacts.length) {
    $('#people-list').innerHTML = `<div class="empty-card">${icon('users')}<p>${esc(t('peopleEmpty'))}</p>
      <button class="btn primary lg" id="people-add-empty">${icon('plus')}${esc(t('addPerson'))}</button></div>`;
    $('#people-add-empty').onclick = () => openPerson();
    return;
  }
  const groups = {};
  state.contacts.forEach((c) => (groups[c.group || ''] ||= []).push(c));
  const keys = Object.keys(groups).sort((a, b) => (a === '') - (b === '') || a.localeCompare(b));
  $('#people-list').innerHTML = keys
    .map((g) => `<div class="group">
      <div class="group-head">
        <span class="row gap"><span class="tag ${g ? 'purple' : ''}">${esc(g || t('noGroup'))}</span><span class="muted small">${groups[g].length}</span></span>
        ${g ? `<button class="btn ghost" data-email-group="${esc(g)}">${icon('mail')}${esc(t('emailGroup'))}</button>` : ''}
      </div>
      <ul class="people">${groups[g].map((c) => `<li class="person">
        <span class="avatar">${esc(initial(c.name))}</span>
        <div class="grow"><p class="strong">${esc(c.name)}</p><p class="muted small" dir="ltr" style="text-align:start">${esc([c.phone, c.email].filter(Boolean).join(' · '))}</p></div>
        ${c.phone ? `<a class="icon-btn lg wa" href="${esc(waLink(c.phone))}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon('whatsapp')}</a>` : ''}
        <button class="icon-btn lg" data-edit-person="${c.id}" aria-label="${esc(t('editPerson'))}">${icon('edit')}</button>
      </li>`).join('')}</ul>
    </div>`)
    .join('');
}

$('#people-list').addEventListener('click', (e) => {
  const edit = e.target.closest('[data-edit-person]');
  if (edit) openPerson(state.contacts.find((c) => c.id === edit.dataset.editPerson));
  const grp = e.target.closest('[data-email-group]');
  if (grp) {
    openAssistant();
    $('#as-input').value = t('emailGroupCmd', { group: grp.dataset.emailGroup });
    $('#as-input').focus();
  }
});

let editingPerson = null;
$('#people-add').addEventListener('click', () => openPerson());
function openPerson(person) {
  editingPerson = person || null;
  const f = $('#person-form');
  f.reset();
  $('#person-title').textContent = person ? t('editPerson') : t('addPerson');
  f.name.value = person?.name || '';
  f.email.value = person?.email || '';
  f.phone.value = person?.phone || '';
  f.group.value = person ? person.group : groupsList()[0] || '';
  $('#person-delete').hidden = !person;
  openSheet('sheet-person');
  if (matchMedia('(hover: hover)').matches) setTimeout(() => f.name.focus(), 150);
}

$('#person-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = e.target;
  const body = { name: f.name.value, email: f.email.value, phone: f.phone.value, group: f.group.value };
  try {
    if (editingPerson) {
      const { contact } = await api(`/api/contacts/${editingPerson.id}`, { method: 'PATCH', body });
      Object.assign(state.contacts.find((c) => c.id === contact.id), contact);
    } else {
      state.contacts.push((await api('/api/contacts', { method: 'POST', body })).contact);
    }
    closeSheets();
    renderPeople();
    toast(t('personSaved'));
  } catch (err) {
    toast(err.message, true);
  }
});

$('#person-delete').addEventListener('click', async () => {
  if (!editingPerson || !confirm(t('confirmDeletePerson'))) return;
  await api(`/api/contacts/${editingPerson.id}`, { method: 'DELETE' });
  state.contacts = state.contacts.filter((c) => c.id !== editingPerson.id);
  closeSheets();
  renderPeople();
  toast(t('personDeleted'));
});

$('#people-import').addEventListener('click', () => {
  $('#import-form').reset();
  $('#import-form').group.value = groupsList()[0] || '';
  openSheet('sheet-import');
});
$('#import-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = e.target;
  try {
    const { added } = await api('/api/contacts/import', { method: 'POST', body: { text: f.text.value, group: f.group.value } });
    state.contacts.push(...added);
    state.contacts.sort((a, b) => a.group.localeCompare(b.group) || a.name.localeCompare(b.name));
    closeSheets();
    renderPeople();
    toast(t('imported', { n: added.length }));
  } catch (err) {
    toast(err.message, true);
  }
});

// ---------- Task page (autosave) ----------
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
  } catch (err) {
    toast(err.message, true);
  }
}

function googleCalUrl(task) {
  const d = task.date.replace(/-/g, '');
  let dates;
  if (task.time) {
    const [h, m] = task.time.split(':').map(Number);
    dates = `${d}T${task.time.replace(':', '')}00/${d}T${String(Math.min(h + 1, 23)).padStart(2, '0')}${String(m).padStart(2, '0')}00`;
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
  return options.map(([v, label, dot]) => `<button type="button" class="seg-btn ${v === current ? 'active' : ''}" data-${name}="${v}">${dot ? `<i class="dot p-${v}"></i>` : ''}${esc(label)}</button>`).join('');
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
  const cfg = state.config.integrations;
  const status = task.status || (task.done ? 'done' : 'todo');

  $('#detail-body').innerHTML = `
    <div class="stack" style="gap:18px">
      <div class="detail-top">
        <span class="save-state" id="save-state"></span>
        <div class="row" style="gap:2px">
          <button class="icon-btn lg" id="d-del" aria-label="${esc(t('delete'))}">${icon('trash')}</button>
          <button class="icon-btn lg" data-close aria-label="${esc(t('close'))}">${icon('x')}</button>
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
        <dd><input class="prop-input wide" id="d-cname" value="${esc(task.contactName)}" placeholder="—" list="contact-names" /></dd>
        <dt>${icon('mail')}${esc(t('fContactEmail'))}</dt>
        <dd><input class="prop-input wide" id="d-cemail" type="email" dir="ltr" value="${esc(task.contactEmail)}" placeholder="name@example.com" /></dd>
      </dl>
      <datalist id="contact-names">${state.contacts.map((c) => `<option value="${esc(c.name)}"></option>`).join('')}</datalist>
      <textarea class="page-notes" id="d-notes" placeholder="${esc(t('notesPh'))}">${esc(task.notes)}</textarea>

      <div class="draft-box">
        <div class="block-title">${icon('sparkle')}${esc(t('assistant'))}</div>
        <div class="seg" id="d-kind">${segButtons('kind', [['email', t('kindEmail')], ['message', t('kindMessage')]], draftOpts.kind)}</div>
        <div class="row gap wrap">
          <label class="field grow"><span>${esc(t('tone'))}</span>
            <select id="d-tone"><option value="formal">${esc(t('toneFormal'))}</option><option value="friendly">${esc(t('toneFriendly'))}</option><option value="brief">${esc(t('toneBrief'))}</option></select>
          </label>
          <label class="field grow"><span>${esc(t('draftLang'))}</span>
            <select id="d-lang"><option value="ar">العربية</option><option value="en">English</option></select>
          </label>
        </div>
        <label class="field"><span>${esc(t('instructions'))}</span><input id="d-instr" placeholder="${esc(t('instructionsPh'))}" /></label>
        <button class="btn primary block lg" id="d-gen">${icon('sparkle')}<span>${esc(t('writeDraft'))}</span></button>
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
  renderSendRow(cfg);
  autoGrow($('#d-notes'));

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
  $('#d-cname').addEventListener('input', (e) => {
    const c = state.contacts.find((x) => x.name === e.target.value);
    const body = { contactName: e.target.value };
    if (c) {
      $('#d-cemail').value = c.email;
      body.contactEmail = c.email;
    }
    queueSave(body);
  });
  $('#d-cemail').addEventListener('input', (e) => {
    if (!e.target.value || e.target.checkValidity()) queueSave({ contactEmail: e.target.value });
  });
  $('#d-notes').addEventListener('input', (e) => {
    autoGrow(e.target);
    queueSave({ notes: e.target.value });
  });
  $$('#d-kind [data-kind]').forEach((b) =>
    b.addEventListener('click', () => {
      draftOpts.kind = b.dataset.kind;
      $$('#d-kind .seg-btn').forEach((x) => x.classList.toggle('active', x === b));
      renderSendRow(cfg);
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

function renderSendRow(cfg = state.config.integrations) {
  const row = $('#d-send-row');
  if (!row) return;
  const isEmail = draftOpts.kind === 'email';
  $('#d-subj-wrap').hidden = !isEmail;
  let primary = '';
  if (isEmail && state.user.gmail) primary = `<button class="btn primary lg" id="d-send">${icon('send')}${esc(t('sendGmail'))}</button>`;
  else if (isEmail && cfg.gmail) primary = `<a class="btn primary lg" href="/api/google/connect">${icon('link')}${esc(t('connectToSend'))}</a>`;
  row.innerHTML = `${primary}
    ${isEmail
      ? `<div class="menu-wrap"><button class="btn ghost lg" id="d-openin">${icon('external')}${esc(t('openIn'))}</button>
          <div class="menu" id="d-menu" hidden>
            <a href="#" data-compose="gmail" target="_blank" rel="noopener">${icon('mail')}Gmail</a>
            <a href="#" data-compose="outlook" target="_blank" rel="noopener">${icon('mail')}Outlook</a>
            <a href="#" data-compose="mailto">${icon('mail')}${esc(t('mailApp'))}</a>
          </div></div>`
      : `<button class="btn ghost lg" id="d-wa">${icon('chat')}${esc(t('whatsapp'))}</button>`}
    <button class="btn ghost lg" id="d-copy">${icon('copy')}${esc(t('copy'))}</button>`;

  $('#d-send')?.addEventListener('click', startSend);
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
  $('#d-wa')?.addEventListener('click', () => {
    // Straight to the person's chat when their number is saved in People.
    const name = $('#d-cname').value.trim();
    const person = state.contacts.find((c) => c.phone && name && c.name === name);
    const text = $('#d-text').value;
    window.open(person ? waLink(person.phone, text) : `https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });
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
      body: { taskId: state.detailId, kind: draftOpts.kind, tone: draftOpts.tone, lang: draftOpts.lang, contactName: $('#d-cname').value, instructions: $('#d-instr').value },
    });
    state.user = user;
    const task = state.tasks.find((x) => x.id === state.detailId);
    task.draft = { subject: draft.subject, body: draft.body, kind: draft.kind };
    $('#d-draft').hidden = false;
    $('#d-subj').value = draft.subject;
    $('#d-text').value = draft.body;
    syncDraftDir();
    renderSendRow();
    $('#d-text').scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch (err) {
    toast(err.message, true);
  } finally {
    busy(btn, false);
  }
}

function startSend() {
  const { to, subject, body } = draftValues();
  if (!to) return toast(t('needRecipient'), true);
  if (!$('#d-cemail').checkValidity()) return toast(t('invalidEmail'), true);
  if (!subject || !body.trim()) return toast(t('needSubjectBody'), true);
  state.pendingSend = { taskId: state.detailId, to, subject, body, key: newKey() };
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
    toast(t('emailSent', { email: user.gmail }));
  } catch (err) {
    toast(err.message, true);
    if (err.status === 401) refreshUser();
  } finally {
    busy(btn, false);
  }
});

// ---------- Memory ----------
async function renderMemory() {
  const card = $('#memory-card');
  let memories = [];
  try {
    ({ memories } = await api('/api/memories'));
  } catch { /* shown as empty */ }
  card.innerHTML = `<h3 class="card-title row gap">${icon('brain')}${esc(t('memoryTitle'))}</h3>
    <p class="muted small" style="margin-bottom:10px">${esc(t('memoryHelp'))}</p>
    ${memories.length
      ? `<ul class="memory-list">${memories.map((m) => `<li><span dir="auto">${esc(m.content)}</span><button class="icon-btn" data-forget="${m.id}" aria-label="${esc(t('forget'))}" title="${esc(t('forget'))}">${icon('x')}</button></li>`).join('')}</ul>`
      : `<p class="muted">${esc(t('memoryEmpty'))}</p>`}`;
}
$('#memory-card').addEventListener('click', async (e) => {
  const b = e.target.closest('[data-forget]');
  if (!b) return;
  await api(`/api/memories/${b.dataset.forget}`, { method: 'DELETE' });
  renderMemory();
});

// ---------- Settings ----------
async function renderSettings() {
  const u = state.user;
  const c = state.config;
  $('#acc-avatar').textContent = initial(u.name);
  $('#acc-name').textContent = u.name;
  $('#acc-email').textContent = u.email;
  $$('[data-set-lang]').forEach((b) => b.classList.toggle('active', b.dataset.setLang === state.lang));

  let gmail;
  if (!c.integrations.gmail) {
    gmail = `<div class="callout">${icon('alert')}<span>${esc(t('gmailOffNote'))}</span></div>`;
  } else if (u.gmail) {
    gmail = `<div class="gmail-row"><span class="gmail-logo">${icon('google', 'g')}</span>
      <div class="grow"><p class="strong">${esc(t('gmailConnectedAs'))}</p><p class="muted small" dir="ltr" style="text-align:start">${esc(u.gmail)}</p></div>
      <button class="btn ghost lg" id="gmail-disconnect">${esc(t('disconnect'))}</button></div>
      <p class="muted small" style="margin-top:10px">${esc(t('gmailNote'))}</p>`;
  } else {
    gmail = `<p>${esc(t('gmailNotConnected'))}</p>
      <a class="btn google xl block" href="/api/google/connect" style="margin-top:12px">${icon('google', 'g')}${esc(t('connectGmail'))}</a>
      <p class="muted small" style="margin-top:8px">${esc(t('gmailNote'))}</p>`;
  }
  $('#gmail-card').innerHTML = `<h3 class="card-title">${esc(t('gmailTitle'))}</h3>${gmail}`;
  $('#gmail-disconnect')?.addEventListener('click', async () => {
    state.user = (await api('/api/google/disconnect', { method: 'POST' })).user;
    renderSettings();
    toast(t('disconnectedToast'));
  });

  renderMemory();

  const siriLink = `${location.origin}/?ask=`;
  $('#siri-card').innerHTML = `
    <h3 class="card-title row gap"><span class="ask-orb sm">${icon('siri')}</span>${esc(t('siriTitle'))}</h3>
    <p class="muted" style="margin-bottom:10px">${esc(t('siriIntro'))}</p>
    <p class="siri-say">${esc(t('siriSay'))}</p>
    <ol class="steps" style="margin-top:14px">
      <li>${t('siriStep1')}</li><li>${t('siriStep2')}</li><li>${t('siriStep3')}</li><li>${t('siriStep4')}</li><li>${t('siriStep5')}</li>
    </ol>
    <div class="code-box" style="margin-top:12px"><code>${esc(siriLink)}</code><button class="btn ghost" id="copy-siri">${icon('copy')}${esc(t('copyLink'))}</button></div>
    <p class="muted small" style="margin-top:8px">${esc(t('siriNote'))}</p>`;
  $('#copy-siri').onclick = async () => {
    try {
      await navigator.clipboard.writeText(siriLink);
      toast(t('copied'));
    } catch {
      toast(t('copyFailed'), true);
    }
  };

  const isPro = u.plan === 'pro';
  let action = '';
  if (isPro && u.hasBilling) action = `<button class="btn ghost block lg" id="billing-portal">${esc(t('manageBilling'))}</button>`;
  else if (!isPro && c.integrations.stripe) action = `<button class="btn primary block lg" id="billing-upgrade">${icon('crown')}${esc(t('upgrade'))} — ${esc(c.proPrice)}${esc(t('perMonth'))}</button>`;
  if (c.demoUpgrade) action += `<button class="btn ghost block" id="billing-demo" style="margin-top:8px">${esc(isPro ? t('demoBack') : t('demoTry'))}</button>`;
  $('#plan-card').innerHTML = `
    <h3 class="card-title">${esc(t('yourPlan'))}</h3>
    <div class="plans">
      <div class="plan ${isPro ? '' : 'current'}"><h4>${esc(t('planFree'))}${isPro ? '' : ` <span class="tag blue">${esc(t('current'))}</span>`}</h4>
        <ul><li>${esc(t('featCalendar'))}</li><li>${esc(t('featAssistant'))}</li><li>${esc(t('featGmail'))}</li></ul></div>
      <div class="plan ${isPro ? 'current' : ''}"><h4>${icon('crown')}${esc(t('planPro'))}${isPro ? ` <span class="tag blue">${esc(t('current'))}</span>` : ''}</h4>
        <div class="price">${esc(c.proPrice)} <small>${esc(t('perMonth'))}</small></div>
        <ul><li>${esc(t('featHigher'))}</li><li>${esc(t('featPriority'))}</li><li>${esc(t('featEarly'))}</li></ul></div>
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
    renderSettings();
  });

  try {
    const { emails } = await api('/api/email/log');
    const fmt = new Intl.DateTimeFormat(locale(), { dateStyle: 'medium', timeStyle: 'short' });
    $('#email-list').innerHTML = emails.length
      ? emails.map((e) => `<li class="email-item"><details><summary><span class="strong">${esc(e.subject)}</span>
          <span class="muted small"><span dir="ltr">${esc(e.to)}</span> · ${esc(fmt.format(new Date(e.sentAt)))}</span></summary><pre dir="auto">${esc(e.body)}</pre></details></li>`).join('')
      : `<li class="empty">${icon('mail')}<span>${esc(t('noEmails'))}</span></li>`;
  } catch { /* history is optional */ }
}

boot().catch((err) => {
  console.error(err);
  showAuth();
});
