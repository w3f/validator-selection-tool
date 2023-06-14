import { results$ } from "@/state"
import { Subscribe, SUSPENSE } from "@react-rxjs/core"
import { map } from "rxjs"
import { Loading } from "./Loading"
import { AccountIcon } from "@/Components/AccountIcon"

const jsxResults$ = results$.pipeState(
  map((x) =>
    Array.isArray(x) ? (
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-4 ">
        {x.slice(0, 15).map(({ address }) => (
          <div
            key={address}
            className="flex p-2 border-[1px] rounded-md justify-center"
          >
            <AccountIcon small address={address} />
          </div>
        ))}
      </div>
    ) : x === SUSPENSE ? (
      x
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
