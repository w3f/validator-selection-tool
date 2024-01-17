import { Binary, SS58String } from "@polkadot-api/substrate-bindings"
import { client } from "./chain"

const getDescription = async (validator: SS58String) => {
  let value: SS58String | Binary | undefined
  const runtime = await client.runtime.latest()
  if (runtime.isCompatible((x) => x.roc.query.Identity.IdentityOf)) {
    const identityValidator =
      await client.roc.query.Identity.IdentityOf.getValue(validator)
    if (!identityValidator) return null
    ;({ value } = identityValidator[0].info.display)
  } else {
    const identityValidator =
      await client.dot.query.Identity.IdentityOf.getValue(validator)
    if (!identityValidator) return null
    ;({ value } = identityValidator.info.display)
  }

  if (!value) return null
  return value instanceof Binary ? value.asText() : value
}

const getRecursiveDescription = async (
  validator: SS58String,
): Promise<string | null> => {
  const description = await getDescription(validator)
  if (description) return description

  const parent = await client.dot.query.Identity.SuperOf.getValue(validator)
  if (!parent) return null
  const [, { value }] = parent
  return value instanceof Binary ? value.asText() : value ?? null
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
