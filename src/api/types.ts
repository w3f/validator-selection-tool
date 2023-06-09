export interface ValidatorData {
  votes: number
  clusterSize: number
  commission: number
  avgEraPoints: number
  selfStake: number
}

export interface Pair {
  id: number
  pair: null | {
    a: ValidatorData
    b: ValidatorData
  }
  quality: number
}
