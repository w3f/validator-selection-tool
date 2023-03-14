import { resolve } from "path"
import { defineConfig, PluginOption } from "vite"
import reactPlugin from "@vitejs/plugin-react"
import typescript from "rollup-plugin-typescript2"

const typescriptPlugin: any = () => ({
  ...typescript(),
  enforce: "pre",
})

export default defineConfig(({ mode }) => {
  const isDev = mode === "development"

  const plugins: Array<PluginOption> = [reactPlugin()]
  if (isDev) plugins.unshift(typescriptPlugin())

  return {
    build: {
      target: ["es2020"],
      sourcemap: true,
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    plugins,
    optimizeDeps: {
      include: ["react/jsx-runtime"],
    },
  }
})
