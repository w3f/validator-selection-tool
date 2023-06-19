import Button from "@/Components/Button"
import { state, useStateObservable } from "@react-rxjs/core"
import { pair$, onUserSelection } from "@/state"
import { map, noop } from "rxjs"
import { ValidatorData } from "@/api"
import Tooltip from "@/Components/Tooltip"

export const sections = {
  selfStake: "Self Stake",
  commission: "Commission",
  avgEraPoints: "Avg. Era Points",
  clusterSize: "Cluster Size",
  votes: "Votes",
} as const

export const tooltips = {
  votes:
    "The number of nominators that are voting for that validator (before the election algorithm).",
  clusterSize:
    "The number of validators an operator has, based on simple string comparison of their names.",
  commission: "The cut the validator takes for their services.",
  avgEraPoints:
    "The performance measure of a validator as average over a longer period. The higher, the better.",
  selfStake:
    "The amount of stake that the validator is using to nominate themselves. Can be regarded as skin-in-the-game. Generally, the higher the better.",
} as const

export const Field: React.FC<{
  field: keyof ValidatorData
  validator: ValidatorData | null
  className?: string
}> = ({ validator, field, className }) => {
  if (!validator) return <>&nbsp;</>
  const append =
    field === "selfStake" ? " DOT" : field === "commission" ? "%" : ""
  return (
    <div className={className}>{validator[field]?.toFixed(0) + append}</div>
  )
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
    <div
      className={`overflow-clip  w-full flex flex-col-reverse md:flex-col gap-0 md:gap-4 pt-6 md:pt-0 md:pb-6 font-semibold   ${
        right ? "items-start" : "items-end"
      } `}
    >
      <div
        className={`w-full flex flex-col py-3 md:py-6 gap-6 items-center ${
          right
            ? "pr-3 md:pr-6 bg-pPurple-100 dark:bg-pPurple-950 rounded-br-lg rounded-tr-none md:rounded-tr-lg md:rounded-br-none"
            : "pl-3 md:pl-6 bg-pPink-100 dark:bg-pPink-950 rounded-bl-lg rounded-tl-none md:rounded-tl-lg md:rounded-bl-none"
        }`}
      >
        <Button
          className="w-full "
          onClick={onSelect}
          fullPink={!right}
          variant={right ? "fullPurple" : "fullPink"}
          secondary={right}
        >
          {kind === "a" ? "A" : "B"}
        </Button>
      </div>
      <div className="w-full flex flex-col gap-6">
        {Object.entries(sections).map(([key], index, arr) => (
          <div
            key={key}
            className={`w-full body-2 flex flex-col gap-4 ${
              right ? "pr-3 md:pr-6 items-start" : "pl-3 md:pl-6 items-end"
            }`}
          >
            <Field validator={validator} field={key as any} />
            {index < arr.length - 1 ? (
              <div className="w-full h-[1px] bg-fill-separator" />
            ) : (
              <div className="pb-1.5 block md:hidden" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
function Center() {
  return (
    <div className="flex flex-col-reverse md:flex-col items-center gap-0 md:gap-4 pt-6 md:pt-0 md:pb-6">
      <div className="flex w-full items-center py-3 md:py-6 px-4 md:px-6 bg-gradient-to-r from-pPink-100 to-pPurple-100 dark:from-pPink-950 dark:to-pPurple-950">
        <div className="w-full h-[2px] flex items-center gap-2 bg-border-contrast" />
        <span className="py-3 px-4 md:px-6 w-full rounded-full text-center shadow-[inset_0_0_0_2px_rgba(0,0,0,0.9)] dark:shadow-[inset_0_0_0_2px_rgba(255,255,255,0.9)] font-unbounded">
          VS
        </span>
        <div className="w-full h-[2px] flex items-center gap-2 bg-border-contrast" />
      </div>
      <div className="w-full flex flex-col gap-6">
        {Object.entries(sections).map(([key, title], index) => {
          const typedKey = key as keyof typeof sections
          return (
            <div key={key} className="w-full flex flex-col items-center gap-4">
              <div className="flex justify-between w-full items-center gap-2 whitespace-nowrap px-4 md:px-6">
                {title}
                <Tooltip>{tooltips[typedKey]}</Tooltip>
              </div>
              {index < Object.entries(sections).length - 1 ? (
                <div className="w-full h-[1px] bg-fill-separator" />
              ) : (
                <div className="pb-1.5 block md:hidden" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Picker() {
  return (
    <div
      className={`w-full h-fit bg-background-float text-sm text-foreground-contrast border-background-float border-[1px] rounded-lg flex shadow-lg`}
    >
      <Column kind="a" />
      <Center />
      <Column kind="b" right />
    </div>
  )
}
