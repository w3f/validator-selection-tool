import { results$ } from "@/state"
import { SUSPENSE, useStateObservable, withDefault } from "@react-rxjs/core"
import { map, of, switchMap } from "rxjs"
import { MAX_SELECTED_VALIDATORS, selectedValidators$ } from "./Table"

const nSelected$ = results$.pipeState(
  switchMap((results) => {
    if (results === null || results === SUSPENSE) return of(null)
    return selectedValidators$.pipe(map((x) => x.size))
  }),
  withDefault(null),
)

export function Selected() {
  const nSelected = useStateObservable(nSelected$)
  return nSelected === null ? null : (
    <>
      <span>Selected:</span>
      <span className="font-semibold">
        {nSelected} / {MAX_SELECTED_VALIDATORS}
      </span>
    </>
  )
}
