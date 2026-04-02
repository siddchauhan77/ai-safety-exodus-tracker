#!/usr/bin/env node
/**
 * scripts/validate.js
 * Pre-build validation for data/departures.json.
 * Run automatically before `next build` via the prebuild npm script.
 * Exits with code 1 on any violation — aborting the build.
 */

const path = require('path');
const fs = require('fs');

const DATA_PATH = path.resolve(__dirname, '../data/departures.json');
const ALLOWED_COMPANIES = ['OpenAI', 'Anthropic', 'Google DeepMind', 'Other'];
const REQUIRED_FIELDS = ['id', 'name', 'role', 'company', 'departure_date', 'departure_date_sortable', 'source_url', 'verified'];

function fail(message) {
  console.error(`\n❌ VALIDATION FAILED: ${message}\n`);
  process.exit(1);
}

function validate() {
  if (!fs.existsSync(DATA_PATH)) {
    fail(`data/departures.json not found at ${DATA_PATH}`);
  }

  let departures;
  try {
    departures = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  } catch (e) {
    fail(`data/departures.json is not valid JSON: ${e.message}`);
  }

  if (!Array.isArray(departures)) {
    fail('data/departures.json must be a JSON array');
  }

  const seenIds = new Set();

  for (const entry of departures) {
    const label = entry.id ? `entry "${entry.id}"` : `entry with name "${entry.name || '(unknown)'}"`;

    // 1. Required fields present and non-empty
    for (const field of REQUIRED_FIELDS) {
      if (!(field in entry)) {
        fail(`${label} is missing required field: "${field}"`);
      }
      // verified is boolean — separate check below. Other required fields must be non-empty strings.
      if (field !== 'verified' && (typeof entry[field] !== 'string' || entry[field].trim() === '')) {
        fail(`${label} has empty or non-string value for required field: "${field}"`);
      }
    }

    // 2. verified must be strictly boolean
    if (typeof entry.verified !== 'boolean') {
      fail(`${label}: "verified" must be a boolean (true or false), got ${JSON.stringify(entry.verified)}`);
    }

    // 3. source_url must start with https://
    if (!/^https:\/\//.test(entry.source_url)) {
      fail(`${label}: "source_url" must begin with https://, got "${entry.source_url}"`);
    }

    // 4. company must be one of the allowed enum values
    if (!ALLOWED_COMPANIES.includes(entry.company)) {
      fail(`${label}: "company" must be one of ${JSON.stringify(ALLOWED_COMPANIES)}, got "${entry.company}"`);
    }

    // 5. No duplicate ids
    if (seenIds.has(entry.id)) {
      fail(`Duplicate "id" found: "${entry.id}"`);
    }
    seenIds.add(entry.id);
  }

  const verifiedCount = departures.filter(d => d.verified === true).length;
  const excludedCount = departures.filter(d => d.verified === false).length;

  console.log(`✅ Validation passed — ${departures.length} entries (${verifiedCount} verified, ${excludedCount} excluded)`);
}

validate();
