# Mudir — Audit and Roadmap

Status as of 3 November 2026. Covers the "Mudir — Product Development Master Brief".

## 1. Current stack

| Layer | Today |
|---|---|
| Hosting | Vercel (Express app as a serverless function, static files from `public/`) |
| Database | Neon Postgres via `DATABASE_URL`; embedded PGlite locally. Tables are created and migrated on start (`lib/db.js`) |
| Frontend | Single page, vanilla JS (`public/app.js`), Arabic/English, RTL/LTR, phone and laptop layouts |
| AI | OpenAI: `gpt-6-luna` for the assistant and drafts, `gpt-transcribe` for voice (falls back to `gpt-4o-transcribe`, `whisper-1`) |
| Email | Gmail API, send-only scope (`gmail.send`), per user, via Google OAuth. Refresh tokens AES-256-GCM encrypted at rest |
| Sign-in | Email + password (bcrypt), or Continue with Google (also connects Gmail) |
| Payments | Stripe Checkout and Customer Portal (built, keys not configured yet) |

## 2. What works today

- Calendar-first home: tasks and meetings per day, `.ics` export, Google Calendar "add" links.
- **Ask Mudir** (voice or text): multi-step requests, clarifying questions, general answers, Gulf dialect, Qatar time.
  - Prepares emails and meeting invitations for review; adds tasks directly.
  - **Memory:** recent conversation (follow-ups like "make it shorter") and lasting facts the user asks it to remember, visible and deletable in Settings.
- **Connections between Mudir accounts:** request, accept, remove. **Meetings** with connections: invitations appear on the other person's calendar with Accept/Decline, clash detection that shows other people's items only as "busy", organizer cancel.
- People and groups (contacts for email), list import, one-tap group email (each person gets their own copy).
- Voice: server transcription with auto-stop, name-spelling correction, speaking-language toggle; Siri via a Shortcut that opens `/?ask=…`.
- Safety: every email/meeting needs an explicit tap; one-time action keys block double sends; activity log (`audit_log`) for sends, meetings and connections; fair-use caps.

## 3. Known gaps and risks

| Area | Gap | Impact |
|---|---|---|
| Google | App is in **Testing** mode: only listed test users can sign in with Google | Blocks public launch |
| Google | Verification needs your **own domain** (not `vercel.app`) + privacy policy page | Required before public launch |
| Email | Only sending; no reading, replying in-thread, forwarding, attachments, signatures | Brief §2 mostly open |
| Calendar | Mudir's calendar is internal; no sync with Google/Outlook calendars | Brief §3 partly open |
| Scheduling | Reminders don't notify yet (no push/email notifications, no background jobs) | Reminders are passive |
| Automations | None yet | Brief §4 open |
| Roles | Single-user accounts; no teams/admins | Brief §7 open |
| Ops | No error reporting service; no automated tests in CI | Harder to catch regressions |
| Dates | Hijri dates are understood by the AI but not displayed | Minor |

## 4. Prioritized plan

**Phase 1 — launch readiness (next)**
1. Buy a domain, point it at Vercel, add privacy policy + terms pages.
2. Submit the Google app for verification (`gmail.send` is a *sensitive* scope: review takes days to weeks, no paid audit).
3. Configure Stripe keys and the webhook; test checkout end-to-end.
4. Add error reporting (e.g. Sentry) and a small automated test suite run on every push.

**Phase 2 — notifications and background jobs**
1. Vercel Cron job every few minutes: due reminders, meeting reminders, retrying failed sends.
2. Web push notifications (installable app) plus optional email digests.
3. Recurring tasks and reminders ("every Sunday at 9").

**Phase 3 — calendars**
1. Google Calendar two-way sync (`calendar.events` scope, sensitive): show external events, create/edit/cancel, conflict detection across both.
2. Outlook Calendar via Microsoft Graph (Azure app registration, `Calendars.ReadWrite`).
3. Hijri date display option.

**Phase 4 — inbox**
1. Microsoft Graph mail (`Mail.Read`, `Mail.Send`): read, categorise, unanswered detection, reply/forward, attachments. Microsoft's approval process is lighter than Google's.
2. Gmail reading (`gmail.readonly`/`gmail.modify`) is a **restricted** scope: needs an annual third-party security assessment (CASA), which costs time and money. Recommend doing Outlook first, or Gmail later once there are paying users.
3. Signatures, templates, email-to-task.

**Phase 5 — automations and teams**
1. Trigger → condition → action engine (e.g. "when a client emails with 'invoice', create a task and notify me"), created in plain language, with run history, retries, pause/edit/delete.
2. Organisations with roles (owner/admin/member), shared groups and team calendars.

## 5. Approvals the owner must do

| Item | Who | Notes |
|---|---|---|
| Domain + DNS | Owner | Any registrar; connect in Vercel → Domains |
| Google verification | Owner | Google Cloud → Google Auth Platform → Verification Center |
| Microsoft Graph | Owner | Azure portal → App registrations (needed for Outlook) |
| Stripe | Owner | Keys and webhook in Vercel environment variables |
