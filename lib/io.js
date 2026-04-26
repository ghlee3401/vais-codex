/**
 * VAIS Code - I/O Utilities
 * Codex-facing CLI stdin/stdout helpers.
 */
const fs = require('fs');

const MAX_CONTEXT_LENGTH = 8000;

/**
 * stdin에서 JSON 읽기 (동기)
 */
function readStdin() {
  let raw;
  try {
    raw = fs.readFileSync(process.stdin.fd, 'utf8').trim();
  } catch (e) {
    // stdin 접근 불가 (비대화형 환경 등)
    return {};
  }
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch (e) {
    // JSON 파싱 실패 — 입력 형식 오류
    process.stderr.write(`[VAIS IO] Invalid JSON on stdin: ${e.message}\n`);
    return {};
  }
}

/**
 * Parse a runtime input payload from stdin.
 */
function parseRuntimeInput(input) {
  const toolInput = input?.tool_input || input?.input || {};
  return {
    command: toolInput.command || '',
    filePath: toolInput.file_path || '',
    content: toolInput.content || '',
    skill: toolInput.skill || '',
    args: toolInput.args || '',
    raw: toolInput,
  };
}

/**
 * 허용 응답 출력 (additionalContext 포함 가능)
 */
function outputAllow(additionalContext) {
  const response = {};
  if (additionalContext) {
    response.additionalContext = additionalContext;
  }
  console.log(JSON.stringify(response));
}

/**
 * Print a blocked runtime decision.
 */
function outputBlock(reason) {
  console.log(JSON.stringify({
    decision: 'block',
    reason,
  }));
}

/**
 * 빈 응답 (패스스루)
 */
function outputEmpty() {
  console.log(JSON.stringify({}));
}

/**
 * 컨텍스트 길이 제한
 */
function truncate(text, maxLen) {
  if (!text) return '';
  if (text.length <= (maxLen || MAX_CONTEXT_LENGTH)) return text;
  return text.substring(0, maxLen || MAX_CONTEXT_LENGTH) + '\n... (truncated)';
}

module.exports = {
  readStdin,
  parseRuntimeInput,
  outputAllow,
  outputBlock,
  outputEmpty,
  truncate,
  MAX_CONTEXT_LENGTH,
};
