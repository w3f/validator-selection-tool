import { validators, x as xPointsRaw, questions } from "./initialData.json"
import type { Pair, ScoredValidator, ValidatorData } from "./types"
import { linearInterpolation } from "./linearInterpolation"

type DataPoints = [Array<number>, Array<number>, Array<number>, Array<number>]

function getValidatorDataFromIdx(idx: number): ValidatorData {
  const [votes, clusterSize, commission, avgEraPoints, selfStake] =
    validators[idx]
  return { votes, clusterSize, commission, avgEraPoints, selfStake }
}

const add = (a: number, b: number) => a + b

export function getPair(id: number): Pair {
  const [questionIdxs, quality] = questions[id] as [
    [number, number] | string,
    number,
  ]

  return {
    id,
    pair: Array.isArray(questionIdxs)
      ? {
          a: getValidatorDataFromIdx(questionIdxs[0]),
          b: getValidatorDataFromIdx(questionIdxs[1]),
        }
      : null,
    quality: quality === -1 ? 0 : Math.max(0.0001, quality) / 0.75,
  }
}

export const maxQuestionsIdx = questions.length - 1

function getScoreFunctionForQuestionId(yPoints: DataPoints) {
  const xPoints = xPointsRaw as DataPoints

  const pointsByField = yPoints.map((ys, idxField) =>
    ys.map((y, idx) => ({ y, x: xPoints[idxField][idx] })),
  )

  const fns = pointsByField.map(linearInterpolation)

  return (validator: ValidatorData) =>
    Object.values(validator)
      .map((val, idx) => fns[idx](val))
      .reduce(add)
}

const sortingDataPromise = import("./sortingData.json").then(
  (mod) => mod.default,
) as Promise<Array<DataPoints>>

const validatorsP = import("./validators").then((x) => x.validators)

export async function ranking(
  questionId: number,
): Promise<Array<ScoredValidator>> {
  const [sortingData, validators] = await Promise.all([
    sortingDataPromise,
    validatorsP,
  ])

  const getScore = getScoreFunctionForQuestionId(sortingData[questionId])

  return Object.entries(validators)
    .map(([address, validator]) => ({
      address,
      score: getScore(validator),
      ...validator,
    }))
    .sort((a, b) => b.score - a.score)
}
