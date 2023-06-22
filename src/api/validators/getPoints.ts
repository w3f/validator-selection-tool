import { getStakingCurrentEra, getStakingErasRewardsPoints } from "./chain"

const N_ERAS = 83

export const getEraPoints = async (validators: string[]) => {
  const currentEra = await getStakingCurrentEra()

  const previousEras = Array(N_ERAS)
    .fill(null)
    .map((_, idx) => currentEra! - idx - 1)

  const allEraPoints = await Promise.all(
    previousEras.map(getStakingErasRewardsPoints),
  )

  let totalScorers = 0
  const allEraPointsWithAvg = allEraPoints
    .map((eraPoints) => {
      const nScorersInEra = eraPoints!.individual.length
      totalScorers += nScorersInEra

      const avgPoints =
        eraPoints!.individual.reduce((a, b) => a + b.points, 0) / nScorersInEra

      const pointsPerValidator = new Map(
        eraPoints!.individual.map((x) => [x.account, x.points] as const),
      )

      return {
        avgPoints,
        nScorersInEra,
        pointsPerValidator,
      }
    })
    .map(({ avgPoints, nScorersInEra, pointsPerValidator }) => ({
      avgMultiplier: nScorersInEra / totalScorers,
      avgPoints,
      pointsPerValidator,
    }))

  return validators.map((validator) => {
    return Math.round(
      allEraPointsWithAvg
        .map((era) => {
          const points = era.pointsPerValidator.has(validator)
            ? era.pointsPerValidator.get(validator)!
            : era.avgPoints
          return points * era.avgMultiplier
        })
        .reduce((a, b) => a + b, 0),
    )
  })
}
