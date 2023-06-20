import * as smoldot from "smoldot/dist/mjs/worker-browser"
import { compileBytecode } from "smoldot/dist/mjs/bytecode-browser"

compileBytecode().then(postMessage)

self.addEventListener(
  "message",
  (msg) => {
    smoldot.run(msg.data)
  },
  {
    once: true,
  },
)
