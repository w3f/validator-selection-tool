import { useStateObservable } from "@react-rxjs/core"
import { ResultsState, resultsState$ } from "@/state"
import { map } from "rxjs"

import "polkadot-theme/global.css"
import "polkadot-theme/light.css"
import "polkadot-theme/dark.css"

const isGoodEnough$ = resultsState$.pipeState(
  map((x) => x === ResultsState.GOOD_ENOUGH),
)
isGoodEnough$.subscribe()

export function ToughCookie() {
  const isGoodEnough = useStateObservable(isGoodEnough$)
  return (
    <div className="w-full bg-background-dip h-fit rounded-md text-sm text-foreground-contrast">
      <div className="p-4 flex flex-col gap-2 md:gap-1">
        <span className="text-sm md:text-base font-unbounded">
          Oh snap! You ran out of pairs to compare.
        </span>
        {isGoodEnough ? (
          <span>
            You'll have to settle with good enough results or hit reset and
            start over!
          </span>
        ) : (
          <span>
            We were unable determine your preferences based on your choices so
            far. Please start over.
          </span>
        )}
      </div>
    </div>
  )
}
