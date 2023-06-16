import {
  onReset,
  resultsState$,
  ResultsState,
  nSelected$,
  results$,
} from "@/state"
import { Subscribe, useStateObservable } from "@react-rxjs/core"
import { Loading } from "../Components/Loading"
import Button from "../Components/Button"
import Table from "./Table"
import { CheckIcon, CopyIcon } from "@/Assets/Icons"
import { useState } from "react"

const Reset: React.FC = () => {
  return (
    <Button small secondary onClick={() => onReset()}>
      Reset
    </Button>
  )
}

function Copy() {
  const [clicked, setClicked] = useState(false)
  return (
    <Button
      id="copyBtn"
      type="submit"
      onClick={() => {
        setClicked(true)
        setTimeout(() => {
          setClicked(false)
        }, 3000)
      }}
    >
      <div className="flex gap-2">
        {clicked ? <CheckIcon /> : <CopyIcon />}
        <span>{clicked ? "Copied to clipboard" : "Copy to clipboard"}</span>
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
      className="h-full w-full flex flex-col gap-10 pb-4 transition-all "
    >
      <div className="flex flex-col">
        <div className="h-fit flex items-center justify-between">
          <span className="text-h5 font-unbounded">Results</span>
          {resultsState > ResultsState.INSUFICIENT && (
            <div className="flex gap-4">
              <Reset />
              <Copy />
            </div>
          )}
        </div>
        <div className="flex gap-1.5 items-center text-body-2">
          <span>Selected:</span>
          <span className="font-semibold w-6 text-start">{nSelected$}</span>
          <span>Precision:</span>
          {resultsState === ResultsState.INSUFICIENT && (
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full  bg-orange-400" />
              <span className="font-semibold font-inter text-orange-400">
                Low
              </span>
            </div>
          )}
          {resultsState === ResultsState.GOOD_ENOUGH && (
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full  bg-green-500" />
              <span className="text-green-500 font-semibold font-inter">
                Good enough
              </span>
            </div>
          )}
          {resultsState === ResultsState.PERFECT && (
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full  bg-green-600" />
              <span className="text-green-600 font-semibold font-inter">
                Perfect
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="h-full overflow-scroll pb-12">
        <Subscribe fallback={<Loading size={16} />}>
          <Table />
        </Subscribe>
      </div>
    </form>
  )
}
