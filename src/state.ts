import { state, StateObservable, SUSPENSE } from "@react-rxjs/core"
import { createSignal } from "@react-rxjs/utils"
import {
  exhaustMap,
  concat,
  of,
  map,
  filter,
  withLatestFrom,
  takeUntil,
  repeat,
  startWith,
  pipe,
  Observable,
  switchMap,
} from "rxjs"
import { nextPair, Pair, ranking, ValidatorChoice } from "./api"

export const [reset$, onReset] = createSignal<void>()

const withReset: <T>(source: Observable<T>) => Observable<T> = pipe(
  takeUntil(reset$),
  repeat(),
)

const [userSelection$, onUserSelection] = createSignal<ValidatorChoice>()
export { onUserSelection }

export const pair$ = state(
  userSelection$.pipe(
    startWith(null),
    exhaustMap((selection) => concat(of(SUSPENSE), nextPair(selection))),
    withReset,
  ),
)

export const latestQuality$ = pair$.pipeState(
  filter((x): x is Pair => x !== SUSPENSE),
  map((x) => x.quality),
  startWith(0),
  withReset,
)

export enum ResultsState {
  INIT = 0,
  INSUFICIENT = 1,
  GOOD_ENOUGH = 2,
  PERFECT = 3,
}

export const resultsState$: StateObservable<ResultsState> =
  latestQuality$.pipeState(
    map((x) => {
      if (x === 0) return ResultsState.INIT
      if (x < 0.7) return ResultsState.INSUFICIENT
      return x > 0.85 ? ResultsState.PERFECT : ResultsState.GOOD_ENOUGH
    }),
    withReset,
  )
resultsState$.subscribe()

export const results$ = state(
  resultsState$.pipe(
    withLatestFrom(userSelection$),
    switchMap(([rState, choice]) =>
      rState > ResultsState.INSUFICIENT
        ? concat(of(SUSPENSE), ranking(choice))
        : of(null),
    ),
    startWith(null),
    withReset,
  ),
)

results$.subscribe()
