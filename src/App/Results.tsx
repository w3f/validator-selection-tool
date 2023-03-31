import { results$, ResultsState, resultsState$ } from "@/state"
import Identicon from "@polkadot/react-identicon"
import { Subscribe, useStateObservable, withDefault } from "@react-rxjs/core"
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
    Array.isArray(x)
      ? x.map((result) => <ValidatorListItem key={result} address={result} />)
      : x,
  ),
)

const isTitleVisible$ = resultsState$.pipeState(
  map((x) => x > ResultsState.INSUFICIENT),
  withDefault(false),
)

export const Results: React.FC = () => {
  const isTitleVisible = useStateObservable(isTitleVisible$)
  return (
    <>
      {isTitleVisible && (
        <span className="text-h5 font-unbounded">Results</span>
      )}
      <Subscribe fallback={<Loading size={30} />}>
        <ul role="list" className="divide-y mx-auto my-10 divide-gray-200">
          {jsxResults$}
        </ul>
      </Subscribe>
    </>
  )
}
