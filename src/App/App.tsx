import { useStateObservable, withDefault } from "@react-rxjs/core"
import { ResultsState, resultsState$, isToughCookie$ } from "@/state"
import Picker from "./Picker"
import { map } from "rxjs"
import Header from "./Header"
import Hero from "./Hero"
import { Results } from "./Results"

import "polkadot-theme/global.css"
import "polkadot-theme/light.css"
import "polkadot-theme/dark.css"
import ToughCookie from "./ToughCookie"

const isInit$ = resultsState$.pipeState(
  map((x) => x === ResultsState.INIT),
  withDefault(true),
)

const isPerfect$ = resultsState$.pipeState(
  map((x) => x === ResultsState.PERFECT),
  withDefault(false),
)

export const App = () => {
  const isInit = useStateObservable(isInit$)
  const isToughCookie = useStateObservable(isToughCookie$)
  const isPerfect = useStateObservable(isPerfect$)

  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Unbounded:wght@500&display=swap');
      </style>
      <div className="h-screen flex flex-col px-4 md:px-8 lg:px-16">
        <Header />
        <div
          className={`${
            isInit ? "h-fit md:overflow-visible" : "h-full md:overflow-clip"
          } flex flex-col overflow-scroll md:flex-row gap-8 lg:gap-16`}
        >
          {isPerfect ? null : isToughCookie && !isPerfect ? (
            <ToughCookie />
          ) : (
            <Picker />
          )}
          {isInit ? <Hero /> : <Results />}
        </div>
      </div>
    </>
  )
}
