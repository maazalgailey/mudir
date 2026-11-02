# مُدير | Mudir

مساحة عمل بالعربية والإنجليزية، مستوحاة من Notion، تعمل على الجوال والحاسوب: مهام بعرض قائمة أو لوحة، تقويم، صياغة رسائل بالذكاء الاصطناعي (OpenAI)، إرسال البريد من حساب Gmail الخاص بكل مستخدم بعد تأكيده، واشتراك مدفوع (Stripe).

An Arabic/English, Notion-inspired workspace for phone and laptop: tasks (list or board), calendar, AI-drafted messages, sending from each user's own Gmail after they confirm, and Stripe subscriptions.

## التشغيل محليًا

```bash
npm install
cp .env.example .env   # ثم املأ المفاتيح
npm start              # http://localhost:3000
```

أي تكامل بلا مفاتيح يعمل بدونه:
- OpenAI ← صياغة جاهزة وترتيب حسب الأولوية والتاريخ
- Gmail ← يبقى خيار «افتح في Gmail / Outlook / تطبيق البريد» متاحًا للجميع
- Stripe ← زر «تجربة الاحترافي» للاختبار (يختفي على الموقع المنشور)

## المزايا
- **التقويم هو التطبيق:** اضغط أي يوم لترى ما فيه وتضيف إليه. تصدير `.ics` لتقويم Google/Apple/Outlook.
- **اسأل مُدير (صوت أو كتابة):** «أرسل لموظفيني دعوة لزيارة المتحف»، «ذكّرني بالاجتماع غدًا 10 صباحًا»، «ماذا لدي هذا الأسبوع؟». الرسائل تُجهَّز للمراجعة ولا تُرسل إلا بضغطة منك.
- **الأشخاص والمجموعات:** احفظ فريقك (مثل «الموظفون») أو الصق قائمة كاملة، ثم راسل المجموعة بجملة واحدة.
- **Siri:** اختصار «مُدير» في تطبيق الاختصارات يفتح `/?ask=<طلبك>` (الخطوات في الإعدادات).
- **المتابعة باستخدام Google:** تسجيل الدخول وربط Gmail في خطوة واحدة.
- **صفحة لكل مهمة:** الحالة والتاريخ والأولوية والمستلم والملاحظات تُحفظ تلقائيًا.
- **لغتان:** العربية/English، مع اتجاه الصفحة وتنسيق التواريخ ورسائل الخادم.

## ربط التكاملات

### 1. OpenAI
ضع `OPENAI_API_KEY` من platform.openai.com (يحتاج رصيدًا مدفوعًا مسبقًا). النموذج الافتراضي `gpt-6-luna`، ويمكن تغييره عبر `OPENAI_MODEL`.

### 2. Gmail (الإرسال من بريد كل مستخدم)
1. في [Google Cloud Console](https://console.cloud.google.com/) أنشئ مشروعًا وفعّل **Gmail API**.
2. **OAuth consent screen:** نوع External، وأضف النطاق `https://www.googleapis.com/auth/gmail.send`.
   في وضع Testing أضف بريد كل مختبِر ضمن **Test users** (حتى 100 مستخدم).
3. **Credentials → Create OAuth client ID → Web application**، وأضف في
   **Authorized redirect URIs**: `https://نطاقك/api/google/callback`
4. ضع `GOOGLE_CLIENT_ID` و`GOOGLE_CLIENT_SECRET` في متغيرات البيئة.

للإطلاق العام يجب أن تراجع Google التطبيق (نطاق `gmail.send` حسّاس)، وتطلب نطاقًا خاصًا وصفحة سياسة خصوصية.

### 3. Stripe (الاشتراكات)
1. أنشئ منتجًا بسعر شهري متكرر في لوحة Stripe، وانسخ `price_...` إلى `STRIPE_PRICE_ID`.
2. ضع `STRIPE_SECRET_KEY` (ابدأ بمفتاح `sk_test_` للتجربة).
3. الـ Webhook: `https://نطاقك/api/billing/webhook` مع الأحداث
   `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. فعّل Customer Portal ليتمكن المستخدم من الإلغاء وإدارة الفواتير.

## الباقات
| | مجاني | احترافي |
|---|---|---|
| المهام والتقويم | بلا حدود | بلا حدود |
| صياغات الذكاء الاصطناعي / شهر | 10 | 500 |
| رسائل البريد / شهر | 20 | 1000 |
| ترتيب الأولويات الذكي | — | ✓ |

عدّل الحدود في `PLANS` داخل `server.js`.

## حماية الإرسال
- الإرسال المباشر يتطلب أن يربط المستخدم Gmail بنفسه عبر شاشة موافقة Google (إذن الإرسال فقط، دون قراءة البريد).
- كل رسالة تمر بشاشة تأكيد تعرض المرسِل والمستلم والنص قبل الإرسال.
- رمز Google يُحفظ مشفّرًا (AES-256-GCM)، ويمكن فصل Gmail في أي وقت من صفحة الحساب.

## قاعدة البيانات
- **على Vercel:** PostgreSQL من Neon (مجاني) — يضبط Vercel `DATABASE_URL` تلقائيًا عند الربط.
- **محليًا:** إن لم يوجد `DATABASE_URL` يعمل Postgres مدمج (PGlite) في `data/pglite`.
- الجداول تُنشأ وتُحدَّث تلقائيًا عند التشغيل.

## النشر على Vercel
المستودع مربوط بـ Vercel، فكل `git push` إلى `main` يُنشر تلقائيًا.
المتغيرات في **Settings → Environment Variables**. `APP_URL` يُؤخذ تلقائيًا من Vercel؛ اضبطه فقط عند استخدام نطاق خاص.

## البنية
```
server.js          الخادم: الحسابات، المهام، الذكاء الاصطناعي، Gmail، الدفع، ملفات التقويم، الترجمة
lib/db.js          الاتصال بـ Postgres وإنشاء الجداول
public/index.html  هيكل الواجهة والأيقونات
public/styles.css  التصميم (جوال وحاسوب، عربي/إنجليزي، الوضع الليلي)
public/app.js      منطق الواجهة والترجمات
```
