import path from "path"
import { fileURLToPath } from "url"
import { readFile, writeFile } from "node:fs/promises"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const apiDir = path.join(__dirname, "./src/api")

const rawData = JSON.parse(
  await readFile(path.join(apiDir, "result.json"), { encoding: "utf8" }),
)

const sortingData = rawData.questions.map(([, , sortData]) => sortData)

rawData.questions.forEach((question) => {
  question.pop()
})

await Promise.all([
  writeFile(path.join(apiDir, "initialData.json"), JSON.stringify(rawData), {
    encoding: "utf8",
  }),
  writeFile(
    path.join(apiDir, "sortingData.json"),
    JSON.stringify(sortingData),
    { encoding: "utf8" },
  ),
])
