import { ValidatorChoice } from "@/api"
import { ConfindenceLevel } from "./ConfidenceLevel"
import { loading } from "./Loading"
import { PolkadotIcon } from "@/Assets/Icons"
import { Accounticon } from "@/Components/AccountIcon"
import { Results } from "./Results"
import Button from "@/Components/Button"
import { useStateObservable, withDefault } from "@react-rxjs/core"
import { onReset, ResultsState, resultsState$ } from "@/state"
import { map } from "rxjs"

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
  data?: ValidatorChoice["values"]
}> = ({ data, field }) => {
  const value = data?.[field]
  if (value == null) return loading
  const append =
    field === "selfStake" || field === "totalStake"
      ? " DOT"
      : field === "comission"
      ? "%"
      : ""
  return <>{value + append}</>
}

const Column: React.FC<{
  right?: boolean
  data?: ValidatorChoice["values"]
  onSelect?: () => void
}> = ({ right, data, onSelect }) => {
  return (
    <div className="flex flex-col w-full gap-6">
      <div
        className={`flex flex-col py-6 gap-6 items-center ${
          right ? "pr-6 bg-p-purple-100" : "pl-6 bg-p-pink-100"
        }`}
      >
        <div className="flex flex-col gap-4 items-center">
          <Accounticon address="16ccn3xe5tAeR8kvzCRTcqHZjMJHvuF2pnLfTqyF1EmMusCU" />
        </div>
        <Button onClick={onSelect} secondary={right}>
          Select
        </Button>
      </div>
      <div
        className={`flex flex-col gap-4 pb-6 text-body-2 font-semibold  ${
          right ? "items-start" : "items-end"
        } `}
      >
        {Object.entries(sections).map(([key], index) => (
          <div
            key={key}
            className={`w-full body-2 flex flex-col gap-4 ${
              right ? "pr-6 items-start" : "pl-6 items-end"
            }`}
          >
            <Field data={data} field={key as any} />
            {index < Object.entries(sections).length - 1 ? (
              <div className="w-full h-[1px] bg-gray-200" />
            ) : null}
          </div>
        ))}
      </div>
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
    <Button onClick={() => onReset()} width="fit">
      Reset
    </Button>
  )
}

const isDone$ = resultsState$.pipeState(
  map((x) => x === ResultsState.PERFECT),
  withDefault(false),
)

export const ChooseValidator: React.FC<{
  onSelectA: () => void
  onSelectB: () => void
  a?: ValidatorChoice["values"]
  b?: ValidatorChoice["values"]
}> = ({ a, b, onSelectA, onSelectB }) => {
  const isDone = useStateObservable(isDone$)

  return (
    <div className="flex flex-col gap-18 bg-bg-default py-4 px-16">
      <div className="flex gap-3 items-center">
        <PolkadotIcon />
        <div className="h-6 w-[2px] bg-gray-300" />
        <span className="text-xl font-[Unbounded]">Validator Picker</span>
      </div>
      <div className="flex flex-col items-start gap-4 w-1/2 mt-0 mb-4">
        <span className="text-h3 font-unbounded">
          Refine your validator set
        </span>
        <span className="text-body-2">
          This tool is designed to help you choose the Validators that are
          better suited for your preferences.
          <div className="mb-3" />
          We are going to ask you to decide between a few (5-8) pairs of
          validators and we are going to provide you with a list of suggested
          addresses based on your personal preferences.
        </span>
      </div>
      <div className="flex gap-16">
        {!isDone ? (
          <div className="w-full bg-white shadow-lg rounded-lg overflow-clip flex h-fit">
            <Column data={a} onSelect={onSelectA} />
            <Center />
            <Column data={b} onSelect={onSelectB} right />
          </div>
        ) : (
          <div className="w-full bg-gray-200 rounded-lg flex items-center justify-center">
            <Button secondary width="fit" onClick={onReset}>
              Start over
            </Button>
          </div>
        )}
        <div className="w-full flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <span className="text-h5 font-unbounded">Confidence Level</span>
            <ConfindenceLevel />
          </div>
          <div className="flex flex-col gap-4">
            <Reset />
            <Results />
          </div>
        </div>
      </div>
    </div>
  )
}
