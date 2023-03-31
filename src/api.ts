export interface ValidatorChoice {
  values: {
    clusterSize: number
    comission: number
    eraPoints: number
    selfStake: number
    totalStake: number
    voters: number
  }
  history: Array<any>
  model: any
}

export interface Pair {
  a: ValidatorChoice
  b: ValidatorChoice
  quality: number
}

const getRandomValidator = (): ValidatorChoice["values"] => {
  const clusterSize = Math.floor(Math.random() * 20)
  const comission = Math.floor(Math.random() * 90)
  const eraPoints = Math.floor(Math.random() * 50)
  const selfStake = Math.floor(Math.random() * 200)
  const totalStake = selfStake * Math.max(1.5, Math.floor(Math.random() * 10))
  const voters = Math.floor(Math.random() * 250)
  return { clusterSize, comission, eraPoints, selfStake, totalStake, voters }
}

let quality = 0
export async function nextPair(
  prevChoice: ValidatorChoice | null,
): Promise<Pair> {
  if (prevChoice === null) {
    quality = 0
  }
  await new Promise((res) => setTimeout(res, Math.random() * 2500))
  const result = {
    a: {
      values: getRandomValidator(),
      history: [],
      model: null,
    },
    b: {
      values: getRandomValidator(),
      history: [],
      model: null,
    },
    quality,
  }
  quality += Math.random() * 0.25
  return result
}

export async function ranking(
  latestChoice: ValidatorChoice,
): Promise<Array<string>> {
  return Promise.resolve([
    "16ccn3xe5tAeR8kvzCRTcqHZjMJHvuF2pnLfTqyF1EmMusCU",
    "1zugcaaABVRXtyepKmwNR4g5iH2NtTNVBz1McZ81p91uAm8",
    "1zugcaaABVRXtyepKmwNR4g5iH2NtTNVBz1McZ81p91uAm8",
    "1zugcaaABVRXtyepKmwNR4g5iH2NtTNVBz1McZ81p91uAm8",
    "16ccn3xe5tAeR8kvzCRTcqHZjMJHvuF2pnLfTqyF1EmMusCU",
    "1zugcaaABVRXtyepKmwNR4g5iH2NtTNVBz1McZ81p91uAm8",
    "1zugcaaABVRXtyepKmwNR4g5iH2NtTNVBz1McZ81p91uAm8",
    "1zugcaaABVRXtyepKmwNR4g5iH2NtTNVBz1McZ81p91uAm8",
    "16ccn3xe5tAeR8kvzCRTcqHZjMJHvuF2pnLfTqyF1EmMusCU",
    "1zugcaaABVRXtyepKmwNR4g5iH2NtTNVBz1McZ81p91uAm8",
    "1zugcaaABVRXtyepKmwNR4g5iH2NtTNVBz1McZ81p91uAm8",
    "1zugcaaABVRXtyepKmwNR4g5iH2NtTNVBz1McZ81p91uAm8",
  ])
}
