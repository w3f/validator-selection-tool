import { AccountIcon } from "@/Components/AccountIcon"
import Button from "@/Components/Button"
import { state, useStateObservable, withDefault } from "@react-rxjs/core"
import { pair$, ResultsState, resultsState$, onUserSelection } from "@/state"
import { map, noop } from "rxjs"
import { ValidatorData } from "@/api"

export const sections = {
  votes: "Votes",
  clusterSize: "Cluster Size",
  commission: "Commission",
  avgEraPoints: "Avg. Era Points",
  selfStake: "Self Stake",
} as const

export const Field: React.FC<{
  field: keyof ValidatorData
  validator: ValidatorData | null
}> = ({ validator, field }) => {
  if (!validator) return <>&nbsp;</>
  const append =
    field === "selfStake" ? " DOT" : field === "commission" ? "%" : ""
  return <>{validator[field] + append}</>
}

const getValidator$ = state(
  (kind: "a" | "b") => pair$.pipe(map(({ pair }) => pair && pair[kind])),
  null,
)

const Column: React.FC<{
  kind: "a" | "b"
  right?: boolean
}> = ({ right, kind }) => {
  const validator = useStateObservable(getValidator$(kind))
  const onSelect = validator ? () => onUserSelection(kind) : noop

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
              <Field validator={validator} field={key as any} />
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
export default function Picker() {
  return (
    <div
      className={`w-full h-fit bg-white border-white border-[1px] rounded-lg overflow-clip flex shadow-lg`}
    >
      <Column kind="a" />
      <Center />
      <Column kind="b" right />
    </div>
  )
}
