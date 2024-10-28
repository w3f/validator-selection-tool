import { Binary, SS58String } from "polkadot-api"
import { pplApi } from "./chain"

const getDescription = async (validator: SS58String) => {
  const [result] =
    (await pplApi.query.Identity.IdentityOf.getValue(validator)) || []
  if (!result) return null
  const { value } = result.info.display
  return value instanceof Binary ? value.asText() : null
}

const getRecursiveDescription = async (validator: SS58String) => {
  const description = await getDescription(validator)
  if (description) return description

  const parent = await pplApi.query.Identity.SuperOf.getValue(validator)
  if (!parent) return null
  const [, { value }] = parent
  return value instanceof Binary ? value.asText() : null
}

const getDescriptions = async (validators: SS58String[]) =>
  Promise.all(validators.map(getRecursiveDescription))

const N_RELEVANT_CHARS = 5
export const getClusterSizes = async (validators: string[]) => {
  const descriptions = await getDescriptions(validators)

  // it can't collide b/c it's one character longer
  const nullKey = Array(N_RELEVANT_CHARS + 1)
    .fill("-")
    .join()

  const clusterKeys = descriptions.map(
    (description) => description?.slice(0, N_RELEVANT_CHARS) ?? nullKey,
  )

  const clusters = new Map<string, { count: number }>([[nullKey, { count: 1 }]])

  clusterKeys.forEach((key) => {
    if (key === nullKey) return

    if (clusters.has(key)) {
      clusters.get(key)!.count++
    } else {
      clusters.set(key, { count: 1 })
    }
  })

  return clusterKeys.map((key) => clusters.get(key)!.count)
}
