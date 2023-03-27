import { onUserSelection, pair$, reset$, seeResults$ } from "@/state"
import {
  state,
  SUSPENSE,
  useStateObservable,
  withDefault,
} from "@react-rxjs/core"
import { map, noop, repeat, startWith, takeUntil } from "rxjs"
import { ChooseValidator } from "./ChooseValidator"
import { Results } from "./Results"

const nullPairs = { a: null, b: null }
const nonSuspendedPairs$ = pair$.pipeState(
  map((pair) => (pair === SUSPENSE ? nullPairs : pair)),
  withDefault(nullPairs),
)

const Pair: React.FC = () => {
  const { a, b } = useStateObservable(nonSuspendedPairs$)

  return (
    <ChooseValidator
      a={a?.values}
      b={b?.values}
      onSelectA={a ? () => onUserSelection(a) : noop}
      onSelectB={a ? () => onUserSelection(b) : noop}
    />
  )
}

const displayResults$ = state(
  seeResults$.pipe(
    map(() => true),
    startWith(false),
    takeUntil(reset$),
    repeat(),
  ),
)
displayResults$.subscribe()

export const App = () => {
  const displayResults = useStateObservable(displayResults$)
  return (
    <div className="bg-gray-100 w-full">
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Unbounded:wght@500&display=swap');
      </style>
      {displayResults ? <Results /> : <Pair />}
    </div>
  )
}
