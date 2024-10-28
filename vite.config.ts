import path from "path"
import Unfonts from "unplugin-fonts/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const fonts = Unfonts({
  google: {
    families: ["Lato", "Montserrat"],
  },
})

export default defineConfig({
  plugins: [fonts, react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
