import { getComissions } from "./getCommissions"
import { getClusterSizes } from "./getClusterSizes"
import { getEraPoints } from "./getPoints"
import { getOwnStakes } from "./getSelfStake"
import { getVotes } from "./getVotes"
import { dotApi } from "./chain"

export const getValidators = async () => {
  const fnPromise = getEraPoints()
  const ownStakesP = getOwnStakes()
  const validators = await dotApi.query.Session.Validators.getValue()

  const [comissions, clusterSizes, points, votes, selfStake] =
    await Promise.all([
      getComissions(validators),
      getClusterSizes(validators),
      fnPromise.then((getEraPointsValidators) =>
        getEraPointsValidators(validators),
      ),
      getVotes(validators),
      ownStakesP.then((ownStakes) => validators.map((x) => ownStakes[x] || 0)),
    ])

  const result = Object.fromEntries(
    validators.map((v, idx) => {
      return [
        v,
        {
          votes: votes[idx],
          clusterSize: clusterSizes[idx],
          commission: comissions[idx]!,
          avgEraPoints: points[idx],
          selfStake: selfStake[idx]!,
        },
      ]
    }),
  )

  return result
}
