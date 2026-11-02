// Minimal JSON-file database. Fine for a single server; swap for Postgres/SQLite when scaling.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// On hosting, point DATA_DIR at a persistent disk (e.g. /var/data on Render).
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

const empty = { users: [], tasks: [], emails: [] };

function load() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DB_FILE)) return structuredClone(empty);
  try {
    return { ...structuredClone(empty), ...JSON.parse(fs.readFileSync(DB_FILE, 'utf8')) };
  } catch (err) {
    console.error('Could not read db.json, starting empty:', err.message);
    return structuredClone(empty);
  }
}

const data = load();

let saveTimer = null;
function writeNow() {
  clearTimeout(saveTimer);
  saveTimer = null;
  const tmp = DB_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, DB_FILE);
}

function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(writeNow, 50);
}

// Hosts stop the server with SIGTERM on every deploy; flush any pending write first.
for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => {
    if (saveTimer) writeNow();
    process.exit(0);
  });
}

function id() {
  return crypto.randomUUID();
}

// Persistent dev secret so sessions survive restarts when JWT_SECRET is unset.
function devSecret() {
  const file = path.join(DATA_DIR, '.dev-secret');
  if (fs.existsSync(file)) return fs.readFileSync(file, 'utf8');
  const secret = crypto.randomBytes(48).toString('hex');
  fs.writeFileSync(file, secret);
  return secret;
}

module.exports = { data, save, id, devSecret };
