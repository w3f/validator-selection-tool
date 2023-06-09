import { getStakingActiveEra, getStakingErasStakers } from "./chain"

const getFormattedSelfStake = (era: number) => async (validator: string) => {
  const selfStakeRaw = await getStakingErasStakers(era, validator)
  if (!selfStakeRaw) return null
  const { own } = selfStakeRaw

  return Number(BigInt(own) / 1_000_000n) / 10_000 // Expressed in DOT (with 4 decimals)
}

export const getSelfStake = async (validators: string[]) => {
  const activeEra = await getStakingActiveEra()

  return Promise.all(validators.map(getFormattedSelfStake(activeEra!)))
}
