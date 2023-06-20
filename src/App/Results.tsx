import { onReset, resultsState$, ResultsState, nSelected$ } from "@/state"
import { Subscribe, useStateObservable } from "@react-rxjs/core"
import { Loading } from "../Components/Loading"
import Button from "../Components/Button"
import { CheckIcon, CopyIcon } from "@/Assets/Icons"
import { lazy, useState } from "react"

const tablePromise = import("./Table")
const Table = lazy(() => tablePromise)

const Reset: React.FC = () => {
  return (
    <Button variant="ghost" small secondary onClick={() => onReset()}>
      Reset
    </Button>
  )
}

function Copy() {
  const [clicked, setClicked] = useState(false)
  return (
    <Button
      small
      id="copyBtn"
      type="submit"
      onClick={() => {
        setClicked(true)
        setTimeout(() => {
          setClicked(false)
        }, 3000)
      }}
    >
      <div className="flex gap-2 ">
        {clicked ? <CheckIcon /> : <CopyIcon />}
        <span className="">
          {clicked ? "Copied to clipboard" : "Copy to clipboard"}
        </span>
      </div>
    </Button>
  )
}

export const Results: React.FC = () => {
  const resultsState = useStateObservable(resultsState$)

  return (
    <form
      onChange={() => {
        const checkboxes = Array.from(
          document.querySelectorAll(
            'input[type="checkbox"]',
          ) as unknown as HTMLInputElement[],
        )

        const allUnChecked = [...checkboxes].every(
          (checkbox) => !checkbox.checked,
        )

        const copyBtn = document.getElementById(
          "copyBtn",
        ) as unknown as HTMLButtonElement

        copyBtn.disabled = allUnChecked
      }}
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()

        const selectedAddresses = Array.from(
          document.querySelectorAll(
            'input[name="selectedAddress"]:checked',
          ) as unknown as HTMLInputElement[],
        )
          .map((x) => x.value)
          .join(", ")

        navigator.clipboard.writeText(selectedAddresses)
      }}
      className="w-full flex flex-col gap-0 pb-4 transition-all"
    >
      <div className="sticky top-[-2px] flex flex-col gap-2 text-foreground-contrast bg-background-default pb-6">
        <div className="h-fit flex items-center justify-between ">
          <span className="text-lg md:text-xl leading-8 font-unbounded">
            Results
          </span>
          {resultsState > ResultsState.INSUFICIENT && (
            <div className="gap-4 hidden md:flex">
              <Reset />
              <Copy />
            </div>
          )}
        </div>
        <div className="flex gap-1.5 items-center text-sm">
          <span>Selected:</span>
          <span className="font-semibold w-6 text-start">{nSelected$}</span>
          <span>Precision:</span>
          {resultsState === ResultsState.INSUFICIENT && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full  bg-orange-400" />
              <span className="font-semibold text-orange-400">Low</span>
            </div>
          )}
          {resultsState === ResultsState.GOOD_ENOUGH && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full  bg-green-500" />
              <span className="text-green-500 font-semibold">Good enough</span>
            </div>
          )}
          {resultsState === ResultsState.PERFECT && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full  bg-green-600" />
              <span className="text-green-600 font-semibold">Perfect</span>
            </div>
          )}
        </div>
      </div>
      <Subscribe fallback={<Loading size={16} />}>
        <div className="overflow-y-clip overflow-x-scroll md:overflow-scroll md:pr-4 pb-20">
          <Table />
          {resultsState > ResultsState.INSUFICIENT && (
            <div className="w-full absolute drop-shadow-[0_-2px_6px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_-2px_6px_rgba(0,0,0,0.4)]  bottom-0 gap-4 h-fit px-4 py-6 bg-background-default left-0 justify-between flex md:hidden">
              <Reset />
              <Copy />
            </div>
          )}
        </div>
      </Subscribe>
    </form>
  )
}
