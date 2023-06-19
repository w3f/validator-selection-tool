import { AccountIcon } from "@/Components/AccountIcon"
import { results$, resultsState$, ResultsState } from "@/state"
import { SUSPENSE, useStateObservable, withDefault } from "@react-rxjs/core"
import { map } from "rxjs"
import { sections, Field } from "./Picker"
import { useState } from "react"
import { RightArrowIcon } from "@/Assets/Icons"

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
          <div className="w-full whitespace-nowrap text-sm text-foreground-contrast leading-5 flex pl-[2px]">
            <div className="w-fit flex flex-col">
              <span className="sticky top-0 text-xs leading-5 border-b-[1px] border-fill-separator pb-2 bg-background-default">
                <div className="w-5 h-5 mr-3">
                  <input
                    defaultChecked={true}
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
                    className="bg-background-dip  appearance-none text-foreground-primary rounded-sm focus:ring-0 border-border-hint"
                    type="checkbox"
                    name="mainCheckbox"
                  />
                </div>
              </span>
              {validators.slice(0, items).map((validator) => (
                <div
                  key={validator.address}
                  className="flex items-center pt-[18px] pb-[22px] border-b-[1px] border-border-hint"
                >
                  <div className="w-4 h-4 flex items-center justify-center mr-3">
                    <input
                      defaultChecked={true}
                      className="appearance-none text-foreground-primary w-full h-full rounded-sm focus:ring-0 shadow-none bg-background-dip  border-border-hint"
                      onChange={(e) => {
                        const mainCheckbox = document.getElementsByName(
                          "mainCheckbox",
                        ) as unknown as HTMLInputElement[]
                        e.currentTarget.checked === false &&
                          (mainCheckbox[0].checked = false)

                        const checkboxes = document.getElementsByName(
                          "selectedAddress",
                        ) as unknown as HTMLInputElement[]

                        const allChecked = [...checkboxes].every(
                          (checkbox) => checkbox.checked,
                        )

                        allChecked && (mainCheckbox[0].checked = true)
                      }}
                      type="checkbox"
                      value={validator.address}
                      name="selectedAddress"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full flex flex-col">
              <span className="sticky top-0 text-xs leading-5 text-foreground-dimmed bg-background-default border-b-[1px] border-fill-separator pb-2">
                Account
              </span>
              {validators.slice(0, items).map((validator, index) => (
                <div
                  key={validator.address}
                  className="w-full flex items-center gap-2 pb-5 pt-4 pr-8 border-b-[1px] border-fill-separator"
                >
                  <span className="w-4 ">{index + 1}</span>
                  <AccountIcon
                    small
                    showAddress={isPerfect}
                    address={validator.address}
                  />
                </div>
              ))}
            </div>
            <div className="w-full flex flex-col">
              <span className="sticky top-0 text-xs leading-5 text-foreground-dimmed bg-background-default pr-4 border-b-[1px] border-fill-separator pb-2 ">
                Score
              </span>
              {validators.slice(0, items).map((validator) => (
                <div
                  key={validator.address}
                  className="w-full flex items-center pb-5 pt-4 border-b-[1px] border-fill-separator pr-4"
                >
                  {validator.score.toFixed(2)}
                </div>
              ))}
            </div>
            {Object.entries(sections).map(([key, title], index) => (
              <div className="w-full flex flex-col">
                <span
                  className={`sticky top-0 text-xs leading-5 text-foreground-dimmed bg-background-default border-b-[1px] border-fill-separator pb-2  ${
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
                    className="w-full flex items-center pb-5 pt-4 border-b-[1px] border-fill-separator"
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
            className="text-sm text-foreground-contrast py-4 font-semibold flex gap-2 items-center hover:gap-3 transition-all duration-100"
            onClick={() => setItems((prev) => prev + 16)}
          >
            <span>Load 16 more</span>
            <RightArrowIcon size="12" />
          </button>
        </>
      ) : validators === SUSPENSE ? (
        validators
      ) : (
        <span className="text-sm text-foreground-dimmed">
          Not enough precision to show results. Keep going!
        </span>
      ),
    ),
  )
}
