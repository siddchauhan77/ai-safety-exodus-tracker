/**
 * Unit tests for scripts/validate.js
 * Tests each validation rule with a deliberately broken entry.
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const VALIDATE_SCRIPT = path.resolve(__dirname, '../scripts/validate.js');

function runValidateOn(data) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'departure-test-'));
  const tmpDataDir = path.join(tmpDir, 'data');
  const tmpScriptsDir = path.join(tmpDir, 'scripts');
  fs.mkdirSync(tmpDataDir);
  fs.mkdirSync(tmpScriptsDir);
  fs.writeFileSync(path.join(tmpDataDir, 'departures.json'), JSON.stringify(data));
  // Patch the script's DATA_PATH by copying and rewriting __dirname reference
  let scriptContent = fs.readFileSync(VALIDATE_SCRIPT, 'utf8');
  scriptContent = scriptContent.replace(
    "path.resolve(__dirname, '../data/departures.json')",
    `path.resolve(${JSON.stringify(tmpDir)}, 'data/departures.json')`
  );
  const tmpScript = path.join(tmpScriptsDir, 'validate.js');
  fs.writeFileSync(tmpScript, scriptContent);

  try {
    execSync(`node ${tmpScript}`, { stdio: 'pipe' });
    return { exitCode: 0 };
  } catch (e) {
    return { exitCode: e.status, stderr: e.stderr?.toString() ?? '' };
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

const VALID_ENTRY = {
  id: 'test-person-openai-2024',
  name: 'Test Person',
  role: 'Safety Researcher',
  company: 'OpenAI',
  departure_date: 'May 2024',
  departure_date_sortable: '2024-05',
  source_url: 'https://example.com/source',
  verified: true,
};

describe('validate.js — validation rules', () => {
  it('passes with a valid entry', () => {
    const result = runValidateOn([VALID_ENTRY]);
    expect(result.exitCode).toBe(0);
  });

  it('fails when a required field is missing', () => {
    const bad = { ...VALID_ENTRY };
    delete bad.name;
    const result = runValidateOn([bad]);
    expect(result.exitCode).toBe(1);
    expect(result.stderr).toMatch(/name/);
  });

  it('fails when verified is a string instead of boolean', () => {
    const bad = { ...VALID_ENTRY, verified: 'true' };
    const result = runValidateOn([bad]);
    expect(result.exitCode).toBe(1);
    expect(result.stderr).toMatch(/verified/);
  });

  it('fails when source_url does not start with https://', () => {
    const bad = { ...VALID_ENTRY, source_url: 'http://example.com/source' };
    const result = runValidateOn([bad]);
    expect(result.exitCode).toBe(1);
    expect(result.stderr).toMatch(/source_url/);
  });

  it('fails when company is not one of the allowed enum values', () => {
    const bad = { ...VALID_ENTRY, company: 'Meta' };
    const result = runValidateOn([bad]);
    expect(result.exitCode).toBe(1);
    expect(result.stderr).toMatch(/company/);
  });

  it('fails when two entries share the same id', () => {
    const duplicate = [VALID_ENTRY, { ...VALID_ENTRY, name: 'Another Person' }];
    const result = runValidateOn(duplicate);
    expect(result.exitCode).toBe(1);
    expect(result.stderr).toMatch(/Duplicate/);
  });

  it('passes (does not fail) when an entry has verified: false', () => {
    const withUnverified = [VALID_ENTRY, { ...VALID_ENTRY, id: 'other-entry', verified: false }];
    const result = runValidateOn(withUnverified);
    expect(result.exitCode).toBe(0);
  });
});
