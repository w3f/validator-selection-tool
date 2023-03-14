import { onReset, results$ } from "@/state"
import Identicon from "@polkadot/react-identicon"
import { Subscribe, SUSPENSE } from "@react-rxjs/core"
import { map } from "rxjs"
import { Loading } from "./Loading"

const ValidatorListItem: React.FC<{ address: string }> = ({ address }) => {
  return (
    <li className="flex py-4">
      <Identicon value={address} size={35} theme="polkadot" />
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">{address}</p>
      </div>
    </li>
  )
}

const jsxResults$ = results$.pipeState(
  map((x) =>
    x === SUSPENSE
      ? x
      : x.map((result) => <ValidatorListItem key={result} address={result} />),
  ),
)

export const Results: React.FC = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Your Results
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Based on your answers, these are the list of validators that blah blah
        </p>

        <Subscribe fallback={<Loading size={30} />}>
          <ul role="list" className="divide-y mx-auto my-10 divide-gray-200">
            {jsxResults$}
          </ul>
        </Subscribe>
        <button
          type="button"
          className="inline-flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
          onClick={() => {
            onReset()
          }}
        >
          Reset
        </button>
      </div>
    </div>
  )
}
