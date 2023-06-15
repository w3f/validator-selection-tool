import { onReset, resultsState$, ResultsState, nSelected$ } from "@/state"
import { Subscribe, useStateObservable, withDefault } from "@react-rxjs/core"
import { map } from "rxjs"
import { Loading } from "../Components/Loading"
import Button from "../Components/Button"
import Table from "./Table"

const isInit$ = resultsState$.pipeState(
  map((x) => x === ResultsState.INIT),
  withDefault(true),
)

const isInsufficient$ = resultsState$.pipeState(
  map((x) => x === ResultsState.INSUFICIENT),
  withDefault(false),
)

const isGoodEnough$ = resultsState$.pipeState(
  map((x) => x === ResultsState.GOOD_ENOUGH),
  withDefault(false),
)

const isPerfect$ = resultsState$.pipeState(
  map((x) => x === ResultsState.PERFECT),
  withDefault(false),
)

const Reset: React.FC = () => {
  const isInit = useStateObservable(isInit$)
  return isInit ? null : (
    <Button small secondary onClick={() => onReset()}>
      Reset
    </Button>
  )
}

export const Results: React.FC = () => {
  const isGoodEnough = useStateObservable(isGoodEnough$)
  const isPerfect = useStateObservable(isPerfect$)
  const isInsufficient = useStateObservable(isInsufficient$)

  return (
    <div className="h-full w-full flex flex-col gap-10 pb-4 transition-all ">
      <div className="flex flex-col">
        <div className="h-fit flex items-center justify-between">
          <span className="text-h5 font-unbounded">Results</span>
          <Reset />
        </div>
        <div className="flex gap-1.5 items-center text-body-2">
          <span>Selected:</span>
          <span className="font-semibold w-6 text-start">{nSelected$}</span>
          <span>Precision:</span>
          {isInsufficient && (
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full  bg-orange-400" />
              <span className="font-semibold font-inter text-orange-400">
                Low
              </span>
            </div>
          )}
          {isGoodEnough && (
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full  bg-green-500" />
              <span className="text-green-500 font-semibold font-inter">
                Good enough
              </span>
            </div>
          )}
          {isPerfect && (
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full  bg-green-600" />
              <span className="text-green-600 font-semibold font-inter">
                Perfect
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="h-full overflow-scroll">
        <Subscribe fallback={<Loading size={16} />}>
          <Table items={16} />
        </Subscribe>
      </div>
    </div>
  )
}
