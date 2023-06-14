export interface ValidatorData {
  votes: number
  clusterSize: number
  commission: number
  avgEraPoints: number
  selfStake: number
}

export type ScoredValidator = ValidatorData & {
  address: string
  score: number
}

export interface Pair {
  id: number
  pair: null | {
    a: ValidatorData
    b: ValidatorData
  }
  quality: number
}
