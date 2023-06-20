import { startWithBytecode } from "smoldot/dist/mjs/no-auto-bytecode-browser"
import type { ValidatorData } from "../types"
// @ts-ignore
import SmWorker from "./sm-worker?worker"
// @ts-ignore
import ValidatorsWorker from "./validators-worker?worker"

const smWorker: Worker = SmWorker()
const smoldotRawChannel = new MessageChannel()
smWorker.postMessage(smoldotRawChannel.port1, [smoldotRawChannel.port1])

const validatorsWorker: Worker = ValidatorsWorker()

const chainSpecPromise = import("./polkadot-spec").then((x) => x.default)

const bytecodePromise = new Promise((resolve) => {
  smWorker.addEventListener("message", (e) => {
    resolve(e.data)
  }),
    {
      once: true,
    }
})

;(async () => {
  const bytecode: any = await bytecodePromise
  const client = startWithBytecode({
    bytecode,
    portToWorker: smoldotRawChannel.port2,
  })

  const chainSpec = await chainSpecPromise
  const chain = await client.addChain({
    chainSpec,
  })

  const validatorsChannel = new MessageChannel()
  validatorsChannel.port2.onmessage = (e) => {
    chain.sendJsonRpc(e.data)
  }
  validatorsWorker.postMessage(validatorsChannel.port1, [
    validatorsChannel.port1,
  ])
  try {
    while (true)
      validatorsChannel.port2.postMessage(await chain.nextJsonRpcResponse())
  } catch (e) {
    console.error(e)
    validatorsWorker.postMessage(e)
  }
})()

export const validators = new Promise<Record<string, ValidatorData>>(
  (res, rej) => {
    validatorsWorker.addEventListener(
      "message",
      (e) => {
        if (e.data?.type === "result") {
          console.trace("validators loaded")
          res(e.data.payload)
        } else rej(e.data?.payload ?? e.data)
      },
      { once: true },
    )
  },
)
