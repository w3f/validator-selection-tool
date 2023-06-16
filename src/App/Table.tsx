import { AccountIcon } from "@/Components/AccountIcon"
import { results$, resultsState$, ResultsState } from "@/state"
import { SUSPENSE, useStateObservable, withDefault } from "@react-rxjs/core"
import { map } from "rxjs"
import { sections, Field } from "./Picker"
import { useState } from "react"

const isPerfect$ = resultsState$.pipeState(
  map((x) => x === ResultsState.PERFECT),
  withDefault(false),
)

export default function Table() {
  const isPerfect = useStateObservable(isPerfect$)
  const [items, setItems] = useState(16)
  return results$.pipeState(
    map((validators) =>
      Array.isArray(validators) ? (
        <>
          <div className="w-full whitespace-nowrap text-body-2 leading-5 flex ">
            <div className="w-fit flex flex-col gap-2">
              <span className="sticky top-0 text-caption bg-bg-default border-b-[1px] pb-1 ">
                <div className="w-5 h-5 p-[2px] mr-3">
                  <input
                    onChange={() => {
                      const checkboxes = document.getElementsByName(
                        "selectedAddress",
                      ) as unknown as HTMLInputElement[]

                      const allChecked = [...checkboxes].every(
                        (checkbox) => checkbox.checked,
                      )

                      checkboxes.forEach((checkbox) => {
                        checkbox.checked = !allChecked
                      })
                    }}
                    className="w-full h-full"
                    type="checkbox"
                    name="mainCheckbox"
                  />
                </div>
              </span>
              {validators.slice(0, items).map((validator) => (
                <div
                  key={validator.address}
                  className=" flex items-center pb-4 pt-3 border-b-[1px]"
                >
                  <div className="w-5 h-5 p-[2px] mr-3">
                    <input
                      onChange={(e) => {
                        const mainCheckbox = document.getElementsByName(
                          "mainCheckbox",
                        ) as unknown as HTMLInputElement[]
                        e.currentTarget.checked === false &&
                          (mainCheckbox[0].checked = false)
                      }}
                      className="w-full h-full"
                      type="checkbox"
                      value={validator.address}
                      name="selectedAddress"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full flex flex-col gap-2">
              <span className="sticky top-0 text-caption text-gray-400 bg-bg-default border-b-[1px] pb-1">
                Account
              </span>
              {validators.slice(0, items).map((validator) => (
                <div
                  key={validator.address}
                  className="w-full flex items-center pb-4 pt-3 pr-8 border-b-[1px]"
                >
                  <AccountIcon
                    small
                    showAddress={isPerfect}
                    address={validator.address}
                  />
                </div>
              ))}
            </div>
            <div className="w-full flex flex-col gap-2 ">
              <span className="sticky top-0 text-caption text-gray-400 bg-bg-default pr-4 border-b-[1px] pb-1 ">
                Score
              </span>
              {validators.slice(0, items).map((validator) => (
                <div
                  key={validator.address}
                  className="w-full flex items-center pb-4 pt-3 border-b-[1px] pr-4"
                >
                  {validator.score.toFixed(2)}
                </div>
              ))}
            </div>
            {Object.entries(sections).map(([key, title], index) => (
              <div className="w-full flex flex-col gap-2">
                <span
                  className={`sticky top-0 text-caption text-gray-400 bg-bg-default border-b-[1px] pb-1  ${
                    index === Object.values(sections).length - 1
                      ? "text-right w-full"
                      : "pr-4"
                  }`}
                >
                  {title}
                </span>
                {validators.slice(0, items).map((validator) => (
                  <div
                    key={validator.address}
                    className="w-full flex items-center pb-4 pt-3 border-b-[1px]"
                  >
                    <Field
                      className={
                        index === Object.values(sections).length - 1
                          ? "text-right w-full"
                          : "pr-4"
                      }
                      validator={validator}
                      field={key as any}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button
            className="text-body-2"
            onClick={() => setItems((prev) => prev + 16)}
          >
            Load 16 more
          </button>
        </>
      ) : validators === SUSPENSE ? (
        validators
      ) : (
        <span className="text-body-2 text-gray-300">
          Not enough precision to show results. Keep going!
        </span>
      ),
    ),
  )
}
