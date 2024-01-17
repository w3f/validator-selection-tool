import { SS58String } from "@polkadot-api/substrate-bindings"
import { client } from "./chain"

export const getVotes = async (validators: SS58String[]) => {
  const votes: Map<SS58String, { count: number }> = new Map(
    validators.map((v) => [v, { count: 0 }]),
  )

  const nominators = await client.dot.query.Staking.Nominators.getEntries()
  nominators.forEach(({ value: { targets } }) => {
    targets.forEach((t) => {
      const v = votes.get(t)
      v && v.count++
    })
  })

  return validators.map((v) => votes.get(v)!.count)
}
