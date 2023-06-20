import { getValidators } from "./getValidators"

self.addEventListener(
  "message",
  (msg) => {
    if (msg.data) {
      getValidators(msg.data)
    } else {
      console.error("Did not receive smoldot port")
    }
  },
  {
    once: true,
  },
)
