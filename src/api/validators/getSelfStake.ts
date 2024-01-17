import { SS58String } from "@polkadot-api/substrate-bindings"
import { client } from "./chain"

const getFormattedSelfStake =
  (era: number) => async (validator: SS58String) => {
    const selfStakeRaw = await client.dot.query.Staking.ErasStakers.getValue(
      era,
      validator,
    )
    const { own } = selfStakeRaw
    return Number(BigInt(own) / 1_000_000n) / 10_000 // Expressed in DOT (with 4 decimals)
  }

export const getSelfStake = async (validators: string[]) => {
  const activeEra = await client.dot.query.Staking.ActiveEra.getValue()

  return Promise.all(validators.map(getFormattedSelfStake(activeEra!.index)))
}
