import { get_encoding, init as initTt } from 'tiktoken/init'
import initWasm from 'tiktoken/tiktoken_bg.wasm?init'

export type InMessageData
  = | { action: 'init' }
    | { action: 'count', text: string, reqId: string }

export type InMsg<TAction extends InMessageData['action']> = Extract<InMessageData, { action: TAction }>

export type OutMessageData
  = | { event: 'count-result', count: number, reqId: string }
    | { event: 'error', detail: unknown }

let ready = false

globalThis.self.onmessage = (e: MessageEvent<InMessageData>) => {
  if (e.data.action === 'init') {
    actionInit()
  }
  else {
    if (ready) {
      switch (e.data.action) {
        case 'count':
          actionCount(e.data)
          break
        default:
          console.error(`Unkonwn action: ${e.data satisfies never}`)
      }
    }
    else {
      send({ event: 'error', detail: 'not ready yet' })
    }
  }
}

let initializing = false
function actionInit() {
  if (initializing)
    return
  initTt(imports => initWasm(imports))
    .then(() => {
      ready = true
    })
  initializing = true
}

function actionCount({ text, reqId }: InMsg<'count'>) {
  const encoding = get_encoding('cl100k_base')
  const tokens = encoding.encode(text)
  encoding.free()
  send({ event: 'count-result', count: tokens.length, reqId })
}

function send(data: OutMessageData) {
  postMessage(data)
}
