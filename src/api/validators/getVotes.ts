import { type SS58String } from "polkadot-api"
import { dotApi } from "./chain"

export const getVotes = async (validators: SS58String[]) => {
  const votes = new Map<SS58String, { count: number }>(
    validators.map((v) => [v, { count: 0 }]),
  )

  const nominators = await dotApi.query.Staking.Nominators.getEntries()
  nominators.forEach(({ value: { targets } }) => {
    targets.forEach((t) => {
      const v = votes.get(t)
      v && v.count++
    })
  })

  return validators.map((v) => votes.get(v)!.count)
}
