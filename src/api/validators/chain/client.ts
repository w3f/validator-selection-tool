import { createClient } from "polkadot-api"
import { getSmProvider } from "polkadot-api/sm-provider"
import { chainSpec as chainSpecRelay } from "polkadot-api/chains/polkadot"
import { chainSpec as chainSpecPpl } from "polkadot-api/chains/polkadot_people"
import { startFromWorker } from "polkadot-api/smoldot/from-worker"

// @ts-ignore-next-line
import SmWorker from "polkadot-api/smoldot/worker?worker"
import { dot, dotPpl } from "@polkadot-api/descriptors"
const worker = new SmWorker()

const smoldot = startFromWorker(worker, { forbidWs: true })
const chain = smoldot.addChain({ chainSpec: chainSpecRelay })

const dotClient = createClient(getSmProvider(chain))
export const dotApi = dotClient.getTypedApi(dot)

const pplClient = createClient(
  getSmProvider(
    chain.then((relay) =>
      smoldot.addChain({
        chainSpec: chainSpecPpl,
        potentialRelayChains: [relay],
      }),
    ),
  ),
)
export const pplApi = pplClient.getTypedApi(dotPpl)
