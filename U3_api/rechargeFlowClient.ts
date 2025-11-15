export type AppEvent = { type: string; payload: any }

export type NormalizedEvent =
  | { kind: 'payment'; status: 'SUCCESS' | 'FAILURE' | 'TIMEOUT'; orderId: string; data: any }
  | { kind: 'asset'; status: 'RECHARGE_SUCCESS' | 'FAILURE' | 'TIMEOUT'; orderId: string; data: any }

type Handler<T> = (e: T) => void

export class RechargeFlowClient {
  private ws?: WebSocket
  private anyListeners: Set<Handler<AppEvent>> = new Set()
  private normListeners: Set<Handler<NormalizedEvent>> = new Set()
  private typeListeners: Map<string, Set<Handler<AppEvent>>> = new Map()
  constructor(private opts: { wsUrl: string; apiUrl: string; token?: string }) {}
  connect() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) return
    this.ws = new WebSocket(this.opts.wsUrl)
    this.ws.onmessage = (ev) => {
      try {
        const obj = JSON.parse(String(ev.data)) as AppEvent
        this.anyListeners.forEach((h) => h(obj))
        const set = this.typeListeners.get(obj.type)
        if (set) set.forEach((h) => h(obj))
        const n = this.normalize(obj)
        if (n) this.normListeners.forEach((h) => h(n))
      } catch {}
    }
  }
  async startRecharge(selectedPackageId: string) {
    const r = await fetch(this.opts.apiUrl + '/recharge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.opts.token ? { Authorization: `Bearer ${this.opts.token}` } : {}),
      },
      body: JSON.stringify({ selectedPackageId }),
    })
    if (!r.ok && r.status !== 202) throw new Error('recharge api failed')
  }
  on(type: string, handler: Handler<AppEvent>) {
    if (type === '*') {
      this.anyListeners.add(handler)
      return () => this.anyListeners.delete(handler)
    }
    const set = this.typeListeners.get(type) ?? new Set()
    set.add(handler)
    this.typeListeners.set(type, set)
    return () => {
      const s = this.typeListeners.get(type)
      if (s) {
        s.delete(handler)
        if (s.size === 0) this.typeListeners.delete(type)
      }
    }
  }
  onNormalized(handler: Handler<NormalizedEvent>) {
    this.normListeners.add(handler)
    return () => this.normListeners.delete(handler)
  }
  close() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) this.ws.close()
    this.ws = undefined
  }
  private normalize(e: AppEvent): NormalizedEvent | null {
    if (e.type === 'evt:PXC1_901_1') return { kind: 'payment', status: 'SUCCESS', orderId: e.payload.orderId, data: e.payload }
    if (e.type === 'evt:PXC1_901_2') return { kind: 'payment', status: 'FAILURE', orderId: e.payload.orderId, data: e.payload }
    if (e.type === 'evt:PXC1_901_3') return { kind: 'payment', status: 'TIMEOUT', orderId: e.payload.orderId, data: e.payload }
    if (e.type === 'evt:PXC1_902_1') return { kind: 'asset', status: 'RECHARGE_SUCCESS', orderId: e.payload.orderId, data: e.payload }
    if (e.type === 'evt:PXC1_902_2') return { kind: 'asset', status: 'FAILURE', orderId: e.payload.orderId, data: e.payload }
    if (e.type === 'evt:PXC1_902_3') return { kind: 'asset', status: 'TIMEOUT', orderId: e.payload.orderId, data: e.payload }
    return null
  }
}

