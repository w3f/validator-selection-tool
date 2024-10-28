import { type SS58String } from "polkadot-api"
import { dotApi } from "./chain"

const getFormattedSelfStake =
  (era: number) => async (validator: SS58String) => {
    const selfStakeRaw = await dotApi.query.Staking.ErasStakers.getValue(
      era,
      validator,
    )
    const { own } = selfStakeRaw
    return Number(BigInt(own) / 1_000_000n) / 10_000 // Expressed in DOT (with 4 decimals)
  }

export const getSelfStake = async (validators: string[]) => {
  const activeEra = await dotApi.query.Staking.ActiveEra.getValue()

  return Promise.all(validators.map(getFormattedSelfStake(activeEra!.index)))
}
