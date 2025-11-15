// Minimal Panel Aggregator: HTTP + WebSocket broadcast
// Port: 8099
// Endpoints:
// - POST /panel/events       { ...event }
// - POST /panel/events/batch { events: [ ... ] }
// - GET  /panel/health
// - WS   /panel/ws           broadcasts incoming events to subscribers

const http = require('http')
const { WebSocketServer } = require('ws')
const url = require('url')

const PORT = process.env.PANEL_PORT ? Number(process.env.PANEL_PORT) : 8099

const wss = new WebSocketServer({ noServer: true })
const wsClients = new Set()

function broadcast(obj) {
  const data = JSON.stringify(obj)
  for (const ws of wsClients) {
    try { ws.send(data) } catch {}
  }
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => { body += chunk })
    req.on('end', () => {
      try { resolve(JSON.parse(body || '{}')) } catch (e) { reject(e) }
    })
    req.on('error', reject)
  })
}

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url || '', true)
  const pathname = parsed.pathname || ''

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return }

  if (req.method === 'GET' && pathname === '/panel/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: true }))
    return
  }

  if (req.method === 'POST' && pathname === '/panel/events') {
    try {
      const evt = await readJson(req)
      // Normalize minimal shape
      const norm = {
        source: evt.source || 'unknown',
        type: evt.type || 'unknown',
        payload: {
          nodeId: evt.nodeId,
          prevId: evt.prevId,
          status: evt.status || 'OK',
          orderId: evt.orderId,
          message: evt.message,
          extra: evt.extra || {},
        },
        ts: evt.ts || Date.now(),
      }
      broadcast(norm)
      res.writeHead(202, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ accepted: true }))
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: String(e.message || e) }))
    }
    return
  }

  if (req.method === 'POST' && pathname === '/panel/events/batch') {
    try {
      const body = await readJson(req)
      const list = Array.isArray(body.events) ? body.events : []
      for (const evt of list) {
        const norm = {
          source: evt.source || 'unknown',
          type: evt.type || 'unknown',
          payload: {
            nodeId: evt.nodeId,
            prevId: evt.prevId,
            status: evt.status || 'OK',
            orderId: evt.orderId,
            message: evt.message,
            extra: evt.extra || {},
          },
          ts: evt.ts || Date.now(),
        }
        broadcast(norm)
      }
      res.writeHead(202, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ accepted: list.length }))
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: String(e.message || e) }))
    }
    return
  }

  if (req.method === 'POST' && pathname === '/panel/play') {
    try {
      const body = await readJson(req)
      const kind = String(body.kind || 'success')
      const delayMs = Number(body.delayMs || 800)
      const seq = kind === 'error' ? ERROR_SEQ : SUCCESS_SEQ
      playSequence(seq, delayMs)
      res.writeHead(202, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ accepted: true, steps: seq.length }))
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: String(e.message || e) }))
    }
    return
  }

  // Fallback
  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'Not Found' }))
})

server.on('upgrade', (req, socket, head) => {
  const pathname = url.parse(req.url || '').pathname || ''
  if (pathname === '/panel/ws') {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wsClients.add(ws)
      ws.on('close', () => wsClients.delete(ws))
    })
  } else {
    socket.destroy()
  }
})

server.listen(PORT, () => {
  console.log(`[panel-aggregator] listening on http://localhost:${PORT} (WS at /panel/ws)`) 
})

const SUCCESS_SEQ = [
  'FE_TRIGGER_UI','FE_TRIGGER_SLOT','E01','FE_State_Idle','FE_State_Requesting','E04','FE_STORE_UF','E05','E07','FE_TSDSV','E20','FE_STORE_UI','E10','FE_APIClient','HTTP_Action_Req','BE_APIGateway','BD_Receiving','BD_Verifying','QRY3301','InternalEventBus','DA_RiskFsm','S1','S2','CMD3302_A','InternalEventBus','DA0_RiskEventAccessor','InternalEventBus','EVT3302_B','S2','CMD3302_C','InternalEventBus','DC_RiskCalculator','L_RiskRules','InternalEventBus','EVT3303','S3','CMD3304','InternalEventBus','DA0_RiskActionTransaction','Repo_IF_RiskEvents','Repo_IMPL_RiskEvents','DB_RiskEvents_MySQL','Repo_IF_UserFlags','Repo_IMPL_UserFlags','DB_UserFlags_MySQL','DB_Outbox','InternalEventBus','EVT3305','S4','DOC3306','Adapter_EventBus','BD_Decision','BD_Creating','DSV_AuthService','DB_Auth','DB_Outbox','HTTP_Res_OK','FE_APIClient','FE_Decision','FE_State_Allowed','E17','FE_CACHE_L','E18','E04','E07','FE_TSDSV','FE_CACHE_L','FE_STORE_UI'
]

const ERROR_SEQ = [
  'FE_TRIGGER_UI','FE_TRIGGER_SLOT','E01','FE_State_Idle','FE_State_Requesting','E04','FE_STORE_UF','E05','E07','FE_TSDSV','E20','FE_STORE_UI','E10','FE_APIClient','HTTP_Action_Req','BE_APIGateway','BD_Receiving','BD_Verifying','QRY3301','InternalEventBus','DA_RiskFsm','S1','S2','CMD3302_A','InternalEventBus','DA0_RiskEventAccessor','InternalEventBus','EVT3302_B','S2','CMD3302_C','InternalEventBus','DC_RiskCalculator','L_RiskRules','InternalEventBus','EVT3303','S3','CMD3304','InternalEventBus','DA0_RiskActionTransaction','InternalEventBus','FAIL3401','SF','Adapter_EventBus','BD_Decision','BD_Failing','DSV_AuthService','DB_RiskEvents_MySQL','HTTP_Res_Blocked','FE_APIClient','FE_Decision','FE_State_Blocked','E04','E07','FE_TSDSV','FE_STORE_UI'
]

function playSequence(seq, delayMs) {
  let i = 0
  const tick = () => {
    if (i >= seq.length) return
    const nodeId = seq[i]
    const prevId = i > 0 ? seq[i-1] : undefined
    const status = /FAIL|ERROR|TIMEOUT/i.test(nodeId) ? 'FAILURE' : 'OK'
    broadcast({ source:'play', type:'play:step', payload:{ nodeId, prevId, status }, ts: Date.now() })
    i++
    if (i < seq.length) setTimeout(tick, delayMs)
  }
  setTimeout(tick, delayMs)
}