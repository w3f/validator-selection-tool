import { results$ } from "@/state"
import { Subscribe, SUSPENSE } from "@react-rxjs/core"
import { map } from "rxjs"
import { Loading } from "./Loading"
import { AccountIcon } from "@/Components/AccountIcon"
import { Field, sections } from "./ChooseValidator"

const jsxResults$ = results$.pipeState(
  map((validators) =>
    Array.isArray(validators) ? (
      <div className="flex flex-col gap-2 mt-4 text-body-2">
        {validators.slice(0, 15).map((validator) => (
          <div
            key={validator.address}
            className="flex items-center py-3 border-b-[1px]"
          >
            <AccountIcon small address={validator.address} />
            {Object.entries(sections).map(([key]) => (
              <div
                key={key}
                className="w-full body-2 flex flex-col gap-4 whitespace-nowrap h-fit items-center"
              >
                <Field validator={validator} field={key as any} />
              </div>
            ))}
          </div>
        ))}
      </div>
    ) : validators === SUSPENSE ? (
      validators
    ) : (
      <span className="text-body-2 text-gray-300">
        Not enough confidence to show results. Keep going!
      </span>
    ),
  ),
)

export const Results: React.FC = () => {
  return <Subscribe fallback={<Loading size={30} />}>{jsxResults$}</Subscribe>
}
