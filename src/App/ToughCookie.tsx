import { useStateObservable } from "@react-rxjs/core"
import { ResultsState, resultsState$ } from "@/state"
import { map } from "rxjs"

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
            You'll have to settle with "good enough" results or hit reset and
            start over!
          </span>
        ) : (
          <span>
            We were unable determine your preferences based on your choices so
            far. However, based on the data that you have provided, we think
            that these are the validators that better align with your
            preferences. Please have a look at them or start over.
          </span>
        )}
      </div>
    </div>
  )
}
