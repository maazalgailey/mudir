# مُدير | Mudir

موقع عربي (من اليمين لليسار) مصمَّم للجوال: قائمة مهام بتواريخ، تقويم، صياغة رسائل بالذكاء الاصطناعي (OpenAI)، إرسال بريد بعد إذن المستخدم، واشتراك مدفوع (Stripe).

## التشغيل

```bash
npm install
cp .env.example .env   # ثم املأ المفاتيح
npm start              # http://localhost:3000
```

أي تكامل بلا مفاتيح يعمل في **الوضع التجريبي**:
- OpenAI ← صياغة جاهزة وترتيب حسب الأولوية والتاريخ
- البريد ← تُسجَّل الرسالة في سجل الخادم ولا تُرسل
- Stripe ← زر "تجربة الاحترافي" للاختبار (يختفي عند NODE_ENV=production)

## ربط التكاملات

### 1. OpenAI
ضع `OPENAI_API_KEY` من platform.openai.com. يمكن تغيير النموذج عبر `OPENAI_MODEL`.

### 2. البريد (SMTP)
يعمل مع أي مزوّد. أمثلة:
| المزوّد | SMTP_HOST | ملاحظات |
|---|---|---|
| Gmail | smtp.gmail.com | فعّل التحقق بخطوتين وأنشئ "App password" |
| Outlook | smtp.office365.com | |
| Resend | smtp.resend.com | SMTP_USER=resend، SMTP_PASS=مفتاح API |
| SendGrid | smtp.sendgrid.net | SMTP_USER=apikey |

يُرسَل البريد من `MAIL_FROM` باسم "اسم المستخدم عبر مُدير"، والردود (Reply-To) تذهب لبريد المستخدم.
للإنتاج استخدم نطاقك الخاص مع إعداد SPF/DKIM لتجنّب مجلد الرسائل غير المرغوبة.

### 3. Stripe (الاشتراكات)
1. أنشئ منتجًا بسعر شهري متكرر في لوحة Stripe، وانسخ `price_...` إلى `STRIPE_PRICE_ID`.
2. ضع `STRIPE_SECRET_KEY` (ابدأ بمفتاح `sk_test_` للتجربة).
3. الـ Webhook:
   - محليًا: `stripe listen --forward-to localhost:3000/api/billing/webhook` وانسخ `whsec_...`
   - في الإنتاج: أضف نقطة `https://موقعك/api/billing/webhook` مع الأحداث:
     `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. فعّل Customer Portal من إعدادات Stripe ليتمكن المستخدم من الإلغاء وإدارة الفواتير.

## الباقات
| | مجاني | احترافي |
|---|---|---|
| المهام والتقويم | بلا حدود | بلا حدود |
| صياغات الذكاء الاصطناعي / شهر | 10 | 500 |
| رسائل البريد / شهر | 20 | 1000 |
| ترتيب الأولويات الذكي | — | ✓ |

عدّل الحدود في `PLANS` داخل `server.js`.

## حماية الإرسال
- لا يُرسل أي بريد إلا إذا منح المستخدم الإذن (يُحفظ مع وقت الموافقة)، **و** أكّد كل رسالة في شاشة المعاينة.
- الخادم يرفض الإرسال (403) دون الإذن حتى لو استُدعيت الواجهة البرمجية مباشرة.

## النشر على Render
الملف `render.yaml` يجهّز كل شيء تلقائيًا (خطة Starter مع قرص دائم 1GB في فرانكفورت):
1. سجّل في render.com باستخدام حساب GitHub.
2. Dashboard ← **New** ← **Blueprint** ← اختر المستودع `mudir`.
3. أدخل المفاتيح المطلوبة (أو اتركها فارغة لتعمل في الوضع التجريبي) ثم **Apply**.
4. بعد النشر: ضع رابط `https://…onrender.com/api/billing/webhook` في Stripe كنقطة Webhook.

كل `git push` إلى `main` يعيد النشر تلقائيًا. `JWT_SECRET` يُولَّد تلقائيًا، و`APP_URL` يُؤخذ من Render (اضبطه فقط عند استخدام نطاق خاص).

يعمل أيضًا على أي استضافة Node أخرى: اضبط `NODE_ENV=production` و`JWT_SECRET` و`APP_URL` و`DATA_DIR` (مسار قرص دائم).
البيانات تُحفظ في `db.json` — مناسب للبداية؛ انتقل إلى PostgreSQL عند زيادة المستخدمين.

## البنية
```
server.js          الخادم: الحسابات، المهام، الذكاء الاصطناعي، البريد، الدفع، ملفات التقويم
lib/db.js          قاعدة بيانات بسيطة بملف JSON
public/index.html  الواجهة (RTL)
public/styles.css  التصميم (للجوال أولًا + الوضع الليلي)
public/app.js      منطق الواجهة
```
