'use strict';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

// ---------- Translations ----------
const I18N = {
  ar: {
    brand: 'زاجل',
    otherLang: 'English',
    heroTitle: 'قل ما تريد… وزاجل يُنجزه',
    heroText: 'تقويمك، فريقك، وبريدك في مكان واحد. اطلب بصوتك أو عبر Siri، وراجع كل رسالة قبل إرسالها.',
    heroDemoMe: '«ابي اجتماع ويّا سارة باچر الساعة ٣، وارسل للموظفين إن الدوام يبدأ ٩»',
    heroDemoZajel: 'جهّزت دعوة الاجتماع مع سارة (لا تعارض في الوقت) ورسالة الدوام إلى 12 موظفًا. هل أرسلهما؟',
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
    askZajel: 'اسأل زاجل',
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
    micDenied: 'اسمح لزاجل باستخدام الميكروفون من إعدادات المتصفح ثم حاول مرة أخرى',
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
    connectHelp: 'أدخل بريد شخص لديه حساب في زاجل. بعد قبوله يمكنكما ترتيب الاجتماعات، وتظهر الدعوات في تقويمه مباشرة.',
    sendRequest: 'إرسال طلب التواصل',
    contactsTitle: 'جهات الاتصال للبريد',
    onZajel: 'متصلون في زاجل',
    requests: 'طلبات تواصل',
    waiting: 'بانتظار القبول',
    accept: 'قبول',
    decline: 'رفض',
    remove: 'إزالة',
    meetingBtn: 'اجتماع',
    newMeeting: 'اجتماع جديد',
    addSomeone: 'إضافة',
    addSomeonePh: 'أضف شخصًا ببريده الإلكتروني',
    addSomeoneHelp: 'إن كان في زاجل تصله الدعوة في تقويمه، وإلا تصله دعوة بالبريد.',
    requested: 'طلب مُرسل',
    addedToMeeting: 'أُضيف {name} إلى الاجتماع',
    addedRequested: 'أُرسل طلب تواصل إلى {name} وأُضيف إلى الاجتماع',
    addedGuest: '{email} ليس في زاجل بعد، وسيُدعى بالبريد',
    needPerson: 'أضف شخصًا واحدًا على الأقل',
    inviteSentGuests: 'أُرسلت الدعوة، ودعوات بالبريد إلى {n}',
    guestsToSend: 'أرسل الدعوة بالبريد إلى هؤلاء:',
    meetingSaved: 'تم حفظ الاجتماع',
    notFoundAdd: 'لم أجد: {names}. أضفهم ببريدهم أدناه.',
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
    notOnZajelInvite: 'ادعُه للانضمام إلى زاجل',
    inviteEmailSubject: 'انضم إليّ في زاجل',
    inviteEmailBody: 'مرحبًا،\n\nأستخدم زاجل لتنظيم الاجتماعات والبريد. انضم من هنا لنرتب مواعيدنا معًا:\n{link}\n\nمع التحية،\n{name}',
    connRequested: 'أُرسل طلب التواصل',
    connAccepted: 'أصبحتما متصلين',
    connRemoved: 'تمت الإزالة',
    confirmRemoveConn: 'إزالة هذا الاتصال؟',
    noConnections: 'لا أحد بعد. تواصل مع زملائك في زاجل لترتيب الاجتماعات معهم بجملة واحدة.',
    connectFirst: 'تواصل مع أشخاص في زاجل أولًا لتتمكن من دعوتهم.',
    withNames: 'مع {names}',
    newChat: 'محادثة جديدة',
    chatCleared: 'بدأت محادثة جديدة',
    rememberedNote: 'سأتذكّر: {text}',
    memoryTitle: 'ما يتذكّره زاجل',
    memoryHelp: 'قل لزاجل مثلًا: «تذكّر أن توقيعي د. مازن» أو «مديرتي هي سارة». يمكنك حذف أي شيء هنا.',
    memoryEmpty: 'لا شيء بعد.',
    forget: 'انسَ هذا',
    // Landing page
    lpHome: 'الرئيسية',
    lpFeatures: 'المزايا',
    lpPricing: 'الأسعار',
    lpContact: 'تواصل معنا',
    signIn: 'تسجيل الدخول',
    backHome: 'الرئيسية',
    lpTagline: 'مساعدك الصوتي الشخصي',
    lpSub: 'تكلّم بالعربي أو الإنجليزي، وزاجل يرتّب يومك: بريدك، رسائلك، اجتماعاتك وتذكيراتك، ويعطيك ملخصًا كل صباح.',
    lpStart: 'ابدأ مجانًا',
    lpSee: 'شاهد ما يمكنه فعله',
    lpFeaturesTitle: 'ماذا يفعل زاجل؟',
    lpFeaturesLead: 'جملة واحدة بدل خمسة تطبيقات. وكل رسالة تراها قبل أن تُرسل.',
    lpPricingTitle: 'الأسعار',
    lpContactTitle: 'تواصل معنا',
    lpContactLead: 'لديك سؤال، أو تريد زاجل لفريقك أو شركتك؟',
    lpContactSoon: 'سنضيف وسيلة التواصل قريبًا.',
    lpEmailUs: 'راسلنا',
    f1t: 'ملخص كل صباح',
    f1d: 'في الوقت الذي تختاره: اجتماعاتك، مهامك، والرسائل التي تحتاج ردًا، في إشعار واحد.',
    f1q: '«صباح الخير! لديك اجتماعان، و3 رسائل تنتظر ردك، أهمها من سارة.»',
    f2t: 'بريد بصوتك',
    f2d: 'يكتب بريدًا رسميًا لفريقك كاملًا، بتوقيعك، وترسله من Gmail بضغطة.',
    f2q: '«أرسل للموظفين إن الدوام باچر يبدأ ٩»',
    f3t: 'اجتماعات بين المستخدمين',
    f3d: 'تصل الدعوة إلى تقويم زميلك مباشرة، مع كشف التعارض دون كشف خصوصيته.',
    f3q: '«ابي اجتماع ويّا سارة الأحد الساعة ١١»',
    f4t: 'واتساب',
    f4d: 'يجهّز رسالة لكل شخص، ويفتح محادثته والنص مكتوب.',
    f4q: '«ارسل لعمر واتساب إني بتأخر ربع ساعة»',
    f5t: 'يتذكّرك',
    f5d: 'توقيعك، فريقك، تفضيلاتك. ويكمل المحادثة دون أن تعيد كلامك.',
    f5q: '«اجعلها أقصر» · «خلّه الساعة ٤»',
    f6t: 'يفهم لهجتك',
    f6d: 'عربي خليجي وإنجليزي، بتوقيت قطر وأسبوع العمل، ويعمل مع Siri.',
    f6q: '«يا Siri، زاجل»',
    lpFree: 'مجاني',
    lpPro: 'برو',
    lpFreeList: ['التقويم والتصدير', 'مساعد زاجل الصوتي', 'الإرسال من بريدك', 'ملخص يومي'],
    lpProList: ['حدود استخدام أعلى بكثير', 'أولوية في الذكاء الاصطناعي', 'مزايا جديدة أولًا'],
    // Daily briefing
    briefingTitle: 'ملخص اليوم',
    briefingReady: 'ملخص يومك جاهز',
    briefingReadyAsk: 'أخبرني متى تريد أن أقرأه لك.',
    readToMe: 'اقرأه لي',
    showMe: 'اعرضه',
    stopReading: 'إيقاف القراءة',
    rdSchedule: 'جدولك اليوم:',
    rdNeedReply: 'رسائل تنتظر ردك:',
    rdImportant: 'رسائل مهمة أيضًا:',
    rdSuggestions: 'اقتراحاتي لك:',
    rdFrom: 'من {from}، بخصوص {subject}',
    replyTitle: 'رد',
    replyToName: 'رد على {name}',
    composePh: 'اكتب ردك هنا…',
    openingWhatsApp: 'أفتح واتساب الآن…',
    noReadAloud: 'هذا المتصفح لا يستطيع القراءة بصوت عالٍ. يمكنك قراءة الملخص على الشاشة.',
    checkingInbox: 'أطّلع على بريدك…',
    importantEmails: 'أهم الرسائل من الأشخاص',
    needsReplyTag: 'ينتظر ردك',
    noImportantEmails: 'لا توجد رسائل مهمة من أشخاص في الأيام الأخيرة.',
    skippedMachine: 'تجاهلتُ {n} رسائل تلقائية (تنبيهات أمان، عروض، إشعارات).',
    wakeTitle: 'قل «هاي زاجل»',
    wakeHelp: 'استمع بدون لمس أثناء فتح زاجل على الشاشة، ثم قل طلبك، مثل: «هاي زاجل، اقرأ لي أهم الإيميلات». عند قفل الهاتف استخدم «يا Siri، زاجل».',
    wakeUnsupported: 'هذا المتصفح لا يدعم الاستماع المستمر. جرّب Chrome، أو استخدم «يا Siri، زاجل» على iPhone.',
    wakeSay: 'قل «هاي زاجل»',
    wakePaused: 'الاستماع متوقف — اضغط للتشغيل',
    wakeListening: 'أسمعك… تفضّل',
    wakeOnToast: 'تم. قل «هاي زاجل» في أي وقت أثناء فتح التطبيق.',
    wakeOff: 'أوقفت الاستماع بدون لمس.',
    wakeDenied: 'لا يمكن استخدام الميكروفون. اسمح به من إعدادات المتصفح.',
    details: 'التفاصيل',
    briefingNow: 'لخّص يومي الآن',
    briefingWorking: 'أجهّز ملخصك…',
    briefingEmpty: 'لم يُجهَّز ملخص اليوم بعد.',
    needReply: 'تحتاج ردًا',
    important: 'مهم',
    otherMail: '{n} رسائل أخرى يمكنها الانتظار',
    suggestions: 'اقتراحات',
    replyTo: 'رد',
    replyCmd: 'اكتب ردًا على {from} بخصوص «{subject}»',
    inboxNeedsRead: 'لإضافة بريدك إلى الملخص، أعد ربط Gmail وامنح إذن القراءة.',
    inboxNotConnected: 'اربط Gmail ليتضمن الملخص بريدك.',
    inboxReconnect: 'انتهت صلاحية ربط Gmail؛ أعد ربطه ليتضمن الملخص بريدك.',
    reconnectGmail: 'أعد ربط Gmail',
    briefingSettings: 'الملخص اليومي',
    briefingSettingsHelp: 'يراجع زاجل تقويمك وبريدك في الوقت الذي تختاره، ويرسل لك ملخصًا بما يحتاج انتباهك.',
    briefingOn: 'تشغيل الملخص اليومي',
    briefingTime: 'الوقت',
    briefingDays: 'الأيام',
    briefingInbox: 'تضمين بريدي (قراءة فقط)',
    saved2: 'تم الحفظ',
    notifTitle: 'إشعارات الهاتف',
    notifOn: 'تفعيل الإشعارات',
    notifEnabled: 'الإشعارات مفعّلة على هذا الجهاز',
    notifTest: 'إشعار تجريبي',
    notifDenied: 'الإشعارات محظورة لهذا الموقع. فعّلها من إعدادات المتصفح.',
    notifUnsupported: 'هذا المتصفح لا يدعم الإشعارات.',
    notifIos: 'على iPhone: اضغط زر المشاركة ⬆️ ثم «إضافة إلى الشاشة الرئيسية»، وافتح زاجل من أيقونته، ثم فعّل الإشعارات.',
    notifSent: 'أُرسل إشعار تجريبي',
    notifNone: 'لا توجد أجهزة مفعّلة للإشعارات بعد',
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
    gmailNotConnected: 'اربط Gmail ليرسل زاجل الرسائل من بريدك بعد موافقتك.',
    connectGmail: 'ربط Gmail',
    disconnect: 'فصل',
    gmailOffNote: 'الإرسال المباشر غير مفعّل بعد. يمكنك فتح أي رسالة في Gmail وإرسالها من هناك.',
    gmailNote: 'إرسال، وقراءة فقط لتلخيص بريدك لك في الملخص اليومي. لا يحذف زاجل أي رسالة ولا يغيّرها.',
    gmailConnectedToast: 'تم ربط Gmail بنجاح',
    signedInToast: 'تم تسجيل الدخول وربط Gmail',
    gmailDeniedToast: 'لم يتم ربط Gmail',
    loginDeniedToast: 'تم إلغاء تسجيل الدخول عبر Google',
    gmailErrorToast: 'تعذّر الاتصال بـ Google، حاول مرة أخرى',
    gmailNoScopeToast: 'يجب السماح بإذن «إرسال البريد» لربط Gmail',
    disconnectedToast: 'تم فصل Gmail',
    siriTitle: 'Siri',
    siriIntro: 'تحدّث مع زاجل من iPhone بدون فتح التطبيق:',
    siriSay: '«يا Siri، زاجل» ← «أرسل لموظفيني دعوة لزيارة المتحف»',
    siriStep1: 'افتح تطبيق <b>الاختصارات</b> ← <b>+</b> اختصار جديد.',
    siriStep2: 'أضف إجراء <b>إملاء النص</b> (اختر العربية).',
    siriStep3: 'أضف <b>ترميز URL</b> ليأخذ النص المُملى.',
    siriStep4: 'أضف <b>فتح عناوين URL</b>، واكتب الرابط أدناه ثم أدرج «النص المُرمّز» في آخره.',
    siriStep5: 'سمِّ الاختصار <b>زاجل</b>. الآن قل «يا Siri، زاجل».',
    siriLink: 'الرابط',
    siriNote: 'يفتح زاجل برسالتك جاهزة ويسألك قبل الإرسال.',
    copyLink: 'نسخ الرابط',
    yourPlan: 'باقتك',
    planFree: 'مجاني',
    planPro: 'زاجل برو',
    perMonth: '/ شهريًا',
    current: 'الحالية',
    featCalendar: 'التقويم والتصدير',
    featAssistant: 'مساعد زاجل الصوتي',
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
    brand: 'Zajel',
    otherLang: 'العربية',
    heroTitle: 'Say it. Zajel gets it done.',
    heroText: 'Your calendar, your team and your email in one place. Ask by voice or Siri, and review every message before it goes out.',
    heroDemoMe: '“Set up a meeting with Sara tomorrow at 3, and tell the team work starts at 9”',
    heroDemoZajel: 'The invite to Sara (no clashes) and the email to your 12 employees are ready. Send both?',
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
    askZajel: 'Ask Zajel',
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
    micDenied: 'Allow microphone access for Zajel in your browser settings, then try again',
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
    connectHelp: 'Enter the email of someone who has a Zajel account. Once they accept, you can set up meetings and the invitations appear right on their calendar.',
    sendRequest: 'Send connection request',
    contactsTitle: 'Email contacts',
    onZajel: 'Connected on Zajel',
    requests: 'Connection requests',
    waiting: 'Waiting to accept',
    accept: 'Accept',
    decline: 'Decline',
    remove: 'Remove',
    meetingBtn: 'Meeting',
    newMeeting: 'New meeting',
    addSomeone: 'Add',
    addSomeonePh: 'Add someone by email',
    addSomeoneHelp: "If they're on Zajel the invitation lands on their calendar; otherwise they get an email invitation.",
    requested: 'Requested',
    addedToMeeting: '{name} added to the meeting',
    addedRequested: 'Connection request sent to {name}, and added to the meeting',
    addedGuest: "{email} isn't on Zajel yet and will be invited by email",
    needPerson: 'Add at least one person',
    inviteSentGuests: 'Invitation sent, plus email invitations to {n}',
    guestsToSend: 'Send the email invitation to:',
    meetingSaved: 'Meeting saved',
    notFoundAdd: "Couldn't find: {names}. Add them by email below.",
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
    notOnZajelInvite: 'Invite them to join Zajel',
    inviteEmailSubject: 'Join me on Zajel',
    inviteEmailBody: 'Hi,\n\nI use Zajel to organise meetings and email. Join here so we can schedule things together:\n{link}\n\nBest regards,\n{name}',
    connRequested: 'Connection request sent',
    connAccepted: "You're now connected",
    connRemoved: 'Removed',
    confirmRemoveConn: 'Remove this connection?',
    noConnections: 'Nobody yet. Connect with colleagues on Zajel to set up meetings with them in one sentence.',
    connectFirst: 'Connect with people on Zajel first so you can invite them.',
    withNames: 'with {names}',
    newChat: 'New chat',
    chatCleared: 'Started a new chat',
    rememberedNote: "I'll remember: {text}",
    memoryTitle: 'What Zajel remembers',
    memoryHelp: 'Tell Zajel things like “Remember my signature is Dr. Mazen” or “My manager is Sara”. You can delete anything here.',
    memoryEmpty: 'Nothing yet.',
    forget: 'Forget this',
    lpHome: 'Home',
    lpFeatures: 'Features',
    lpPricing: 'Pricing',
    lpContact: 'Contact',
    signIn: 'Sign In',
    backHome: 'Home',
    lpTagline: 'Personal Voice Assistant',
    lpSub: 'Speak in Arabic or English and Zajel runs your day: your email, messages, meetings and reminders, with a briefing every morning.',
    lpStart: 'Start free',
    lpSee: 'See what it does',
    lpFeaturesTitle: 'What Zajel does',
    lpFeaturesLead: 'One sentence instead of five apps. And you see every message before it goes out.',
    lpPricingTitle: 'Pricing',
    lpContactTitle: 'Contact',
    lpContactLead: 'Questions, or want Zajel for your team or company?',
    lpContactSoon: 'Contact details are coming soon.',
    lpEmailUs: 'Email us',
    f1t: 'A briefing every morning',
    f1d: 'At the time you choose: your meetings, tasks and the emails that need a reply, in one notification.',
    f1q: '“Good morning! Two meetings today and 3 emails waiting for you, the most urgent from Sara.”',
    f2t: 'Email by voice',
    f2d: 'Writes a polished email to your whole team, signed your way, sent from your Gmail in one tap.',
    f2q: '“Tell the team work starts at 9 tomorrow”',
    f3t: 'Meetings between users',
    f3d: "Invitations land straight on your colleague's calendar, with clash checks that respect their privacy.",
    f3q: '“Set up a meeting with Sara on Sunday at 11”',
    f4t: 'WhatsApp',
    f4d: 'Prepares a message for each person and opens their chat with the text written.',
    f4q: "“WhatsApp Omar that I'm 15 minutes late”",
    f5t: 'Remembers you',
    f5d: "Your signature, your team, your preferences. And it follows the conversation, so you never repeat yourself.",
    f5q: '“Make it shorter” · “Change it to 4”',
    f6t: 'Speaks your language',
    f6d: 'Gulf Arabic and English, on Qatar time and work week, and it works with Siri.',
    f6q: '“Hey Siri, Zajel”',
    lpFree: 'Free',
    lpPro: 'Pro',
    lpFreeList: ['Calendar & export', 'Zajel voice assistant', 'Send from your own email', 'Daily briefing'],
    lpProList: ['Much higher usage limits', 'Priority AI', 'New features first'],
    briefingTitle: "Today's briefing",
    briefingReady: 'Your daily briefing is ready',
    briefingReadyAsk: "Let me know when you'd like me to read it to you.",
    readToMe: 'Read it to me',
    showMe: 'Show me',
    stopReading: 'Stop reading',
    rdSchedule: 'Your schedule today:',
    rdNeedReply: 'Waiting for your reply:',
    rdImportant: 'Also important:',
    rdSuggestions: 'My suggestions:',
    rdFrom: 'From {from}, about {subject}',
    replyTitle: 'Reply',
    replyToName: 'Reply to {name}',
    composePh: 'Write your reply…',
    openingWhatsApp: 'Opening WhatsApp…',
    noReadAloud: "This browser can't read aloud. You can read the briefing on screen.",
    checkingInbox: 'Checking your inbox…',
    importantEmails: 'Most important emails from people',
    needsReplyTag: 'Waiting for you',
    noImportantEmails: 'No important emails from people in the last few days.',
    skippedMachine: 'Skipped {n} automatic emails (security alerts, promotions, notifications).',
    wakeTitle: 'Say "Hey Zajel"',
    wakeHelp: 'Hands-free while Zajel is open on screen: say your request, like "Hey Zajel, read me my important emails". When your phone is locked, use "Hey Siri, Zajel".',
    wakeUnsupported: "This browser can't listen continuously. Try Chrome, or use \"Hey Siri, Zajel\" on iPhone.",
    wakeSay: 'Say "Hey Zajel"',
    wakePaused: 'Listening paused — tap to resume',
    wakeListening: "I'm listening…",
    wakeOnToast: 'Done. Say "Hey Zajel" any time while the app is open.',
    wakeOff: 'Hands-free listening is off.',
    wakeDenied: "Zajel can't use the microphone. Allow it in your browser settings.",
    details: 'Details',
    briefingNow: 'Brief me now',
    briefingWorking: 'Preparing your briefing…',
    briefingEmpty: "Today's briefing hasn't been prepared yet.",
    needReply: 'Needs a reply',
    important: 'Important',
    otherMail: '{n} other emails can wait',
    suggestions: 'Suggestions',
    replyTo: 'Reply',
    replyCmd: 'Write a reply to {from} about "{subject}"',
    inboxNeedsRead: 'To include your inbox, reconnect Gmail and allow read access.',
    inboxNotConnected: 'Connect Gmail to include your inbox in the briefing.',
    inboxReconnect: 'Your Gmail connection expired; reconnect it to include your inbox.',
    reconnectGmail: 'Reconnect Gmail',
    briefingSettings: 'Daily briefing',
    briefingSettingsHelp: 'At the time you choose, Zajel reviews your calendar and inbox and sends you a summary of what needs your attention.',
    briefingOn: 'Turn on the daily briefing',
    briefingTime: 'Time',
    briefingDays: 'Days',
    briefingInbox: 'Include my inbox (read-only)',
    saved2: 'Saved',
    notifTitle: 'Phone notifications',
    notifOn: 'Turn on notifications',
    notifEnabled: 'Notifications are on for this device',
    notifTest: 'Send a test',
    notifDenied: 'Notifications are blocked for this site. Allow them in your browser settings.',
    notifUnsupported: "This browser doesn't support notifications.",
    notifIos: 'On iPhone: tap Share ⬆️ → "Add to Home Screen", open Zajel from its icon, then turn on notifications.',
    notifSent: 'Test notification sent',
    notifNone: 'No devices have notifications turned on yet',
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
    gmailNotConnected: 'Connect Gmail so Zajel can send from your address after you approve.',
    connectGmail: 'Connect Gmail',
    disconnect: 'Disconnect',
    gmailOffNote: "Direct sending isn't enabled yet. You can open any message in Gmail and send it from there.",
    gmailNote: 'Send, plus read-only access used only to summarise your inbox in your daily briefing. Zajel never deletes or changes your email.',
    gmailConnectedToast: 'Gmail connected',
    signedInToast: 'Signed in and Gmail connected',
    gmailDeniedToast: 'Gmail was not connected',
    loginDeniedToast: 'Google sign-in was cancelled',
    gmailErrorToast: "Couldn't reach Google. Please try again.",
    gmailNoScopeToast: 'Allow the “send email” permission to connect Gmail',
    disconnectedToast: 'Gmail disconnected',
    siriTitle: 'Siri',
    siriIntro: 'Talk to Zajel from your iPhone without opening the app:',
    siriSay: '“Hey Siri, Zajel” → “Email my employees to visit the museum”',
    siriStep1: 'Open the <b>Shortcuts</b> app → <b>+</b> new shortcut.',
    siriStep2: 'Add the <b>Dictate Text</b> action.',
    siriStep3: 'Add <b>URL Encode</b> so it takes the dictated text.',
    siriStep4: 'Add <b>Open URLs</b>, type the link below, then insert “URL Encoded Text” at its end.',
    siriStep5: 'Name the shortcut <b>Zajel</b>. Now say “Hey Siri, Zajel”.',
    siriLink: 'Link',
    siriNote: 'Zajel opens with your message ready and asks before sending.',
    copyLink: 'Copy link',
    yourPlan: 'Your plan',
    planFree: 'Free',
    planPro: 'Zajel Pro',
    perMonth: '/ month',
    current: 'Current',
    featCalendar: 'Calendar & export',
    featAssistant: 'Zajel voice assistant',
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
  document.title = state.lang === 'ar' ? 'زاجل · Zajel' : 'Zajel · زاجل';
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
  if (!$('#landing').hidden) {
    renderLanding();
    startTyping();
  }
  if (state.user) {
    render();
    renderBriefing();
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
  stopWake();
  stopSaying();
  state.user = null;
  updateWakePill();
  state.tasks = [];
  state.contacts = [];
  state.connections = [];
  state.meetings = [];
  clearInterval(pollTimer);
  $('#as-thread').innerHTML = '';
  $('#app').hidden = true;
  showLanding();
});

function showAuth() {
  const google = state.config?.integrations.gmail;
  const pendingAsk = session.get('mudir.ask');
  $('#google-login').hidden = !google;
  $('#google-login').href = `/api/auth/google${pendingAsk ? `?ask=${encodeURIComponent(pendingAsk)}` : ''}`;
  $('#google-note').hidden = !google;
  $('#auth-divider').hidden = !google;
  $('#landing').hidden = true;
  $('#auth').hidden = false;
  window.scrollTo(0, 0);
}

// ---------- Public landing page ----------
function showLanding() {
  $('#auth').hidden = true;
  $('#app').hidden = true;
  $('#landing').hidden = false;
  renderLanding();
  startTyping();
}

function renderLanding() {
  const L = I18N[state.lang];
  const features = [['sun', 'f1'], ['mail', 'f2'], ['meeting', 'f3'], ['whatsapp', 'f4'], ['brain', 'f5'], ['globe', 'f6']];
  $('#lp-feature-grid').innerHTML = features
    .map(([ic, k]) => `<article class="lp-card"><h3>${icon(ic)}${esc(t(k + 't'))}</h3><p>${esc(t(k + 'd'))}</p><div class="lp-quote" dir="auto">${esc(t(k + 'q'))}</div></article>`)
    .join('');
  const price = state.config?.proPrice || '$9';
  $('#lp-prices').innerHTML = `
    <div class="lp-price"><h3>${esc(t('lpFree'))}</h3><div class="amount">0</div><ul>${L.lpFreeList.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      <button class="lp-btn" data-signin>${esc(t('lpStart'))}</button></div>
    <div class="lp-price pro"><h3>${esc(t('lpPro'))}</h3><div class="amount">${esc(price)} <small>${esc(t('perMonth'))}</small></div><ul>${L.lpProList.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      <button class="lp-btn primary" data-signin>${esc(t('lpStart'))}</button></div>`;
  const mail = state.config?.contactEmail;
  $('#lp-contact-body').innerHTML = mail
    ? `<a class="lp-btn primary" href="mailto:${esc(mail)}" style="align-self:flex-start">${icon('mail')}&nbsp;${esc(t('lpEmailUs'))}</a>`
    : `<p class="lp-lead">${esc(t('lpContactSoon'))}</p>`;
}

// The hero types out real requests, one after another.
let typingTimer = null;
function startTyping() {
  clearTimeout(typingTimer);
  const lines = ['ex1', 'ex2', 'ex3', 'ex5'].map((k) => t(k));
  let line = 0;
  let pos = 0;
  const el = $('#lp-say-text');
  const step = () => {
    if ($('#landing').hidden) return;
    const text = lines[line];
    el.textContent = text.slice(0, pos);
    el.dir = 'auto';
    if (pos < text.length) {
      pos++;
      typingTimer = setTimeout(step, 45);
    } else {
      typingTimer = setTimeout(() => {
        line = (line + 1) % lines.length;
        pos = 0;
        step();
      }, 2200);
    }
  };
  step();
}

document.addEventListener('click', (e) => {
  if (e.target.closest('[data-signin]')) {
    e.preventDefault();
    showAuth();
  }
  if (e.target.closest('[data-back-landing]')) showLanding();
  const lp = e.target.closest('[data-lp]');
  if (lp) {
    e.preventDefault();
    const target = $(`#lp-${lp.dataset.lp}`);
    if (target) window.scrollTo({ top: lp.dataset.lp === 'home' ? 0 : target.offsetTop - 60, behavior: 'smooth' });
    $$('.lp-links a').forEach((a) => a.classList.toggle('active', a === lp));
  }
});

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
    // Visitors see the landing page; links that expect sign-in (Siri, Google return) go straight to it.
    const toastKey = { loginDenied: 'loginDeniedToast', error: 'gmailErrorToast' }[params.get('gmail')];
    if (toastKey || session.get('mudir.ask') || location.hash === '#signin') showAuth();
    else showLanding();
    if (toastKey) toast(t(toastKey), true);
  }
}

async function enterApp() {
  $('#landing').hidden = true;
  $('#auth').hidden = true;
  $('#app').hidden = false;
  registerServiceWorker();
  startWake();
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

  const fromNotification = location.hash === '#briefing';
  showView(location.hash.replace('#', '') || 'calendar');
  loadBriefing({ expand: fromNotification });

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
  if (v === 'briefing') v = 'calendar';
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

// New meeting form. What the user types lives in a draft, so adding someone mid-way (or closing
// the sheet by accident) never loses the meeting they were setting up.
let meetingFormKey = null;
let conflictTimer = null;
let mfDraft = null;
const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const acceptedConnections = () => state.connections.filter((c) => c.status === 'accepted').map((c) => c.user);
// People who can be invited: accepted connections plus anyone I've just sent a request to.
const invitableConnections = () =>
  state.connections.filter((c) => c.status === 'accepted' || c.direction === 'out').map((c) => ({ ...c.user, pending: c.status !== 'accepted' }));

// Add someone by email without leaving the meeting: a Zajel user becomes an attendee (sending a
// connection request if needed); anyone else becomes an email guest.
async function addPersonByEmail(raw) {
  const email = String(raw || '').trim().toLowerCase();
  if (!EMAIL_OK.test(email)) throw new Error(t('invalidEmail'));
  const known = state.connections.find((c) => c.user.email.toLowerCase() === email && (c.status === 'accepted' || c.direction === 'out'));
  if (known) return { type: 'user', user: known.user, requested: known.status !== 'accepted' };
  try {
    state.connections = (await api('/api/connections', { method: 'POST', body: { email } })).connections;
    state.notif.requests = state.connections.filter((c) => c.status === 'pending' && c.direction === 'in').length;
    updateBadges();
    const c = state.connections.find((x) => x.user.email.toLowerCase() === email);
    return { type: 'user', user: c.user, requested: c.status !== 'accepted' };
  } catch (err) {
    if (err.status !== 404) throw err;
    const contact = state.contacts.find((x) => x.email === email);
    return { type: 'guest', guest: { email, name: contact?.name || '' } };
  }
}

function openMeetingForm({ date, attendeeIds = [] } = {}) {
  const day = date || today();
  // Reopening the same day brings back what was typed, unless a specific person was picked.
  if (!mfDraft || mfDraft.date !== day || attendeeIds.length) {
    mfDraft = { date: day, title: '', time: '', durationMin: 30, location: '', notes: '', attendeeIds: [...attendeeIds], guests: [], key: newKey() };
  }
  const f = $('#meeting-form');
  f.title.value = mfDraft.title;
  f.date.value = mfDraft.date;
  f.time.value = mfDraft.time;
  f.durationMin.value = String(mfDraft.durationMin);
  f.location.value = mfDraft.location;
  f.notes.value = mfDraft.notes;
  meetingFormKey = mfDraft.key;
  renderMfPeople();
  $('#mf-conflicts').innerHTML = '';
  checkMfConflicts();
  openSheet('sheet-meeting-form');
  if (matchMedia('(hover: hover)').matches) setTimeout(() => f.title.focus(), 150);
}

function syncMfDraft() {
  if (!mfDraft) return null;
  const f = $('#meeting-form');
  Object.assign(mfDraft, {
    title: f.title.value,
    date: f.date.value,
    time: f.time.value,
    durationMin: Number(f.durationMin.value),
    location: f.location.value,
    notes: f.notes.value,
    attendeeIds: $$('input[name=attendee]:checked', f).map((x) => x.value),
  });
  return mfDraft;
}

function renderMfPeople() {
  const people = invitableConnections();
  const chips = people
    .map((p) => `<label><input type="checkbox" name="attendee" value="${p.id}" ${mfDraft.attendeeIds.includes(p.id) ? 'checked' : ''} />${esc(p.name)}${p.pending ? ` <span class="status-pill pending">${esc(t('requested'))}</span>` : ''}</label>`)
    .join('');
  const guests = mfDraft.guests
    .map((g, i) => `<span class="rcpt" title="${esc(g.email)}">${icon('mail')}${esc(g.name || g.email)}<button type="button" data-rm-guest="${i}" aria-label="${esc(t('remove'))}">${icon('x')}</button></span>`)
    .join('');
  $('#mf-attendees').innerHTML = `${chips}${guests}
    <div class="add-person">
      <input type="text" inputmode="email" autocomplete="email" dir="ltr" data-add-email placeholder="${esc(t('addSomeonePh'))}" />
      <button type="button" class="btn ghost" data-add-go>${icon('user-plus')}${esc(t('addSomeone'))}</button>
    </div>
    <p class="muted small" style="width:100%">${esc(t('addSomeoneHelp'))}</p>`;
}

function checkMfConflicts() {
  clearTimeout(conflictTimer);
  conflictTimer = setTimeout(async () => {
    const v = syncMfDraft();
    if (!v?.date || !v.time) return;
    try {
      $('#mf-conflicts').innerHTML = conflictsHtml((await api('/api/meetings/check', { method: 'POST', body: v })).conflicts);
    } catch { /* the check is advisory */ }
  }, 300);
}

async function addFromMfInput() {
  syncMfDraft();
  const input = $('#mf-attendees [data-add-email]');
  const btn = $('#mf-attendees [data-add-go]');
  if (!input.value.trim()) return input.focus();
  busy(btn, true);
  try {
    const r = await addPersonByEmail(input.value);
    if (r.type === 'user') {
      if (!mfDraft.attendeeIds.includes(r.user.id)) mfDraft.attendeeIds.push(r.user.id);
      toast(t(r.requested ? 'addedRequested' : 'addedToMeeting', { name: r.user.name }));
    } else {
      if (!mfDraft.guests.some((g) => g.email === r.guest.email)) mfDraft.guests.push(r.guest);
      toast(t('addedGuest', { email: r.guest.email }));
    }
    renderMfPeople();
    checkMfConflicts();
    $('#mf-attendees [data-add-email]').focus();
  } catch (err) {
    toast(err.message, true);
    busy(btn, false);
  }
}

$('#mf-attendees').addEventListener('click', (e) => {
  const rm = e.target.closest('[data-rm-guest]');
  if (rm) {
    syncMfDraft();
    mfDraft.guests.splice(Number(rm.dataset.rmGuest), 1);
    return renderMfPeople();
  }
  if (e.target.closest('[data-add-go]')) addFromMfInput();
});
$('#mf-attendees').addEventListener('keydown', (e) => {
  if (e.target.matches('[data-add-email]') && e.key === 'Enter') {
    e.preventDefault(); // Enter here adds the person; it must not send the invitation
    addFromMfInput();
  }
});
$('#meeting-form').addEventListener('input', () => syncMfDraft());
$('#meeting-form').addEventListener('change', (e) => {
  if (!e.target.matches('[data-add-email]')) checkMfConflicts();
});

$('#meeting-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('[type=submit]');
  const v = { ...syncMfDraft() };
  if (!v.attendeeIds.length && !v.guests.length) return toast(t('needPerson'), true);
  busy(btn, true, t('sending'));
  try {
    const res = await api('/api/meetings', { method: 'POST', body: { ...v, key: meetingFormKey } });
    mfDraft = null;
    state.meetingsRange = '';
    closeSheets();
    render();
    afterMeetingSent(res);
  } catch (err) {
    toast(err.message, true);
  } finally {
    busy(btn, false);
  }
});

// After sending: confirm, and for guests whose email couldn't go out automatically, offer it ready to send.
function afterMeetingSent(res, container) {
  const notSent = res.guests?.notSent || [];
  const sent = res.guests?.sent?.length || 0;
  toast(sent ? t('inviteSentGuests', { n: sent }) : t('inviteSent'));
  if (!notSent.length) return '';
  const html = `<div class="callout blue">${icon('mail')}<div class="grow"><strong>${esc(t('guestsToSend'))}</strong>
    ${notSent.map((g) => `<div class="row gap wrap" style="margin-top:6px"><span class="grow" dir="ltr" style="text-align:start">${esc(g.name ? `${g.name} <${g.email}>` : g.email)}</span>
      <a class="btn sm" target="_blank" rel="noopener" href="${esc(`https://mail.google.com/mail/?${new URLSearchParams({ view: 'cm', fs: '1', to: g.email, su: g.subject, body: g.body })}`)}">${icon('external')}Gmail</a>
      <a class="btn sm" href="${esc(`mailto:${g.email}?subject=${encodeURIComponent(g.subject)}&body=${encodeURIComponent(g.body)}`)}">${icon('mail')}${esc(t('mailApp'))}</a></div>`).join('')}
  </div></div>`;
  if (container) return html;
  $('#meeting-body').innerHTML = `<div class="stack"><div class="sheet-head"><h3>${esc(t('meetingSaved'))}</h3>
    <button class="icon-btn lg" type="button" data-close aria-label="${esc(t('close'))}">${icon('x')}</button></div>${html}</div>`;
  openSheet('sheet-meeting');
  return '';
}

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
  html += `<div class="group"><div class="group-head"><span class="row gap"><span class="tag blue">${esc(t('onZajel'))}</span><span class="muted small">${accepted.length}</span></span></div>`;
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
        <a class="btn ghost" href="${esc(gmail)}" target="_blank" rel="noopener" style="align-self:flex-start">${icon('mail')}${esc(t('notOnZajelInvite'))}</a></div></div>`;
    } else {
      toast(err.message, true);
    }
  } finally {
    busy(btn, false);
  }
});

// ---------- Ask Zajel ----------
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
  if (mode === 'idle') {
    setLevel(0);
    setTimeout(startWake, 800); // hands-free listening resumes once the mic is free
  }
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
  // Never talk over the user: opening the mic silences Zajel straight away.
  stopSaying();
  stopWake(); // the hands-free listener gives the microphone to this request
  unlockAudio();
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
  if (!lastWasVoice || voice || !text) return;
  say(text);
}

// ---------- Zajel's voice ----------
// A natural AI voice from the server, played as audio; the browser's built-in voice is the fallback.
// Text is spoken in chunks so the first words start quickly while the rest is prepared.
const ttsAudio = new Audio();
ttsAudio.preload = 'auto';
let sayToken = 0;
let sayEndCurrent = null;
let saying = false;

// iOS only plays sound started by a tap: play a moment of silence on the tap, then later audio may play.
let audioUnlocked = false;
function unlockAudio() {
  unlockSpeechOutput();
  if (audioUnlocked) return;
  try {
    const rate = 8000;
    const buf = new ArrayBuffer(44 + 2 * 80);
    const v = new DataView(buf);
    const w = (o, s) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
    w(0, 'RIFF'); v.setUint32(4, 36 + 160, true); w(8, 'WAVEfmt '); v.setUint32(16, 16, true);
    v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, rate, true); v.setUint32(28, rate * 2, true);
    v.setUint16(32, 2, true); v.setUint16(34, 16, true); w(36, 'data'); v.setUint32(40, 160, true);
    ttsAudio.src = URL.createObjectURL(new Blob([buf], { type: 'audio/wav' }));
    ttsAudio.play().then(() => { audioUnlocked = true; }).catch(() => {});
  } catch { /* audio output is optional */ }
}

const isArabicText = (s) => /[؀-ۿ]/.test(s);

// The first line is its own chunk so the voice starts quickly; the rest is grouped into larger pieces.
function chunkLines(lines, max = 420) {
  const [first, ...rest] = lines.map((s) => (/[.!?؟…:]$/.test(s) ? s : `${s}.`));
  const out = [first];
  let cur = '';
  for (const piece of rest) {
    if (cur && `${cur} ${piece}`.length > max) {
      out.push(cur);
      cur = piece;
    } else cur = cur ? `${cur} ${piece}` : piece;
  }
  if (cur) out.push(cur);
  return out;
}

function playUrl(url, token) {
  return new Promise((resolve, reject) => {
    if (token !== sayToken) return resolve();
    sayEndCurrent = resolve;
    ttsAudio.onended = () => resolve();
    ttsAudio.onerror = () => reject(new Error('audio'));
    ttsAudio.src = url;
    ttsAudio.play().catch(reject);
  });
}

function stopSaying() {
  sayToken += 1;
  saying = false;
  try { ttsAudio.pause(); } catch { /* nothing playing */ }
  sayEndCurrent?.();
  sayEndCurrent = null;
  try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch { /* nothing playing */ }
}

async function say(lines, { lang, onEnd } = {}) {
  stopSaying();
  const token = sayToken;
  lines = (Array.isArray(lines) ? lines : [lines]).map((s) => String(s || '').trim()).filter(Boolean);
  if (!lines.length) return onEnd?.();
  lang = lang || (isArabicText(lines.join(' ')) ? 'ar' : 'en');
  const chunks = chunkLines(lines);
  saying = true;
  const done = () => {
    if (token !== sayToken) return;
    saying = false;
    onEnd?.();
  };
  let i = 0;
  if (state.config?.integrations.openai) {
    const pending = [];
    const fetchChunk = (n) => (pending[n] ||= fetch('/api/speak', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Lang': state.lang },
      body: JSON.stringify({ text: chunks[n], lang }),
      credentials: 'same-origin',
    }).then((r) => (r.ok ? r.blob() : Promise.reject(new Error('tts')))).then((b) => URL.createObjectURL(b)));
    try {
      for (; i < chunks.length; i++) {
        const url = await fetchChunk(i);
        if (i + 1 < chunks.length) fetchChunk(i + 1).catch(() => {});
        if (token !== sayToken) return;
        await playUrl(url, token);
        URL.revokeObjectURL(url);
        if (token !== sayToken) return;
      }
      return done();
    } catch {
      if (token !== sayToken) return;
      // Fall through to the browser voice from where the AI voice stopped.
    }
  }
  browserSay(chunks.slice(i), lang, token, done);
}

// The best voice the device has: "natural", "enhanced" and "premium" voices sound far less robotic.
function bestVoice(lang) {
  const voices = speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith(lang));
  const score = (v) => (/natural|neural|premium|enhanced|online/i.test(v.name) ? 4 : 0) + (/google|siri|microsoft/i.test(v.name) ? 2 : 0)
    + (lang === 'ar' && /sa|ae|qa|kw/i.test(v.lang) ? 1 : 0) + (lang === 'en' && /en-(us|gb)/i.test(v.lang) ? 1 : 0);
  return voices.sort((a, b) => score(b) - score(a))[0] || null;
}

function browserSay(chunks, lang, token, done) {
  if (!('speechSynthesis' in window) || !chunks.length) return done();
  try {
    speechSynthesis.cancel();
    const v = bestVoice(lang);
    chunks.forEach((text, n) => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
      if (v) u.voice = v;
      u.rate = lang === 'ar' ? 0.95 : 1;
      if (n === chunks.length - 1) u.onend = u.onerror = () => done();
      speechSynthesis.speak(u);
    });
  } catch {
    done();
  }
  void token;
}

// "Read me my important emails": the top emails from real people, shown in the chat and read aloud.
async function readImportantEmails() {
  const pending = addMsg('mudir thinking', `${icon('inbox')}<span>${esc(t('checkingInbox'))}</span>`);
  let res;
  try {
    res = await api('/api/inbox/important', { method: 'POST' });
  } catch (err) {
    pending.classList.remove('thinking');
    pending.innerHTML = `${icon('alert')}<span>${esc(err.message)}</span>`;
    return;
  }
  pending.remove();
  const card = document.createElement('div');
  card.className = 'as-card';
  if (!res.available) {
    const note = t({ needsRead: 'inboxNeedsRead', notConnected: 'inboxNotConnected', reconnect: 'inboxReconnect' }[res.reason] || 'inboxNotConnected');
    card.innerHTML = `<div class="callout yellow">${icon('alert')}<span>${esc(note)}</span></div>
      ${state.config.integrations.gmail ? `<a class="btn google lg" href="/api/google/connect">${icon('google', 'g')}${esc(t('reconnectGmail'))}</a>` : ''}`;
    $('#as-thread').append(card);
    say(note);
    return;
  }
  card.innerHTML = `<div class="row gap"><svg class="ic" style="color:var(--gold)"><use href="#i-inbox"/></svg><strong>${esc(t('importantEmails'))}</strong>
      <button class="btn quiet sm" data-stop-say style="margin-inline-start:auto">${icon('x')}${esc(t('stopReading'))}</button></div>
    ${res.emails.length
      ? `<ul class="mail-list">${res.emails.map((m, i) => `<li>
          <div class="row gap"><span class="avatar">${esc(initial(m.from))}</span>
            <div class="grow"><p class="strong" dir="auto">${esc(m.from)}</p><p class="muted small" dir="auto">${esc(m.subject)}</p></div>
            ${m.needsReply ? `<span class="tag gold">${esc(t('needsReplyTag'))}</span>` : ''}</div>
          <p dir="auto">${esc(m.summary)}</p>
          <button class="btn ghost sm" data-reply-i="${i}">${icon('mail')}${esc(t('replyTo'))}</button></li>`).join('')}</ul>`
      : `<p class="muted" dir="auto">${esc(res.intro || t('noImportantEmails'))}</p>`}
    ${res.skipped ? `<p class="muted small">${esc(t('skippedMachine', { n: res.skipped }))}</p>` : ''}`;
  card.addEventListener('click', (e) => {
    if (e.target.closest('[data-stop-say]')) return stopSaying();
    const b = e.target.closest('[data-reply-i]');
    if (!b) return;
    const m = res.emails[Number(b.dataset.replyI)];
    stopSaying();
    openCompose({ to: m.fromEmail, name: m.from, subject: m.subject, threadId: m.threadId, messageId: m.messageId });
  });
  $('#as-thread').append(card);
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  const L = (m) => (res.lang === 'ar' ? `من ${m.from}. ${m.summary}` : `From ${m.from}. ${m.summary}`);
  say([res.intro, ...res.emails.map((m) => (m.summary.includes(m.from) ? m.summary : L(m))), res.outro], { lang: res.lang });
}

// ---------- "Hey Zajel": hands-free while the app is open ----------
// Listens on the device for the wake phrase, then takes the rest of the sentence (or the next one) as a request.
// Works where the browser offers speech recognition and only while Zajel is open on screen.
const WAKE_EN = /\b(?:(?:hey|hi|hello|ok(?:ay)?|ya)[\s,]+(?:zaj\w*|zag[ei]l|zageel|hazel|sajal|zahel|the jail)|zajel|zajil|zajal|zajeel)\b/i;
const WAKE_AR = /(?:(?:يا|هاي|هلا|هيه|أوكي|اوكي)\s*)?(?:ال)?زاجل/;
const wake = { rec: null, armedUntil: 0, restart: null };
const wakeEnabled = () => store.get('zajel.wake') === '1';
const wakeSupported = () => Boolean(SpeechRec);

function setWakeEnabled(on) {
  store.set('zajel.wake', on ? '1' : '0');
  if (on) startWake();
  else stopWake();
}

function startWake() {
  clearTimeout(wake.restart);
  if (!wakeSupported() || !wakeEnabled() || wake.rec || voice || document.hidden || !state.user) return updateWakePill();
  const rec = new SpeechRec();
  rec.continuous = true;
  rec.interimResults = false;
  rec.lang = getSpeechLang() === 'ar' ? 'ar-SA' : 'en-US';
  rec.onresult = (e) => {
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (e.results[i].isFinal) onWakeHeard(e.results[i][0].transcript || '');
    }
  };
  rec.onerror = (e) => {
    if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
      store.set('zajel.wake', '0');
      toast(t('wakeDenied'), true);
      if (state.view === 'settings') renderSettings();
    }
  };
  rec.onend = () => {
    if (wake.rec === rec) wake.rec = null;
    updateWakePill();
    // Browsers stop listening after a while: start again while the setting is on.
    if (wakeEnabled() && !voice && !document.hidden) wake.restart = setTimeout(startWake, 500);
  };
  try {
    rec.start();
    wake.rec = rec;
  } catch { /* already listening */ }
  updateWakePill();
}

function stopWake() {
  clearTimeout(wake.restart);
  const rec = wake.rec;
  wake.rec = null;
  try { rec?.abort(); } catch { /* already stopped */ }
  updateWakePill();
}

function onWakeHeard(text) {
  if (voice || saying) return; // never react to Zajel's own voice
  text = text.trim();
  const m = text.match(WAKE_AR) || text.match(WAKE_EN);
  let cmd = '';
  if (m) cmd = text.slice(m.index + m[0].length).replace(/^[\s,،.!؟?]+/, '').trim();
  else if (Date.now() < wake.armedUntil) cmd = text;
  else return;
  if (cmd.split(/\s+/).filter(Boolean).length >= 2) {
    wake.armedUntil = 0;
    updateWakePill();
    openAssistant(cmd, { voice: true });
  } else {
    // Just the name: answer and wait for the request.
    wake.armedUntil = Date.now() + 9000;
    updateWakePill(true);
    toast(t('wakeListening'));
    setTimeout(() => updateWakePill(), 9000);
  }
}

function updateWakePill(armed = Date.now() < wake.armedUntil) {
  let pill = $('#wake-pill');
  const show = wakeEnabled() && wakeSupported() && Boolean(state.user) && !$('#app')?.hidden;
  if (!show) {
    pill?.remove();
    return;
  }
  if (!pill) {
    pill = document.createElement('button');
    pill.id = 'wake-pill';
    pill.type = 'button';
    pill.addEventListener('click', () => {
      if (wake.rec) {
        setWakeEnabled(false);
        toast(t('wakeOff'));
      } else startWake();
    });
    document.body.append(pill);
  }
  pill.classList.toggle('live', Boolean(wake.rec));
  pill.classList.toggle('armed', armed);
  pill.innerHTML = `<span class="dot"></span>${esc(armed ? t('wakeListening') : wake.rec ? t('wakeSay') : t('wakePaused'))}`;
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') stopWake();
  else startWake();
});

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
    const wantsBriefing = (res.actions || []).some((a) => a.type === 'briefing');
    const wantsEmails = (res.actions || []).some((a) => a.type === 'emails');
    if (!wantsBriefing && !wantsEmails) speak(res.reply);
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
    if (wantsEmails) await readImportantEmails();
    else if (wantsBriefing) await readBriefingOnRequest();
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
  // One person on WhatsApp: no extra tap, open the chat with the message ready straight away.
  // The card stays as a fallback in case the browser blocks it.
  if (channel === 'whatsapp' && m.recipients.length === 1 && m.body.trim()) {
    const r = m.recipients[0];
    const link = waLink(r.phone, m.body);
    toast(t('openingWhatsApp'));
    setTimeout(() => {
      if (matchMedia('(pointer: coarse)').matches) location.href = link;
      else {
        const win = window.open(link, '_blank');
        if (!win) return;
        win.opener = null;
      }
      r.opened = true;
      draw();
    }, 700);
  }
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
  const guests = [...(meeting.guests || [])];
  const card = document.createElement('div');
  card.className = 'as-card';
  const people = () => invitableConnections().filter((p) => !attendees.some((a) => a.id === p.id));

  function draw() {
    const others = people();
    const total = attendees.length + guests.length;
    card.innerHTML = `
      <div class="row gap"><svg class="ic" style="color:var(--gold)"><use href="#i-meeting"/></svg><input class="prop-input wide strong" data-f="title" value="${esc(meeting.title)}" dir="auto" style="font-size:1.05rem" /></div>
      <div class="row gap wrap">
        <label class="field grow"><span>${esc(t('fDate'))}</span><input type="date" data-f="date" value="${esc(meeting.date)}" /></label>
        <label class="field grow"><span>${esc(t('fTime'))}</span><input type="time" data-f="time" value="${esc(meeting.time)}" /></label>
        <label class="field grow"><span>${esc(t('duration'))}</span><input type="number" min="5" max="600" step="5" data-f="durationMin" value="${meeting.durationMin}" /></label>
      </div>
      <div><div class="label">${esc(t('attendees'))}</div>
        <div class="rcpts">${attendees.map((a, i) => `<span class="rcpt">${esc(a.name)}<button type="button" data-rm="${i}" aria-label="${esc(t('remove'))}">${icon('x')}</button></span>`).join('')}
          ${guests.map((g, i) => `<span class="rcpt" title="${esc(g.email)}">${icon('mail')}${esc(g.name || g.email)}<button type="button" data-rm-guest="${i}" aria-label="${esc(t('remove'))}">${icon('x')}</button></span>`).join('')}
          ${others.length ? `<select class="prop-input" data-add-att><option value="">+</option>${others.map((p) => `<option value="${p.id}">${esc(p.name)}</option>`).join('')}</select>` : ''}
        </div>
        ${meeting.unmatched?.length ? `<div class="callout yellow" style="margin-top:8px">${icon('alert')}<span>${esc(t('notFoundAdd', { names: meeting.unmatched.join('، ') }))}</span></div>` : ''}
        <div class="add-person" style="margin-top:8px">
          <input type="text" inputmode="email" autocomplete="email" dir="ltr" data-add-email placeholder="${esc(t('addSomeonePh'))}" />
          <button type="button" class="btn ghost" data-add-go>${icon('user-plus')}${esc(t('addSomeone'))}</button>
        </div>
      </div>
      ${meeting.location ? `<p class="muted small row gap">${icon('pin')}<span dir="auto">${esc(meeting.location)}</span></p>` : ''}
      <div data-conflicts>${conflictsHtml(meeting.conflicts)}</div>
      <div class="as-actions">
        <button class="btn primary xl" data-send-meeting ${total ? '' : 'disabled'}>${icon('send')}${esc(t('sendInvite'))}</button>
        <button class="btn quiet lg" data-cancel>${esc(t('cancel'))}</button>
      </div>`;
  }
  draw();

  // Add someone by email right here, keeping everything else in this meeting as it is.
  async function addFromCard() {
    const input = card.querySelector('[data-add-email]');
    const btn = card.querySelector('[data-add-go]');
    if (!input.value.trim()) return input.focus();
    busy(btn, true);
    try {
      const r = await addPersonByEmail(input.value);
      if (r.type === 'user') {
        if (!attendees.some((a) => a.id === r.user.id)) attendees.push({ id: r.user.id, name: r.user.name });
        toast(t(r.requested ? 'addedRequested' : 'addedToMeeting', { name: r.user.name }));
      } else {
        if (!guests.some((g) => g.email === r.guest.email)) guests.push(r.guest);
        toast(t('addedGuest', { email: r.guest.email }));
      }
      meeting.unmatched = [];
      draw();
      recheck();
      card.querySelector('[data-add-email]').focus();
    } catch (err) {
      toast(err.message, true);
      busy(btn, false);
    }
  }
  card.addEventListener('keydown', (e) => {
    if (e.target.matches('[data-add-email]') && e.key === 'Enter') {
      e.preventDefault();
      addFromCard();
    }
  });

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
      const p = people().find((x) => x.id === e.target.value);
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
    const rmGuest = e.target.closest('[data-rm-guest]');
    if (rmGuest) {
      guests.splice(Number(rmGuest.dataset.rmGuest), 1);
      return draw();
    }
    if (e.target.closest('[data-add-go]')) return addFromCard();
    if (e.target.closest('[data-cancel]')) {
      card.innerHTML = `<p class="muted">${esc(t('cancelled'))}</p>`;
      return;
    }
    const send = e.target.closest('[data-send-meeting]');
    if (send) {
      busy(send, true, t('sending'));
      try {
        const res = await api('/api/meetings', { method: 'POST', body: { ...meeting, attendeeIds: attendees.map((a) => a.id), guests, key: meeting.key } });
        card.innerHTML = `<div class="as-done">${icon('check')}${esc(t('inviteSent'))}</div>${afterMeetingSent(res, card)}`;
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

// ---------- Daily briefing ----------
let briefing = null;
let briefingOpen = false;

async function loadBriefing({ expand = false } = {}) {
  try {
    const res = await api('/api/briefing');
    briefing = res.briefing && res.briefing.date === res.today ? res.briefing : null;
    renderBriefing();
    // The scheduled time passed while the phone was off or the scheduler was late: catch up now.
    if (res.due) await briefMeNow({ quiet: true });
  } catch { /* the card simply stays hidden */ }
  if (expand) $('#briefing-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function briefMeNow({ quiet = false } = {}) {
  const card = $('#briefing-card');
  if (!quiet) {
    card.hidden = false;
    card.innerHTML = `<div class="briefing"><h2>${icon('sun')}${esc(t('briefingTitle'))}</h2><p class="muted"><span class="spinner"></span> ${esc(t('briefingWorking'))}</p></div>`;
  }
  try {
    briefing = (await api('/api/briefing/now', { method: 'POST' })).briefing;
    // A briefing made in the background waits for the user to ask; one they asked for opens right away.
    briefingOpen = !quiet;
    if (!quiet) markBriefingSeen();
  } catch (err) {
    if (!quiet) toast(err.message, true);
  }
  renderBriefing();
}

// "Seen" is per day and per device, so a new day's briefing announces itself again.
const briefingSeen = () => briefing && store.get('zajel.briefingSeen') === briefing.date;
function markBriefingSeen() {
  if (briefing) store.set('zajel.briefingSeen', briefing.date);
}

// Reads the briefing aloud, sentence by sentence (long single utterances get cut off on iPhones).
let reading = false;
function briefingScript(b) {
  const L = (k, v) => t(k, v);
  const parts = [b.headline, b.summary];
  if (b.schedule?.length) parts.push(L('rdSchedule'), ...b.schedule.map((s) => s.replace(/—/g, '،')));
  if (b.emails?.needReply?.length) parts.push(L('rdNeedReply'), ...b.emails.needReply.map((m) => L('rdFrom', { from: m.from, subject: m.subject }) + (m.why ? `. ${m.why}` : '')));
  if (b.emails?.important?.length) parts.push(L('rdImportant'), ...b.emails.important.map((m) => L('rdFrom', { from: m.from, subject: m.subject })));
  if (b.suggestions?.length) parts.push(L('rdSuggestions'), ...b.suggestions);
  return parts.filter(Boolean);
}

function readBriefingAloud() {
  if (!briefing) return toast(t('noReadAloud'), true);
  unlockAudio();
  reading = true;
  say(briefingScript(briefing), {
    lang: briefing.lang === 'en' ? 'en' : 'ar',
    onEnd: () => { reading = false; renderBriefing(); },
  });
  markBriefingSeen();
  briefingOpen = true;
  renderBriefing();
}

// "Read my briefing" from the assistant: make today's briefing if there isn't one, show it and read it.
async function readBriefingOnRequest() {
  if (!briefing || briefing.date !== today()) await briefMeNow({ quiet: true });
  if (!briefing) return;
  closeSheets();
  showView('calendar');
  readBriefingAloud();
  $('#briefing-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function stopReading() {
  stopSaying();
  reading = false;
  renderBriefing();
}

function renderBriefing() {
  const card = $('#briefing-card');
  const enabled = state.user?.briefing?.enabled;
  if (!briefing) {
    card.hidden = !enabled;
    if (enabled) {
      card.innerHTML = `<div class="briefing"><h2>${icon('sun')}${esc(t('briefingTitle'))}</h2>
        <p class="muted">${esc(t('briefingEmpty'))}</p>
        <button class="btn primary" data-brief-now style="align-self:flex-start">${icon('sparkle')}${esc(t('briefingNow'))}</button></div>`;
    }
    return;
  }
  const b = briefing;
  card.hidden = false;
  // Ready but not opened yet: announce it and let the user choose when.
  if (!briefingOpen && !briefingSeen()) {
    card.innerHTML = `<div class="briefing ready">
      <h2>${icon('sun')}<span>${esc(t('briefingReady'))}</span></h2>
      <p>${esc(t('briefingReadyAsk'))}</p>
      <div class="row gap wrap">
        <button class="btn primary" data-brief-read>${icon('speaker')}${esc(t('readToMe'))}</button>
        <button class="btn" data-brief-show>${esc(t('showMe'))}</button>
      </div></div>`;
    return;
  }
  const mailItem = (m) => `<li><strong dir="auto">${esc(m.from)}</strong> · <span dir="auto">${esc(m.subject)}</span>
    ${m.why ? `<br><span class="muted small" dir="auto">${esc(m.why)}</span>` : ''}
    <br><button class="btn sm" data-reply='${esc(JSON.stringify({ to: m.fromEmail || '', name: m.from, subject: m.subject, threadId: m.threadId || '', messageId: m.messageId || '' }))}' style="margin-top:6px">${icon('mail')}${esc(t('replyTo'))}</button></li>`;
  const inboxNote = !b.inbox?.available && b.inbox?.reason && b.inbox.reason !== 'off'
    ? `<div class="row gap wrap"><span class="muted small">${esc(t({ needsRead: 'inboxNeedsRead', notConnected: 'inboxNotConnected', reconnect: 'inboxReconnect' }[b.inbox.reason] || 'inboxNotConnected'))}</span>
       ${state.config.integrations.gmail ? `<a class="btn sm" href="/api/google/connect">${icon('google', 'g')}${esc(t('reconnectGmail'))}</a>` : ''}</div>`
    : '';
  card.hidden = false;
  card.innerHTML = `<div class="briefing" dir="auto">
    <h2>${icon('sun')}<span dir="auto">${esc(b.headline || t('briefingTitle'))}</span></h2>
    <p dir="auto">${esc(b.summary)}</p>
    ${briefingOpen ? `
      ${b.schedule?.length ? `<ul>${b.schedule.map((s) => `<li dir="auto">${esc(s)}</li>`).join('')}</ul>` : ''}
      ${b.emails?.needReply?.length ? `<h3 class="row gap" style="font-size:0.95rem;color:#fff">${icon('inbox')}${esc(t('needReply'))}</h3><ul class="brief-mail">${b.emails.needReply.map(mailItem).join('')}</ul>` : ''}
      ${b.emails?.important?.length ? `<h3 class="row gap" style="font-size:0.95rem;color:#fff">${icon('alert')}${esc(t('important'))}</h3><ul class="brief-mail">${b.emails.important.map(mailItem).join('')}</ul>` : ''}
      ${b.emails?.otherCount ? `<p class="muted small">${esc(t('otherMail', { n: b.emails.otherCount }))}</p>` : ''}
      ${b.suggestions?.length ? `<h3 class="row gap" style="font-size:0.95rem;color:#fff">${icon('sparkle')}${esc(t('suggestions'))}</h3><ul>${b.suggestions.map((s) => `<li dir="auto">${esc(s)}</li>`).join('')}</ul>` : ''}
      ${inboxNote}` : ''}
    <div class="row gap wrap">
      ${reading
        ? `<button class="btn sm" data-brief-stop>${icon('x')}${esc(t('stopReading'))}</button>`
        : `<button class="btn sm" data-brief-read>${icon('speaker')}${esc(t('readToMe'))}</button>`}
      <button class="btn sm" data-brief-toggle>${esc(briefingOpen ? t('close') : t('details'))}</button>
      <button class="btn sm" data-brief-now>${icon('sparkle')}${esc(t('briefingNow'))}</button>
    </div>
  </div>`;
}

$('#briefing-card').addEventListener('click', (e) => {
  if (e.target.closest('[data-brief-now]')) return briefMeNow();
  if (e.target.closest('[data-brief-read]')) return readBriefingAloud();
  if (e.target.closest('[data-brief-stop]')) return stopReading();
  if (e.target.closest('[data-brief-show]')) {
    briefingOpen = true;
    markBriefingSeen();
    return renderBriefing();
  }
  if (e.target.closest('[data-brief-toggle]')) {
    briefingOpen = !briefingOpen;
    markBriefingSeen();
    return renderBriefing();
  }
  const reply = e.target.closest('[data-reply]');
  if (reply) {
    try {
      openCompose(JSON.parse(reply.dataset.reply));
    } catch { /* malformed data: ignore */ }
  }
});

// ---------- Blank reply page ----------
let composeState = null;
function openCompose({ to = '', name = '', subject = '', threadId = '', messageId = '' } = {}) {
  composeState = { threadId, messageId, key: newKey(), name };
  $('#cp-to').value = to;
  $('#cp-subject').value = subject && !/^(re|رد)\s*:/i.test(subject) ? `Re: ${subject}` : subject;
  $('#cp-body').value = '';
  $('#compose-title').textContent = name ? t('replyToName', { name }) : t('replyTitle');
  openSheet('sheet-compose');
  setTimeout(() => $('#cp-body').focus(), 200);
}

$('#cp-send').addEventListener('click', async () => {
  const to = $('#cp-to').value.trim();
  const subject = $('#cp-subject').value.trim();
  const body = $('#cp-body').value;
  if (!EMAIL_OK.test(to)) return toast(t('invalidEmail'), true);
  if (!body.trim()) return toast(t('needSubjectBody'), true);
  // Without a connected Gmail, hand the written reply to Gmail on the web.
  if (!state.user.gmail) {
    window.open(`https://mail.google.com/mail/?${new URLSearchParams({ view: 'cm', fs: '1', to, su: subject, body })}`, '_blank', 'noopener');
    return closeSheets();
  }
  const btn = $('#cp-send');
  busy(btn, true, t('sending'));
  try {
    const res = await api('/api/email/send', {
      method: 'POST',
      body: { to, subject, body, confirm: true, key: composeState?.key, threadId: composeState?.threadId, inReplyTo: composeState?.messageId },
    });
    state.user = res.user;
    closeSheets();
    toast(t('emailSent', { email: state.user.gmail }));
  } catch (err) {
    toast(err.message, true);
  } finally {
    busy(btn, false);
  }
});

// Settings card: the user's own schedule for the briefing, and phone notifications.
const isIos = () => /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isStandalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
const pushSupported = () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;

function registerServiceWorker() {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
}

async function currentPushSubscription() {
  if (!pushSupported()) return null;
  const reg = await navigator.serviceWorker.getRegistration('/');
  return reg ? reg.pushManager.getSubscription() : null;
}

function urlBase64ToUint8Array(base64) {
  const pad = '='.repeat((4 - (base64.length % 4)) % 4);
  const raw = atob((base64 + pad).replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

async function enableNotifications() {
  if (!pushSupported()) return toast(t(isIos() && !isStandalone() ? 'notifIos' : 'notifUnsupported'), true);
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return toast(t('notifDenied'), true);
  const reg = await navigator.serviceWorker.register('/sw.js');
  await navigator.serviceWorker.ready;
  const { publicKey } = await api('/api/push/key');
  const sub = (await reg.pushManager.getSubscription()) || (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(publicKey) }));
  await api('/api/push/subscribe', { method: 'POST', body: { subscription: sub.toJSON() } });
  renderBriefingSettings();
}

async function renderBriefingSettings() {
  const b = state.user.briefing;
  const fmtDay = new Intl.DateTimeFormat(locale(), { weekday: 'short' });
  const order = weekStartsSaturday() ? [6, 0, 1, 2, 3, 4, 5] : [0, 1, 2, 3, 4, 5, 6];
  const subscribed = Boolean(await currentPushSubscription().catch(() => null));
  let notif;
  if (subscribed && Notification.permission === 'granted') {
    notif = `<p class="row gap" style="color:var(--green-t)">${icon('check')}${esc(t('notifEnabled'))}</p>
      <button class="btn ghost" id="notif-test">${icon('bell')}${esc(t('notifTest'))}</button>`;
  } else if (isIos() && !isStandalone()) {
    notif = `<div class="callout blue">${icon('bell')}<span>${esc(t('notifIos'))}</span></div>`;
  } else if (!pushSupported()) {
    notif = `<p class="muted">${esc(t('notifUnsupported'))}</p>`;
  } else if (Notification.permission === 'denied') {
    notif = `<div class="callout red">${icon('alert')}<span>${esc(t('notifDenied'))}</span></div>`;
  } else {
    notif = `<button class="btn primary lg block" id="notif-on">${icon('bell')}${esc(t('notifOn'))}</button>`;
  }
  $('#briefing-settings').innerHTML = `
    <h3 class="card-title row gap">${icon('sun')}${esc(t('briefingSettings'))}</h3>
    <p class="muted small" style="margin-bottom:6px">${esc(t('briefingSettingsHelp'))}</p>
    <div class="setting-row"><span class="strong">${esc(t('briefingOn'))}</span>
      <label class="switch"><input type="checkbox" id="bs-enabled" ${b.enabled ? 'checked' : ''} /><span></span></label></div>
    <div class="setting-row"><span>${esc(t('briefingTime'))}</span><input type="time" class="prop-input" id="bs-time" value="${esc(b.time)}" dir="ltr" /></div>
    <div class="setting-row" style="flex-direction:column;align-items:stretch"><span>${esc(t('briefingDays'))}</span>
      <div class="days">${order.map((d) => `<label><input type="checkbox" value="${d}" ${b.days.includes(d) ? 'checked' : ''} />${esc(fmtDay.format(new Date(2024, 0, 7 + d)))}</label>`).join('')}</div></div>
    <div class="setting-row"><span>${esc(t('briefingInbox'))}${state.user.gmail && !state.user.gmailCanRead ? `<br><a class="small" href="/api/google/connect">${esc(t('reconnectGmail'))}</a>` : ''}</span>
      <label class="switch"><input type="checkbox" id="bs-inbox" ${b.inbox ? 'checked' : ''} /><span></span></label></div>
    <div class="setting-row" style="flex-direction:column;align-items:stretch;gap:8px"><span class="strong row gap">${icon('bell')}${esc(t('notifTitle'))}</span>${notif}</div>`;

  const save = async () => {
    const body = {
      enabled: $('#bs-enabled').checked,
      time: $('#bs-time').value,
      days: $$('#briefing-settings .days input:checked').map((x) => Number(x.value)),
      inbox: $('#bs-inbox').checked,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Qatar',
    };
    try {
      state.user = (await api('/api/briefing/settings', { method: 'PATCH', body })).user;
      toast(t('saved2'));
      renderBriefing();
    } catch (err) {
      toast(err.message, true);
    }
  };
  $('#briefing-settings').querySelectorAll('input').forEach((el) => el.addEventListener('change', save));
  $('#notif-on')?.addEventListener('click', () => enableNotifications().catch((err) => toast(err.message, true)));
  $('#notif-test')?.addEventListener('click', async () => {
    const { sent } = await api('/api/push/test', { method: 'POST' });
    toast(t(sent ? 'notifSent' : 'notifNone'), !sent);
  });
}

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
  renderBriefingSettings();

  const siriLink = `${location.origin}/?ask=`;
  $('#siri-card').innerHTML = `
    <h3 class="card-title row gap"><span class="ask-orb sm">${icon('siri')}</span>${esc(t('siriTitle'))}</h3>
    <p class="muted" style="margin-bottom:10px">${esc(t('siriIntro'))}</p>
    <p class="siri-say">${esc(t('siriSay'))}</p>
    <ol class="steps" style="margin-top:14px">
      <li>${t('siriStep1')}</li><li>${t('siriStep2')}</li><li>${t('siriStep3')}</li><li>${t('siriStep4')}</li><li>${t('siriStep5')}</li>
    </ol>
    <div class="code-box" style="margin-top:12px"><code>${esc(siriLink)}</code><button class="btn ghost" id="copy-siri">${icon('copy')}${esc(t('copyLink'))}</button></div>
    <p class="muted small" style="margin-top:8px">${esc(t('siriNote'))}</p>
    <div class="setting-row wake-row">
      <span><span class="strong">${esc(t('wakeTitle'))}</span><br><span class="muted small">${esc(t(wakeSupported() ? 'wakeHelp' : 'wakeUnsupported'))}</span></span>
      <label class="switch"><input type="checkbox" id="wake-on" ${wakeEnabled() && wakeSupported() ? 'checked' : ''} ${wakeSupported() ? '' : 'disabled'} /><span></span></label>
    </div>`;
  $('#wake-on').onchange = (e) => {
    unlockAudio();
    setWakeEnabled(e.target.checked);
    toast(t(e.target.checked ? 'wakeOnToast' : 'wakeOff'));
  };
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
