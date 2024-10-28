import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "polkadot-theme/global.css"
import "polkadot-theme/light.css"
import "polkadot-theme/dark.css"
import "./styles.css"
import { App } from "./App/App"

const root = createRoot(document.getElementById("root")!)
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
