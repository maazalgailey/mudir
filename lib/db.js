// Postgres storage. On Vercel, DATABASE_URL comes from the Neon integration.
// Locally without DATABASE_URL, an embedded Postgres (PGlite) keeps data in ./data/pglite.
const path = require('path');
const crypto = require('crypto');

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    plan TEXT NOT NULL DEFAULT 'free',
    email_consent BOOLEAN NOT NULL DEFAULT false,
    email_consent_at TIMESTAMPTZ,
    stripe_customer_id TEXT,
    subscription_id TEXT,
    usage_month TEXT,
    usage_ai INT NOT NULL DEFAULT 0,
    usage_emails INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
  `CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    notes TEXT NOT NULL DEFAULT '',
    date TEXT NOT NULL DEFAULT '',
    time TEXT NOT NULL DEFAULT '',
    priority TEXT NOT NULL DEFAULT 'medium',
    done BOOLEAN NOT NULL DEFAULT false,
    contact_name TEXT NOT NULL DEFAULT '',
    contact_email TEXT NOT NULL DEFAULT '',
    draft JSONB,
    last_email_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
  )`,
  `CREATE INDEX IF NOT EXISTS tasks_user_idx ON tasks (user_id)`,
  `CREATE TABLE IF NOT EXISTS emails (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    task_id TEXT,
    to_addr TEXT NOT NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    status TEXT NOT NULL,
    sent_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
  `CREATE INDEX IF NOT EXISTS emails_user_idx ON emails (user_id, sent_at DESC)`,
  `CREATE TABLE IF NOT EXISTS app_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  )`,
  // Gmail connection: the address and an encrypted refresh token with send-only scope.
  `ALTER TABLE users ADD COLUMN IF NOT EXISTS google_email TEXT`,
  `ALTER TABLE users ADD COLUMN IF NOT EXISTS google_refresh_token TEXT`,
  // Board status (todo / doing / done); `done` stays in sync for filters and calendar export.
  `ALTER TABLE tasks ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'todo'`,
  `UPDATE tasks SET status = 'done' WHERE done AND status <> 'done'`,
  // Saved people, optionally grouped (e.g. "Employees"), for the assistant to email.
  `CREATE TABLE IF NOT EXISTS contacts (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    group_name TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
  `CREATE INDEX IF NOT EXISTS contacts_user_idx ON contacts (user_id)`,
  // Links between Mudir accounts (pending until the other person accepts).
  `CREATE TABLE IF NOT EXISTS connections (
    id TEXT PRIMARY KEY,
    requester_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    addressee_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (requester_id, addressee_id)
  )`,
  `CREATE INDEX IF NOT EXISTS connections_addressee_idx ON connections (addressee_id)`,
  // Meetings between connected accounts; each attendee answers on their own calendar.
  `CREATE TABLE IF NOT EXISTS meetings (
    id TEXT PRIMARY KEY,
    organizer_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    notes TEXT NOT NULL DEFAULT '',
    date TEXT NOT NULL,
    time TEXT NOT NULL DEFAULT '',
    duration_min INT NOT NULL DEFAULT 30,
    location TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
  `CREATE INDEX IF NOT EXISTS meetings_organizer_idx ON meetings (organizer_id, date)`,
  `CREATE TABLE IF NOT EXISTS meeting_attendees (
    meeting_id TEXT NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    response TEXT NOT NULL DEFAULT 'pending',
    PRIMARY KEY (meeting_id, user_id)
  )`,
  `CREATE INDEX IF NOT EXISTS meeting_attendees_user_idx ON meeting_attendees (user_id)`,
  // Assistant memory: lasting facts the user asked Mudir to remember, and the recent conversation.
  `CREATE TABLE IF NOT EXISTS memories (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
  `CREATE INDEX IF NOT EXISTS memories_user_idx ON memories (user_id)`,
  `CREATE TABLE IF NOT EXISTS assistant_messages (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
  )`,
  `CREATE INDEX IF NOT EXISTS assistant_messages_user_idx ON assistant_messages (user_id, created_at DESC)`,
  // One-time keys so a double tap or retry can never send the same email or invite twice.
  `CREATE TABLE IF NOT EXISTS action_keys (
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    key TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, key)
  )`,
  `CREATE TABLE IF NOT EXISTS audit_log (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    detail JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
  `CREATE INDEX IF NOT EXISTS audit_log_user_idx ON audit_log (user_id, created_at DESC)`,
];

let ready = null;

function connect() {
  if (!ready) {
    ready = (async () => {
      const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
      let run;
      if (url) {
        const { Pool } = require('pg');
        const pool = new Pool({ connectionString: url, max: 3 });
        run = (text, params) => pool.query(text, params);
      } else if (process.env.VERCEL) {
        throw new Error('DATABASE_URL is missing: connect a Neon database in Vercel → Storage, then redeploy.');
      } else {
        const { PGlite } = await import('@electric-sql/pglite');
        const db = new PGlite(process.env.DATA_DIR || path.join(__dirname, '..', 'data', 'pglite'));
        run = (text, params) => db.query(text, params);
      }
      for (const stmt of SCHEMA) {
        try {
          await run(stmt);
        } catch (err) {
          // Two cold starts creating the same table at once; the other one won.
          if (!['23505', '42P07'].includes(err.code)) throw err;
        }
      }
      return run;
    })().catch((err) => {
      ready = null;
      throw err;
    });
  }
  return ready;
}

async function query(text, params = []) {
  const run = await connect();
  return (await run(text, params)).rows;
}

async function one(text, params) {
  return (await query(text, params))[0] || null;
}

function id() {
  return crypto.randomUUID();
}

module.exports = { query, one, id };
