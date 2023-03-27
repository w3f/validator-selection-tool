import Identicon from "@polkadot/react-identicon"
import { stringShorten } from "@polkadot/util"

export function Accounticon({
  address,
  name,
}: {
  address: string
  name?: string
}) {
  const btnTitle = name || address
  return (
    <div className="flex flex-col items-center gap-2">
      <Identicon value={address} theme="polkadot" size={40} />
      <div className="text-h5 font-unbounded">{stringShorten(btnTitle, 4)}</div>
    </div>
  )
}
