import { Fragment } from "react"
import { ValidatorChoice } from "@/api"
import { ConfindenceLevel } from "./ConfidenceLevel"
import { loading } from "./Loading"
import { PolkadotIcon } from "@/Assets/Icons"
import { Accounticon } from "@/Components/AccountIcon"

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

const Column: React.FC<{
  right?: boolean
  data?: ValidatorChoice["values"]
}> = ({ right, data }) => {
  return (
    <div className="flex flex-col w-full gap-6">
      <div
        className={`flex flex-col py-6 gap-6 items-center ${
          right ? "pr-6 bg-p-purple-100" : "pl-6 bg-p-pink-100"
        }`}
      >
        <div className="flex flex-col gap-4 items-center">
          <Accounticon address="16ccn3xe5tAeR8kvzCRTcqHZjMJHvuF2pnLfTqyF1EmMusCU" />
        </div>
        <Button secondary={right}>Select</Button>
      </div>
      <div
        className={`flex flex-col  gap-6 pb-6 text-body-2 ${
          right ? "items-start" : "items-end"
        } `}
      >
        {Object.entries(sections).map(([key]) => (
          <div key={key} className="body-2">
            <Field data={data} field={key as any} />
          </div>
        ))}
      </div>
    </div>
  )
}
const Center: React.FC<{
  right?: boolean
  a?: ValidatorChoice["values"]
  b?: ValidatorChoice["values"]
}> = ({ right, a, b }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex h-full flex-col items-center justify-end py-6 px-10 bg-gradient-to-r from-p-pink-100 to-p-purple-100">
        <span className="py-2 px-4 rounded-full shadow-[inset_0_0_0_2px_rgba(0,0,0,0.9)] text-body-2 font-unbounded">
          VS
        </span>
      </div>
      <div className="flex flex-col items-center gap-6 pb-6 text-body-2">
        {Object.entries(sections).map(([key, title]) => (
          <div key={key}>{title}</div>
        ))}
      </div>
    </div>
  )
}

const Button: React.FC<{
  children?: JSX.Element | string
  secondary?: boolean
}> = ({ children, secondary }) => {
  return (
    <button
      className={`py-2 w-full rounded-full text-body-2 text-white ${
        secondary ? "bg-secondary" : "bg-primary"
      } `}
    >
      {children}
    </button>
  )
}

export const ChooseValidator: React.FC<{
  onSelectA: () => void
  onSelectB: () => void
  a?: ValidatorChoice["values"]
  b?: ValidatorChoice["values"]
}> = ({ a, b, onSelectA, onSelectB }) => {
  return (
    <div className="flex flex-col gap-12 bg-bg-default py-4 px-16">
      <div className="flex gap-3 items-center">
        <PolkadotIcon />
        <div className="h-6 w-[2px] bg-gray-300" />
        <span className="text-xl font-[Unbounded]">Validator Picker</span>
      </div>
      <div className="flex flex-col gap-4 w-1/2">
        <span className="text-h3 font-unbounded">
          Refine your validator set
        </span>
        <span className="text-body">
          This tool is designed to help you choose the Validators that are
          better suited for your preferences.
          <div className="mb-3" />
          We are going to ask you to decide between a few (5-8) pairs of
          validators and we are going to provide you with a list of suggested
          addresses based on your personal preferences.
        </span>
      </div>
      <div className="flex gap-16">
        <div className="w-full bg-white shadow-lg rounded-lg overflow-clip flex h-fit">
          <Column data={a} />
          <Center />
          <Column data={b} right />
        </div>
        <div className="w-full flex flex-col gap-16">
          <div className=" flex flex-col gap-4">
            <span className="text-h5 font-unbounded">Confidence Level</span>
            <ConfindenceLevel />
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-h5 font-unbounded">Results</span>
            validators list/grid
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
