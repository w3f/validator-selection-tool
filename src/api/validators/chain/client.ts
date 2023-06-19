import { createClient } from "@unstoppablejs/client"
import { WellKnownChain } from "@substrate/connect"
import { WsProvider } from "@unstoppablejs/ws-provider"
import { ScProvider } from "@unstoppablejs/sc-provider"
import { storageClient } from "@unstoppablejs/substrate-bindings"

const smProvider = ScProvider(WellKnownChain.polkadot, {
  forceEmbeddedNode: true,
})
export const client = createClient(smProvider)
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
