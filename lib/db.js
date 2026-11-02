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
