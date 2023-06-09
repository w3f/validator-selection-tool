import { lastValueFrom, mergeMap } from "rxjs"
import { getStakingNominatorsFromKey, stakingNominatorsKeys$ } from "./chain"

export const getVotes = async (validators: string[]) => {
  const votes: Map<string, { count: number }> = new Map(
    validators.map((v) => [v, { count: 0 }]),
  )

  const getNominatorAndUpdateVotes = async (storageKey: string) => {
    const nominator = await getStakingNominatorsFromKey(storageKey)
    nominator?.targets.forEach((t) => {
      const v = votes.get(t)
      v && v.count++
    })
    return nominator
  }

  await lastValueFrom(
    stakingNominatorsKeys$.pipe(
      mergeMap((keys) => Promise.all(keys.map(getNominatorAndUpdateVotes))),
    ),
  )

  return validators.map((v) => votes.get(v)!.count)
}
