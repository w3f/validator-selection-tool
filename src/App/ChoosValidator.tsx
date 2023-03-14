import { Fragment } from "react"
import { ValidatorChoice } from "@/api"
import { ConfindenceLevel } from "./ConfidenceLevel"
import { loading } from "./Loading"

const sections = {
  clusterSize: "Cluster Size",
  comission: "Comission",
  eraPoints: "Era Points",
  selfStake: "Self Stake",
  totalStake: "Total Stake",
  voters: "Voters",
} as const

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

const Field: React.FC<{
  field: keyof ValidatorChoice["values"]
  data?: ValidatorChoice["values"]
}> = ({ data, field }) => {
  const value = data?.[field]
  if (value == null) return loading
  const append =
    field === "selfStake" || field === "totalStake"
      ? " DOT"
      : field === "comission"
      ? "%"
      : ""
  return <>{value + append}</>
}

export const ChooseValidator: React.FC<{
  onSelectA: () => void
  onSelectB: () => void
  a?: ValidatorChoice["values"]
  b?: ValidatorChoice["values"]
}> = ({ a, b, onSelectA, onSelectB }) => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose your preferred Validator
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Pay attention to the differences blah blah
        </p>

        {/* lg+ */}
        <div className="isolate mt-20">
          <div className="relative -mx-8">
            <table className="w-full table-fixed border-separate border-spacing-x-8 text-left">
              <caption className="sr-only">Validators comparison</caption>
              <colgroup>
                <col className="w-1/3" />
                <col className="w-1/3" />
                <col className="w-1/3" />
              </colgroup>
              <thead>
                <tr>
                  <td />
                  <th scope="col" className="px-6 pt-6 xl:px-8 xl:pt-8"></th>
                  <th scope="col" className="px-6 pt-6 xl:px-8 xl:pt-8"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <ConfindenceLevel />
                  </th>
                  {["Validator A", "Validator B"].map((validator, idx) => (
                    <td key={validator} className="px-6 pt-2 xl:px-8">
                      <div className="flex items-baseline gap-x-1 text-gray-900">
                        <span className="text-4xl font-bold">{validator}</span>
                      </div>
                      <a
                        onClick={idx ? onSelectB : onSelectA}
                        className="text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300
                          mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Select
                      </a>
                    </td>
                  ))}
                </tr>
                <Fragment>
                  <tr>
                    <th
                      scope="colgroup"
                      colSpan={4}
                      className={classNames(
                        "pt-8 pb-4 text-sm font-semibold leading-6 text-gray-900",
                      )}
                    >
                      Properties
                      <div className="absolute inset-x-8 mt-4 h-px bg-gray-900/10" />
                    </th>
                  </tr>
                  {Object.entries(sections).map(([key, title]) => (
                    <tr key={key}>
                      <th
                        scope="row"
                        className="py-4 text-sm font-normal leading-6 text-gray-900"
                      >
                        {title}
                        <div className="absolute inset-x-8 mt-4 h-px bg-gray-900/5" />
                      </th>
                      <td className="py-4 px-6 xl:px-8">
                        <div className="text-center text-sm leading-6 text-gray-500">
                          <Field data={a} field={key as any} />
                        </div>
                      </td>
                      <td className="py-4 px-6 xl:px-8">
                        <div className="text-center text-sm leading-6 text-gray-500">
                          <Field data={b} field={key as any} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </Fragment>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
