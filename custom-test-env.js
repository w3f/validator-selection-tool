import { TestEnvironment } from "jest-environment-jsdom"
import { TextEncoder as OTextEncoder, TextDecoder } from "util"

export default class CustomTestEnvironment extends TestEnvironment {
  async setup() {
    await super.setup()
    if (typeof this.global.TextEncoder === "undefined") {
      const thatGlobal = this.global
      this.global.TextEncoder = class TextEncoder {
        constructor() {}
        encode(value) {
          const encoder = new OTextEncoder()
          return new thatGlobal.Uint8Array(encoder.encode(value))
        }
      }
      this.global.TextDecoder = TextDecoder
    }
  }
}
