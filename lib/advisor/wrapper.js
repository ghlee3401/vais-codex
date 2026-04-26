/**
 * VAIS Code - Advisor Tool Wrapper
 * @module lib/advisor/wrapper
 *
 * Codex port: advisor calls degrade to a no-op until plugins have a stable
 * model-call interface. The wrapper keeps the old API so existing gate and
 * observability code can continue to run.
 */

const path = require('path');
const costMonitor = require('../control/cost-monitor');
const { EventLogger, EVENT_TYPES } = require('../observability');

function loadConfig() {
  try {
    return require('../../lib/paths').loadConfig();
  } catch (_) {
    return {};
  }
}

function resolveLogPath() {
  const cfg = loadConfig();
  const rel = cfg?.observability?.eventLog || '.vais/event-log.jsonl';
  return path.resolve(process.cwd(), rel);
}

function emitEvent(eventType, payload) {
  try {
    new EventLogger(resolveLogPath()).log(eventType, payload);
  } catch (_) {
    // Observability failure must not block workflow execution.
  }
}

async function callAdvisor(opts = {}) {
  const {
    subAgent = 'unknown',
    cLevel = 'unknown',
    trigger = 'unknown',
    sessionId = 'unknown',
  } = opts;

  const nullResult = (status, degraded = false) => ({
    advice: null,
    tokens: { input: 0, output: 0, cached: 0 },
    cost: 0,
    degraded,
    status,
  });

  try {
    const budget = await costMonitor.checkBudget(sessionId);
    if (!budget.allowed) {
      const cfg = loadConfig();
      const monthlyCap = cfg?.advisor?.monthly_budget_usd || 200;
      emitEvent(EVENT_TYPES.ADVISOR_BUDGET_BLOCK, {
        timestamp: new Date().toISOString(),
        session_id: sessionId,
        sub_agent: subAgent,
        total_spent: 0,
        cap: monthlyCap,
        remaining: 0,
      });
      return nullResult('budget_block', true);
    }
  } catch (_) {
    // Budget monitor is best-effort in the Codex port.
  }

  emitEvent(EVENT_TYPES.ADVISOR_CALL, {
    timestamp: new Date().toISOString(),
    session_id: sessionId,
    sub_agent: subAgent,
    c_level: cLevel,
    trigger,
    tokens_in: 0,
    tokens_out: 0,
    cached_tokens: 0,
    cost: 0,
    status: 'unavailable',
  });

  return nullResult('unavailable', true);
}

module.exports = { callAdvisor };
