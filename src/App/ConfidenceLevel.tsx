import { latestQuality$ } from "@/state"
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid"
import { useStateObservable, withDefault } from "@react-rxjs/core"
import { map, scan } from "rxjs"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

const prev$ = latestQuality$.pipeState(
  scan((acc, current) => ({ current, prev: acc.current }), {
    current: 0,
    prev: 0,
  }),
  map((x) => x.prev),
  withDefault(null),
)

const asPercent = (value: number) =>
  value.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 2,
  })

export const ConfindenceLevel: React.FC = () => {
  const current = useStateObservable(latestQuality$)
  const prev = useStateObservable(prev$)

  const increase: boolean = prev !== null && current > prev

  return (
    <div className="relative overflow-hidden rounded-lg bg-white">
      <dt>
        <p className="truncate text-sm font-medium text-gray-500">
          Confidence Level
        </p>
      </dt>
      <dd className="flex items-baseline pb-6 sm:pb-7">
        <p className="text-2xl font-semibold text-gray-900">
          {asPercent(current)}
        </p>
        {current > 0 && prev !== null ? (
          <p
            className={classNames(
              increase ? "text-green-600" : "text-red-600",
              "ml-2 flex items-baseline text-sm font-semibold",
            )}
          >
            {increase ? (
              <ArrowUpIcon
                className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                aria-hidden="true"
              />
            ) : (
              <ArrowDownIcon
                className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                aria-hidden="true"
              />
            )}
            <span className="sr-only">
              {" "}
              {increase ? "Increased" : "Decreased"} by{" "}
            </span>
            {asPercent(Math.abs(current - prev))}
          </p>
        ) : null}
      </dd>
    </div>
  )
}
