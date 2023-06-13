import { results$, onReset, resultsState$, ResultsState } from "@/state"
import {
  Subscribe,
  SUSPENSE,
  useStateObservable,
  withDefault,
} from "@react-rxjs/core"
import { map } from "rxjs"
import { Loading } from "../Components/Loading"
import { AccountIcon } from "../Components/AccountIcon"
import { Field, sections } from "./Picker"
import Button from "../Components/Button"

const jsxResults$ = results$.pipeState(
  map((validators) =>
    Array.isArray(validators) ? (
      <div className="flex flex-col gap-2 mt-4 text-body-2">
        {validators.slice(0, 15).map((validator) => (
          <div
            key={validator.address}
            className="flex items-center py-3 border-b-[1px]"
          >
            <AccountIcon small address={validator.address} />
            {Object.entries(sections).map(([key]) => (
              <div
                key={key}
                className="w-full body-2 flex flex-col gap-4 whitespace-nowrap h-fit items-center"
              >
                <Field validator={validator} field={key as any} />
              </div>
            ))}
          </div>
        ))}
      </div>
    ) : validators === SUSPENSE ? (
      validators
    ) : (
      <span className="text-body-2 text-gray-300">
        Not enough confidence to show results. Keep going!
      </span>
    ),
  ),
)
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
    <Button secondary onClick={() => onReset()} width="fit">
      Reset
    </Button>
  )
}

export const Results: React.FC = () => {
  const isGoodEnough = useStateObservable(isGoodEnough$)
  const isPerfect = useStateObservable(isPerfect$)
  const isInsufficient = useStateObservable(isInsufficient$)

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex h-6 items-center justify-between">
            <span className="text-h5 font-unbounded">Results</span>
            <Reset />
          </div>
        </div>
        <div className="flex gap-2 items-center text-body-2">
          <span className="font-inter">Confidence:</span>
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
      <Subscribe fallback={<Loading size={16} />}>{jsxResults$}</Subscribe>
    </div>
  )
}
