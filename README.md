# dsh-plugin-mcp-openpencil

把 OpenPencil（本地设计稿编辑器）挂载为 DSH 的 MCP server（Streamable HTTP）。挂载后 DSH 会话可通过 `mcp__openpencil__*` 工具创建/编辑 `.op` 设计稿。

## 原理

- OpenPencil 通过 MCP 协议暴露 JSON-RPC 接口，端点默认 `http://127.0.0.1:3100/mcp`。
- 本插件照 `@openviking/dsh-memory-plugin` 模板，用 `ctx.plugin(mcpClient, {transport, serverName, url, headers})` 挂载，工具注册为 `mcp__openpencil__*`。
- 注意 transport 用 `streamable-http`（dsh-mcp-client 的叫法，等价于其它 agent 配置里的 `type:"http"`）。

## 前置

OpenPencil 应用必须**正在运行**并监听该端点；本插件不负责启动它。

## 配置

| 字段 | 默认 | 说明 |
|---|---|---|
| `enabled` | `true` | 总开关 |
| `url` | `http://127.0.0.1:3100/mcp` | OpenPencil MCP 端点 |

## 部署

`node deploy.mjs`，重启 DSH 生效。

## 许可

MIT
