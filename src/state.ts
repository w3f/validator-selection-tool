import { state, StateObservable, SUSPENSE, withDefault } from "@react-rxjs/core"
import { createSignal } from "@react-rxjs/utils"
import {
  concat,
  of,
  map,
  withLatestFrom,
  takeUntil,
  repeat,
  startWith,
  pipe,
  Observable,
  switchMap,
  scan,
} from "rxjs"
import { maxQuestionsIdx, getPair, ranking } from "./api"

export const [reset$, onReset] = createSignal<void>()

const withReset: <T>(source: Observable<T>) => Observable<T> = pipe(
  takeUntil(reset$),
  repeat(),
)

const [userSelection$, onUserSelection] = createSignal<"a" | "b">()
export { onUserSelection }

const currentQuestionId$ = state(
  userSelection$.pipe(
    scan((acc, current) => {
      const result = (acc + 1) * 2 + (current === "a" ? 0 : 1) - 1
      const finalResult = result > maxQuestionsIdx ? acc : result
      return finalResult
    }, 0),
    startWith(0),
    withReset,
  ),
)

export const pair$ = currentQuestionId$.pipeState(map(getPair), withReset)

export const isToughCookie$ = pair$.pipeState(
  map((x) => x.pair === null),
  withDefault(false),
)

export const latestQuality$ = pair$.pipeState(
  map((x) => x.quality),
  startWith(0),
  withReset,
)
latestQuality$.subscribe()

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
    withLatestFrom(currentQuestionId$),
    switchMap(([rState, currentQuestionId]) =>
      rState > ResultsState.INSUFICIENT
        ? concat(of(SUSPENSE), ranking(currentQuestionId))
        : of(null),
    ),
    startWith(null),
    withReset,
  ),
)

results$.subscribe()
