import { dotApi } from "./chain"

export const getOwnStakes = async () =>
  Object.fromEntries(
    (
      await dotApi.query.Staking.ErasStakersOverview.getEntries(
        (await dotApi.query.Staking.ActiveEra.getValue())!.index,
      )
    ).map(({ keyArgs: [, validator], value: { own } }) => [
      validator,
      Number(own / 1_000_000n) / 10_000, // Expressed in DOT (with 4 decimals)
    ]),
  )
