import { AccountIcon } from "@/Components/AccountIcon"
import { results$, resultsState$, ResultsState } from "@/state"
import { SUSPENSE, useStateObservable, withDefault } from "@react-rxjs/core"
import { map, scan, startWith, switchMap } from "rxjs"
import { sections, Field } from "./Picker"
import { RightArrowIcon } from "@/Assets/Icons"
import { createSignal } from "@react-rxjs/utils"

const isPerfect$ = resultsState$.pipeState(
  map((x) => x === ResultsState.PERFECT),
  withDefault(false),
)

const [toggleValidator$, onToggleValidtor] = createSignal<string>()

const MAX_SELECTED_VALIDATORS = 16
export const selectedValidators$ = results$.pipeState(
  map(
    (results) =>
      new Set(
        Array.isArray(results)
          ? results.slice(0, MAX_SELECTED_VALIDATORS).map((v) => v.address)
          : [],
      ),
  ),
  switchMap((newValidators) => {
    return toggleValidator$.pipe(
      scan((selectedValidators, toogledValidator) => {
        if (
          selectedValidators.size === MAX_SELECTED_VALIDATORS &&
          !selectedValidators.has(toogledValidator)
        )
          return selectedValidators

        const result = new Set(selectedValidators)

        if (selectedValidators.has(toogledValidator))
          result.delete(toogledValidator)
        else result.add(toogledValidator)

        return result
      }, newValidators),
      startWith(newValidators),
    )
  }),
)
selectedValidators$.subscribe()

const [moarValidators$, onMoarValidators] = createSignal()
const nValidatorsToDisplay$ = resultsState$.pipeState(
  switchMap(() =>
    moarValidators$.pipe(
      scan((acc) => acc + MAX_SELECTED_VALIDATORS, MAX_SELECTED_VALIDATORS),
      startWith(MAX_SELECTED_VALIDATORS),
    ),
  ),
)
nValidatorsToDisplay$.subscribe()

export function Table() {
  const isPerfect = useStateObservable(isPerfect$)
  const nValidatorsToDisplay = useStateObservable(nValidatorsToDisplay$)
  const selectedValidators = useStateObservable(selectedValidators$)
  const validators = useStateObservable(results$)

  return Array.isArray(validators) ? (
    <>
      <div className=" pr-0 w-full whitespace-nowrap text-sm text-foreground-contrast leading-5 flex md:pl-[2px]">
        <div className=" w-fit flex flex-col">
          <span className="md:top-0 text-xs leading-5 border-b-[1px] border-fill-separator pb-2 bg-background-default">
            <div className="w-5 h-5 mr-3"></div>
          </span>
          {validators.slice(0, nValidatorsToDisplay).map((validator) => (
            <div
              key={validator.address}
              className="flex items-center pt-[18px] pb-[22px] border-b-[1px] border-border-hint"
            >
              <div className="w-4 h-4 flex items-center justify-center mr-3">
                <input
                  className="appearance-none text-foreground-primary w-full h-full rounded-sm focus:ring-0 shadow-none bg-background-dip  border-border-hint"
                  onChange={() => onToggleValidtor(validator.address)}
                  checked={selectedValidators.has(validator.address)}
                  type="checkbox"
                  value={validator.address}
                  name="selectedAddress"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col">
          <span className="md:top-0 text-xs leading-5 text-foreground-dimmed bg-background-default border-b-[1px] border-fill-separator pb-2">
            Account
          </span>
          {validators.slice(0, nValidatorsToDisplay).map((validator, index) => (
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
          <span className="md:top-0 text-xs leading-5 text-foreground-dimmed bg-background-default pr-4 border-b-[1px] border-fill-separator pb-2 ">
            Score
          </span>
          {validators.slice(0, nValidatorsToDisplay).map((validator) => (
            <div
              key={validator.address}
              className="w-full flex items-center pb-5 pt-4 border-b-[1px] border-fill-separator pr-4"
            >
              {validator.score.toFixed(2)}
            </div>
          ))}
        </div>
        {Object.entries(sections).map(([key, title], index) => (
          <div key={key} className="w-full flex flex-col">
            <span
              className={`md:top-0 text-xs leading-5 text-foreground-dimmed bg-background-default border-b-[1px] border-fill-separator pb-2  ${
                index === Object.values(sections).length - 1
                  ? "text-right w-full"
                  : "pr-4"
              }`}
            >
              {title}
            </span>
            {validators.slice(0, nValidatorsToDisplay).map((validator) => (
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
        onClick={onMoarValidators}
      >
        <span>Load 16 more</span>
        <RightArrowIcon size="12" />
      </button>
    </>
  ) : validators === SUSPENSE ? (
    validators
  ) : (
    <span className="text-sm text-foreground-disabled">
      Not enough precision to show results. Keep going!
    </span>
  )
}
