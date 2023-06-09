import { getIdentityIdentityOf, getIdentitySuperOf } from "./chain"

const textDecoder = new TextDecoder()
const getDescription = async (validator: string) => {
  const identityValidator = await getIdentityIdentityOf(validator)
  if (!identityValidator) return null

  const { value } = identityValidator.info.display
  if (!value) return null

  if (typeof value === "string") return value

  const input = new Uint8Array(value.length)
  for (let i = 0; i < value.length; i++) {
    input[i] = value[i]
  }
  return textDecoder.decode(input)
}

const getDescriptions = async (validators: string[]) => {
  const [descriptions, superAddresses] = await Promise.all([
    Promise.all(validators.map(getDescription)),
    Promise.all(validators.map(getIdentitySuperOf)),
  ])

  const missingPromises: Array<Promise<void>> = []
  descriptions.forEach((value, idx) => {
    if (value) return

    const parentAddress = superAddresses[idx]
    if (!parentAddress) return

    missingPromises.push(
      getDescription(parentAddress).then((desc) => {
        descriptions[idx] = desc
      }),
    )
  })

  await Promise.all(missingPromises)

  return descriptions
}

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
