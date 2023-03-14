import { state, SUSPENSE, withDefault } from "@react-rxjs/core"
import { createSignal, switchMapSuspended } from "@react-rxjs/utils"
import {
  exhaustMap,
  concat,
  of,
  map,
  filter,
  withLatestFrom,
  defer,
  takeUntil,
  repeat,
  startWith,
  merge,
} from "rxjs"
import { nextPair, Pair, ranking, ValidatorChoice } from "./api"

export const [reset$, onReset] = createSignal<void>()

const [userSelection$, onUserSelection] = createSignal<ValidatorChoice>()
export { onUserSelection }

export const pair$ = state(
  concat(
    nextPair(null),
    merge(userSelection$, reset$.pipe(map(() => null))).pipe(
      exhaustMap((x) =>
        concat(
          of(SUSPENSE),
          defer(() => nextPair(x)),
        ),
      ),
    ),
  ),
)

export const latestQuality$ = pair$.pipeState(
  filter((x): x is Pair => x !== SUSPENSE),
  map((x) => x.quality),
  startWith(0),
  takeUntil(reset$),
  repeat(),
)

latestQuality$.subscribe()

export const [seeResults$, onSeeResults] = createSignal<void>()

export const results$ = state(
  seeResults$.pipe(
    withLatestFrom(userSelection$),
    switchMapSuspended(([, choice]) => ranking(choice)),
    takeUntil(reset$),
    repeat(),
  ),
)

results$.subscribe()
