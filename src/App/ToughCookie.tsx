import { useStateObservable, withDefault } from "@react-rxjs/core"
import { ResultsState, resultsState$, onReset } from "@/state"
import { map } from "rxjs"

import "polkadot-theme/global.css"
import "polkadot-theme/light.css"
import "polkadot-theme/dark.css"
import Button from "@/Components/Button"

function Reset() {
  return (
    <Button
      className="w-fit bg-none"
      variant="primary"
      small
      secondary
      onClick={() => onReset()}
    >
      Reset
    </Button>
  )
}

const isInsufficient$ = resultsState$.pipeState(
  map((x) => x === ResultsState.INSUFICIENT),
  withDefault(false),
)

const isGoodEnough$ = resultsState$.pipeState(
  map((x) => x === ResultsState.GOOD_ENOUGH),
  withDefault(false),
)

export default function ToughCookie() {
  const isGoodEnough = useStateObservable(isGoodEnough$)
  const isInsufficient = useStateObservable(isInsufficient$)
  return (
    <div className="w-full bg-background-dip h-fit rounded-md text-sm text-foreground-contrast">
      <div className="p-4 flex flex-col gap-2 md:gap-1">
        <span className="text-sm md:text-base font-unbounded">
          Oh snap! You ran out of pairs to compare.
        </span>
        {isGoodEnough && (
          <span>
            You'll have to settle with good enough results or hit reset and
            start over!
          </span>
        )}
        {isInsufficient && (
          <div className="flex flex-col gap-4">
            <span>
              We were unable determine your preferences based on your choices so
              far. Please start over.
            </span>
            <Reset />
          </div>
        )}
      </div>
    </div>
  )
}
