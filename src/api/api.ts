import { validators, x as xPointsRaw, questions } from "./data.json"
import type { Pair, ScoredValidator, ValidatorData } from "./types"
import { linearInterpolation } from "./linearInterpolation"

type DataPoints = [Array<number>, Array<number>, Array<number>, Array<number>]

function getValidatorDataFromIdx(idx: number): ValidatorData {
  const [votes, clusterSize, commission, avgEraPoints, selfStake] =
    validators[idx]
  return { votes, clusterSize, commission, avgEraPoints, selfStake }
}

const add = (a: number, b: number) => a + b

const rawQualityToNumber = (rawQuality: string | number) => {
  const asNumberQuality = Number(rawQuality)
  return Math.max(0, Number.isNaN(asNumberQuality) ? 0 : asNumberQuality)
}

export function getPair(id: number): Pair {
  const [questionIdxs, rawQuality] = questions[id] as [
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
    quality: Math.min(1, rawQualityToNumber(rawQuality) / 0.6),
  }
}

export const maxQuestionsIdx = questions.length - 1

const validatorsPromise = import("./validators").then(async (x) =>
  x.getValidators(),
)

function getScoreFunctionForQuestionId(id: number) {
  const yPoints = questions[id][2] as DataPoints
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

export async function ranking(
  questionId: number,
): Promise<Array<ScoredValidator>> {
  const getScore = getScoreFunctionForQuestionId(questionId)

  return Object.entries(await validatorsPromise)
    .map(([address, validator]) => ({
      address,
      score: getScore(validator),
      ...validator,
    }))
    .sort((a, b) => b.score - a.score)
}
