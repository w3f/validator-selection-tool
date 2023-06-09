import { validators, x as xPointsRaw, questions } from "./data.json"
import type { Pair, ValidatorData } from "./types"
import { linearInterpolation } from "..//utils"

type DataPoints = [Array<number>, Array<number>, Array<number>, Array<number>]

function getValidatorDataFromIdx(idx: number): ValidatorData {
  const [votes, clusterSize, commission, avgEraPoints, selfStake] =
    validators[idx]
  return { votes, clusterSize, commission, avgEraPoints, selfStake }
}

const add = (a: number, b: number) => a + b

export function getSortingFunctionForQuestionId(id: number) {
  const yPoints = questions[id][2] as DataPoints
  const xPoints = xPointsRaw as DataPoints

  const pointsByField = yPoints.map((ys, idxField) =>
    ys.map((y, idx) => ({ y, x: xPoints[idxField][idx] })),
  )

  const fns = pointsByField.map(linearInterpolation)

  return (a: ValidatorData, b: ValidatorData) => {
    const aScore = Object.values(a)
      .map((val, idx) => fns[idx](val))
      .reduce(add)

    const bScore = Object.values(b)
      .map((val, idx) => fns[idx](val))
      .reduce(add)

    return aScore - bScore
  }
}

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

const validatorsPromise = import("./validators")
  .then((x) => x.getValidators())
  .then((v) => {
    console.log("got the validators", v)
    return v
  })

export async function ranking(questionId: number): Promise<Array<string>> {
  const sortFn = getSortingFunctionForQuestionId(questionId)

  const validators = await validatorsPromise

  return Object.keys(validators).sort((a, b) =>
    sortFn(validators[a], validators[b]),
  )
}
