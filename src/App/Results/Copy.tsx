import { useState } from "react"
import { map, take } from "rxjs"
import { useStateObservable, withDefault } from "@react-rxjs/core"
import Button from "@/Components/Button"
import { CheckIcon, CopyIcon } from "@/Assets/Icons"
import { selectedValidators$ } from "./Table"

const disabled$ = selectedValidators$.pipeState(
  map((v) => v.size === 0),
  withDefault(true),
)

export function Copy() {
  const isDisabled = useStateObservable(disabled$)
  const [clicked, setClicked] = useState(false)
  return (
    <Button
      small
      id="copyBtn"
      type="submit"
      disabled={isDisabled}
      onClick={() => {
        selectedValidators$.pipe(take(1)).subscribe((selected) => {
          const selectedAddresses = [...selected].join()
          navigator.clipboard.writeText(selectedAddresses)
        })

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
