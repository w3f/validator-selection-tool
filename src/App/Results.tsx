import Button from "@/Components/Button"
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
    <div className="">
      <Subscribe fallback={<Loading size={30} />}>
        <ul role="list" className="divide-y mx-auto my-10 divide-gray-200">
          {jsxResults$}
        </ul>
      </Subscribe>
      <Button onClick={() => onReset()} width="fit">
        Reset
      </Button>
    </div>
  )
}
