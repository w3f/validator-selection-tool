import type { SS58String } from "@polkadot-api/substrate-bindings"
import { client } from "./chain"

const N_ERAS = 83

export const getEraPoints = async () => {
  const currentEra = await client.dot.query.Staking.CurrentEra.getValue()

  const previousEras = Array(N_ERAS)
    .fill(null)
    .map((_, idx) => currentEra! - idx - 1)

  const allEraPoints = await Promise.all(
    previousEras.map((x) =>
      client.dot.query.Staking.ErasRewardPoints.getValue(x),
    ),
  )

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
