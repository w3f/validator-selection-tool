import { Pair, ValidatorChoice } from "@/api"
import { ConfindenceLevel } from "./ConfidenceLevel"
import { AccountIcon } from "@/Components/AccountIcon"
import { Results } from "./Results"
import Button from "@/Components/Button"
import {
  state,
  SUSPENSE,
  useStateObservable,
  withDefault,
} from "@react-rxjs/core"
import {
  onReset,
  pair$,
  ResultsState,
  resultsState$,
  onUserSelection,
} from "@/state"
import { filter, map, noop } from "rxjs"
import Hero from "@/Components/Hero"
import Header from "@/Components/Header"

const sections = {
  clusterSize: "Cluster Size",
  comission: "Comission",
  eraPoints: "Era Points",
  selfStake: "Self Stake",
  totalStake: "Total Stake",
  voters: "Voters",
} as const

const Field: React.FC<{
  field: keyof ValidatorChoice["values"]
  validator: ValidatorChoice["values"] | null
}> = ({ validator, field }) => {
  if (!validator) return <>&nbsp;</>
  const append =
    field === "selfStake" || field === "totalStake"
      ? " DOT"
      : field === "comission"
      ? "%"
      : ""
  return <>{validator[field] + append}</>
}

const getValidator$ = state(
  (kind: "a" | "b") =>
    pair$.pipe(
      filter((pair): pair is Pair => pair !== SUSPENSE),
      map((pair) => pair[kind]),
    ),
  null,
)

const Column: React.FC<{
  kind: "a" | "b"
  right?: boolean
}> = ({ right, kind }) => {
  const validator = useStateObservable(getValidator$(kind))
  const onSelect = validator ? () => onUserSelection(validator) : noop

  return (
    <div className="flex flex-col w-full gap-6">
      <div
        className={`flex flex-col py-6 gap-6 items-center ${
          right ? "pr-6 bg-p-purple-100" : "pl-6 bg-p-pink-100"
        }`}
      >
        <div className="flex flex-col gap-4 items-center">
          <AccountIcon address="16ccn3xe5tAeR8kvzCRTcqHZjMJHvuF2pnLfTqyF1EmMusCU" />
        </div>
        <Button onClick={onSelect} secondary={right}>
          Select
        </Button>
      </div>
      {
        <div
          className={`flex flex-col gap-4 pb-6 text-body-2 font-semibold  ${
            right ? "items-start" : "items-end"
          } `}
        >
          {Object.entries(sections).map(([key], index, arr) => (
            <div
              key={key}
              className={`w-full body-2 flex flex-col gap-4 ${
                right ? "pr-6 items-start" : "pl-6 items-end"
              }`}
            >
              <Field validator={validator?.values ?? null} field={key as any} />
              {index < arr.length - 1 ? (
                <div className="w-full h-[1px] bg-gray-200" />
              ) : null}
            </div>
          ))}
        </div>
      }
    </div>
  )
}
const Center: React.FC<{}> = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex h-full flex-col items-center justify-end py-6 px-10 bg-gradient-to-r from-p-pink-100 to-p-purple-100">
        <span className="py-2 px-4 rounded-full shadow-[inset_0_0_0_2px_rgba(0,0,0,0.9)] text-body-2 font-unbounded">
          VS
        </span>
      </div>
      <div className="flex flex-col items-center gap-4 pb-6 text-body-2">
        {Object.entries(sections).map(([key, title], index) => (
          <div key={key} className="w-full flex flex-col items-center gap-4">
            {title}
            {index < Object.entries(sections).length - 1 ? (
              <div className="w-full h-[1px] bg-gray-200" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

const isInit$ = resultsState$.pipeState(
  map((x) => x === ResultsState.INIT),
  withDefault(true),
)

const Reset: React.FC = () => {
  const isInit = useStateObservable(isInit$)
  return isInit ? null : (
    <Button secondary onClick={() => onReset()} width="fit">
      Reset
    </Button>
  )
}

const isDone$ = resultsState$.pipeState(
  map((x) => x === ResultsState.PERFECT),
  withDefault(false),
)

const isLoading$ = pair$.pipeState(
  map((pair) => pair === SUSPENSE),
  withDefault(true),
)

const Picker: React.FC = () => {
  const isLoading = useStateObservable(isLoading$)

  return (
    <div className="w-full bg-white shadow-lg rounded-lg overflow-clip flex h-fit">
      {isLoading ? null : ""}
      <Column kind="a" />
      <Center />
      <Column kind="b" right />
    </div>
  )
}

export const ChooseValidator: React.FC = () => {
  const isDone = useStateObservable(isDone$)

  return (
    <div className="flex flex-col gap-18 bg-bg-default py-4 px-16 h-screen">
      <Header />
      <Hero />
      <div className="h-fit flex gap-16">
        {isDone ? (
          <div className="w-full bg-gray-200 rounded-lg flex items-center justify-center">
            <Button secondary width="fit" onClick={onReset}>
              Start over
            </Button>
          </div>
        ) : (
          <Picker />
        )}
        <div className="w-full flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <span className="text-h5 font-unbounded">Confidence Level</span>
            <ConfindenceLevel />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex h-6 items-center justify-between">
              <span className="text-h5 font-unbounded">Results</span>
              <Reset />
            </div>
            <Results />
          </div>
        </div>
      </div>
    </div>
  )
}
