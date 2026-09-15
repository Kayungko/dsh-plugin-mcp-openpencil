/**
 * Configuration resolution for dsh-plugin-mcp-openpencil.
 * Pure module: no harness imports, fully unit-testable.
 */

export const DEFAULTS = Object.freeze({
  /** Master switch. When false the plugin mounts nothing. */
  enabled: true,
  /** OpenPencil MCP endpoint (Streamable HTTP). */
  url: 'http://127.0.0.1:3100/mcp',
});

/**
 * Merge user config over defaults, rejecting wrong types instead of guessing.
 * @param {unknown} input raw plugin config (usually an object from cordis.yml)
 * @returns {typeof DEFAULTS}
 */
export function resolveConfig(input = {}) {
  const source = input && typeof input === 'object' && !Array.isArray(input) ? input : {};
  const config = { ...DEFAULTS };
  if (source.enabled !== undefined) {
    if (typeof source.enabled !== 'boolean') throw new TypeError('mcp-openpencil config "enabled" must be boolean');
    config.enabled = source.enabled;
  }
  if (source.url !== undefined) {
    if (typeof source.url !== 'string' || source.url.trim().length === 0) {
      throw new TypeError('mcp-openpencil config "url" must be a non-empty string');
    }
    config.url = source.url.trim();
  }
  return config;
}
