import type { SS58String } from "polkadot-api"
import { dotApi } from "./chain"

export const getEraPoints = async () => {
  const allEraPoints = (
    await dotApi.query.Staking.ErasRewardPoints.getEntries()
  ).map((x) => x.value)

  return async (validators: SS58String[]) => {
    let totalScorers = 0
    const allEraPointsWithAvg = allEraPoints
      .map((eraPoints) => {
        const nScorersInEra = eraPoints!.individual.length
        totalScorers += nScorersInEra

        const avgPoints =
          eraPoints.individual.reduce((a, [, points]) => a + points, 0) /
          nScorersInEra

        const pointsPerValidator = new Map(eraPoints.individual)

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
}
