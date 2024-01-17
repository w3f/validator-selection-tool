import { createClient } from "@polkadot-api/client"
import { getLegacyProvider } from "@polkadot-api/legacy-polkadot-provider"
import { createScClient, WellKnownChain } from "@substrate/connect"
// @ts-ignore
import ScWorker from "./substrate-worker?worker"
import dot from "./descriptors/dot"
import roc from "./descriptors/roc"

const provider = getLegacyProvider(
  createScClient({
    embeddedNodeConfig: {
      workerFactory: ScWorker,
    },
  }),
)

const chain = provider.relayChains[WellKnownChain.polkadot]
export const client = createClient(chain.connect, { dot, roc })
