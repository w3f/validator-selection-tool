import { run } from "smoldot/dist/mjs/worker-browser"
import { compileBytecode } from "smoldot/dist/mjs/bytecode-browser"

compileBytecode().then(postMessage)

self.addEventListener(
  "message",
  (msg) => {
    run(msg.data)
  },
  {
    once: true,
  },
)
