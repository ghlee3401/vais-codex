/**
 * VAIS Code - Runtime event log
 * Records explicit CLI/runtime steps under .vais/runtime-log.jsonl.
 */
const fs = require('fs');
const path = require('path');

const RUNTIME_LOG_PATH = path.join(process.cwd(), '.vais', 'runtime-log.jsonl');
const MAX_LOG_LINES = 500;

/**
 * Record a runtime step.
 * @param {string} eventName - e.g. 'cli:bash-guard', 'role:start', 'phase:document'
 * @param {string} status - 'start' | 'ok' | 'error'
 * @param {object} [meta] - additional metadata
 */
function logRuntimeEvent(eventName, status, meta = {}) {
  try {
    const dir = path.dirname(RUNTIME_LOG_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const entry = JSON.stringify({
      ts: new Date().toISOString(),
      event: eventName,
      status,
      ...meta,
    });

    fs.appendFileSync(RUNTIME_LOG_PATH, entry + '\n', 'utf8');

    try {
      const content = fs.readFileSync(RUNTIME_LOG_PATH, 'utf8');
      const lines = content.split('\n').filter(Boolean);
      if (lines.length > MAX_LOG_LINES) {
        const trimmed = lines.slice(-250);
        fs.writeFileSync(RUNTIME_LOG_PATH, trimmed.join('\n') + '\n', 'utf8');
      }
    } catch {
      // Log trimming failure should not block the caller.
    }
  } catch {
    // Logging failure should not block the caller.
  }
}

module.exports = { logRuntimeEvent, RUNTIME_LOG_PATH };
