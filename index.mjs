/**
 * dsh-plugin-mcp-openpencil — mount OpenPencil as a DSH MCP server.
 *
 * OpenPencil (local design editor) exposes a Streamable-HTTP MCP endpoint.
 * This plugin mounts @deepseek-ai/dsh-mcp-client against it, so its tools
 * register as mcp__openpencil__*.
 *
 * transport: "streamable-http" (dsh-mcp-client's name for what other agents
 * call type:"http"). Requires the OpenPencil app to be running and serving the
 * endpoint; the plugin does not start it.
 */

import * as mcpClient from '@deepseek-ai/dsh-mcp-client';
import { resolveConfig } from './config.mjs';

export const name = 'mcp-openpencil';
export const inject = [];

export function apply(ctx, input = {}) {
  const config = resolveConfig(input);
  if (!config.enabled) {
    ctx.logger?.info?.('mcp-openpencil: disabled by config; nothing mounted');
    return;
  }
  try {
    ctx.plugin(mcpClient, {
      transport: 'streamable-http',
      serverName: 'openpencil',
      url: config.url,
      headers: {},
    });
    ctx.logger?.info?.(`mcp-openpencil: mounted openpencil MCP (${config.url})`);
  } catch (error) {
    ctx.logger?.warn?.(`mcp-openpencil: mount failed (${error?.message ?? error})`);
  }
}
