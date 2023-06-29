import { resolve } from "path"
import { defineConfig, PluginOption } from "vite"
import modulepreload from "rollup-plugin-modulepreload"
import reactPlugin from "@vitejs/plugin-react"
import typescript from "rollup-plugin-typescript2"
import Unfonts from "unplugin-fonts/vite"

const fonts = Unfonts({
  google: {
    /**
     * enable preconnect link injection
     *   <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
     * default: true
    preconnect: false,
     */

    /**
     * values: auto, block, swap(default), fallback, optional
     * default: 'swap'
    display: "block",
     */

    /**
     * define which characters to load
     * default: undefined (load all cseharacters)
    text: 'ViteAwsom',
     */

    /**
     * define where the font load tags should be inserted
     * default: 'head-prepend'
     *   values: 'head' | 'body' | 'head-prepend' | 'body-prepend'
    injectTo: "head-prepend",
     */

    /**
     * Fonts families lists
     */
    families: [
      // families can be either strings (only regular 400 will be loaded)
      "Lato",
      "Montserrat",
    ],
  },
})

const typescriptPlugin: any = () => ({
  ...typescript(),
  enforce: "pre",
})

const customPreloadPlugin = () => {
  const result: any = {
    ...((modulepreload as any)({
      index: resolve(__dirname, "dist", "index.html"),
      prefix: process.env.BASE_URL || ".",
    }) as any),
    enforce: "post",
  }
  result.writeBundle = result.generateBundle
  delete result.generateBundle
  return result
}

export default defineConfig(({ mode }) => {
  const isDev = mode === "development"

  const plugins: Array<PluginOption> = [reactPlugin()]
  if (isDev) plugins.unshift(typescriptPlugin())
  else plugins.unshift(customPreloadPlugin(), fonts)

  return {
    base: process.env.BASE_URL || "/",
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
