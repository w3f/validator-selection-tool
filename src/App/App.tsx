import { combineLatest, distinctUntilChanged, map, withLatestFrom } from "rxjs"
import { state, useStateObservable, withDefault } from "@react-rxjs/core"
import { ResultsState, resultsState$, isToughCookie$ } from "@/state"
import { Header } from "./Header"
import { Hero } from "./Hero"
import { Picker } from "./Picker"
import { ToughCookie } from "./ToughCookie"

import "polkadot-theme/global.css"
import "polkadot-theme/light.css"
import "polkadot-theme/dark.css"
import { lazy, Suspense } from "react"

const Results = lazy(() => import("./Results"))

const isInit$ = resultsState$.pipeState(
  map((x) => x === ResultsState.INIT),
  withDefault(true),
)

const isPerfect$ = resultsState$.pipe(
  map((resultState) => resultState === ResultsState.PERFECT),
  distinctUntilChanged(),
)

const toughCookieJsx = <ToughCookie />
const pickerJsx = <Picker />
const main$ = state(
  combineLatest([isPerfect$, isToughCookie$]).pipe(
    map(([isPerfect, isToughCookie]) =>
      isPerfect ? null : isToughCookie ? toughCookieJsx : pickerJsx,
    ),
  ),
  pickerJsx,
)

const suspended = (
  <div className="h-fit md:overflow-visible flex flex-col overflow-scroll md:flex-row gap-8 lg:gap-16">
    {main$}
    <Hero />
  </div>
)

export const App = () => {
  const isInit = useStateObservable(isInit$)

  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Unbounded:wght@500&display=swap');
      </style>
      <div className="h-screen flex flex-col px-4 md:px-8 lg:px-16">
        <Header />
        <Suspense fallback={suspended}>
          <div
            className={`${
              isInit ? "h-fit md:overflow-visible" : "h-full md:overflow-clip"
            } flex flex-col overflow-scroll md:flex-row gap-8 lg:gap-16`}
          >
            {main$}
            {isInit ? <Hero /> : <Results />}
          </div>
        </Suspense>
      </div>
    </>
  )
}
