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
  })

export const ConfindenceLevel: React.FC = () => {
  const current = useStateObservable(latestQuality$)
  const prev = useStateObservable(prev$)

  const increase: boolean = prev !== null && current > prev

  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-3 w-full h-fit items-center bg-gray-200 rounded-full overflow-clip">
        {current < 0.85 ? (
          <>
            <div
              style={{ width: asPercent(current) }}
              className={`h-12 bg-primary`}
            />
            <p
              className={`text-h4 font-unbounded ${
                current === 0 ? "text-gray-400" : "text-gray-900"
              }`}
            >
              {asPercent(current)}
            </p>
          </>
        ) : (
          <div
            style={{ width: asPercent(current) }}
            className={`h-12 bg-primary flex items-center justify-end px-4 `}
          >
            <p className="text-h4 font-unbounded text-white">
              {asPercent(current)}
            </p>
          </div>
        )}
      </div>
      {current > 0 && prev !== null ? (
        <p
          className={classNames(
            increase ? "text-green-600" : "text-red-600",
            "ml-2 flex items-center font-unbounded text-h4 w-[84px] justify-end",
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
    </div>
  )
}
