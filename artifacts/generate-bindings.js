import { processAbi } from "@unstoppablejs/solidity-codegen"
import { readFile, writeFile, mkdir, stat } from "fs/promises"

const [Contango, ERC20, IERC2612, NFT, ExecutionProcessor] = await Promise.all(
  [
    "./artifacts/ContangoV2.json",
    "./artifacts/ERC20.json",
    "./artifacts/IERC2612.json",
    "./artifacts/ContangoPositionNFT.json",
    "./artifacts/ExecutionProcessorLib.json",
  ].map((path) => readFile(path, { encoding: "utf-8" }).then(JSON.parse)),
)

const contango = processAbi({
  abi: Contango.abi,
  functions: [
    "createPosition",
    "openingCostForLongPosition",
    "openingCostForShortPosition",
    "batch",
    "forwardPermit",
    "position",
    "closingCostForPosition",
  ],
  events: [],
  customCodecs: {
    bytes32str: {
      base: "bytes32",
      applyToVariableNames: [
        "symbol",
        "role",
        "previousAdminRole",
        "newAdminRole",
      ],
      importFrom: "@/api/utils",
    },
  },
})

const targetFolder = "./src/api/chain/contracts"

try {
  await stat(targetFolder)
} catch (_) {
  await mkdir(targetFolder)
}
await writeFile(targetFolder + "/contango.ts", contango)

const erc20 = processAbi({
  abi: ERC20.abi,
  functions: ["balanceOf", "name"],
  events: ["Transfer"],
})
await writeFile(targetFolder + "/erc20.ts", erc20)

const erc2612 = processAbi({
  abi: IERC2612.abi,
  functions: ["nonces", "permit"],
  events: [],
})
await writeFile(targetFolder + "/erc2612.ts", erc2612)

const nft = processAbi({
  abi: NFT.abi,
  functions: ["positions"],
  events: ["Transfer"],
})
await writeFile(targetFolder + "/nft.ts", nft)

const executionProcessor = processAbi({
  abi: ExecutionProcessor.abi,
  functions: [],
  events: [
    "PositionUpserted",
    "PositionClosed",
    "PositionDelivered",
    "PositionLiquidated",
  ],
})
await writeFile(targetFolder + "/execution-processor.ts", executionProcessor)
