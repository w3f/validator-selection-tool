import { getStakingCurrentEra, getStakingErasRewardsPoints } from "./chain"

const N_ERAS = 40
export const getEraPoints = async (validators: string[]) => {
  const currentEra = await getStakingCurrentEra()

  const previousEras = Array(N_ERAS)
    .fill(null)
    .map((_, idx) => currentEra! - idx - 1)
    .reverse()

  const result = await Promise.all(
    previousEras.map(getStakingErasRewardsPoints),
  )

  const pointsPerValidator = new Map<string, { points: number }>(
    validators.map((v) => [v, { points: 0 }]),
  )

  result.forEach((era) => {
    era?.individual.forEach(({ account, points }) => {
      if (!pointsPerValidator.has(account)) return
      pointsPerValidator.get(account)!.points += points
    })
  })

  return validators.map((x) =>
    Math.round(pointsPerValidator.get(x)!.points / N_ERAS),
  )
}
