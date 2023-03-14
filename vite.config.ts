import { parse, resolve } from "path"
import { readdir } from "fs/promises"
import { defineConfig, Plugin, PluginOption } from "vite"
import reactPlugin from "@vitejs/plugin-react"
import typescript from "rollup-plugin-typescript2"

function apiResolverPlugin(env: string, withMocks: boolean): Plugin {
  return {
    name: "apiResolverPlugin",
    enforce: "pre",
    resolveId: async function (source, importer) {
      if (source === "/src/api/generated/index.ts")
        return this.resolve(`/src/api/generated/${env}.ts`, importer)

      if (
        !(withMocks && source.endsWith(".ts") && source.startsWith("/src/api"))
      )
        return null

      const file = parse(source)
      const files = await readdir("." + file.dir)
      if (!files.includes(`${file.name}.mock.ts`)) return null

      const mockPath = `${file.dir}/${file.name}.mock.ts`
      return this.resolve(mockPath, importer)
    },
  }
}

const typescriptPlugin: any = () => ({
  ...typescript(),
  enforce: "pre",
})

export default defineConfig(({ mode }) => {
  const isDev = mode === "development"

  const plugins: Array<PluginOption> = [reactPlugin()]
  if (isDev) plugins.unshift(typescriptPlugin())

  const withMocks = process.env.VITE_MOCKS === "true"
  const env = process.env.VITE_ENV ?? "dev"
  if (env !== "dev" || withMocks) {
    plugins.unshift(apiResolverPlugin(env, withMocks))
  }

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
