import { createClient, ProviderStatus } from "@unstoppablejs/client"
import { WsProvider } from "@unstoppablejs/ws-provider"
import { storageClient } from "@unstoppablejs/substrate-bindings"

let onMessagePort: (port: MessagePort) => void
const smPortPromise: Promise<MessagePort> = new Promise((res) => {
  onMessagePort = res
})

export const setSmPort = (smPort: MessagePort) => {
  onMessagePort(smPort)
}

export const client = createClient((onMessage, onStatus) => {
  let port: MessagePort | null = null

  const onPortMessage = (e: MessageEvent) => {
    onMessage(e.data)
  }

  const onHalt = () => {
    onStatus(ProviderStatus.halt)
  }

  const open = () => {
    smPortPromise
      .then((_port) => {
        if (!(_port instanceof MessagePort)) throw null

        port = _port
        port.onmessage = onPortMessage
        self.addEventListener("message", onHalt, {
          once: true,
        })
        onStatus(ProviderStatus.ready)
      })
      .catch(() => {
        onStatus(ProviderStatus.halt)
      })
  }

  const close = () => {
    self.removeEventListener("message", onHalt)
    port?.removeEventListener("message", onPortMessage)
    port = null
  }

  const send = (msg: string) => {
    port?.postMessage(msg)
  }

  return { open, close, send }
})
client.connect()

export const { getFromStorage } = storageClient(client)

// We only use the WsProvider for iterating over the keys
// of Stake.Nominators. We can't use smoldot for doing
// that until the following issue gets solved:
// https://github.com/smol-dot/smoldot/issues/692
const wsProvider = WsProvider("wss://rpc.polkadot.io")
const wsClient = createClient(wsProvider)
wsClient.connect()
export const { getKeys } = storageClient(wsClient)
