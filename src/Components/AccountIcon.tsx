import Identicon from "@polkadot/react-identicon"
import { stringShorten } from "@polkadot/util"

export function AccountIcon({
  address,
  name,
  small,
  showAddress,
}: {
  address: string
  name?: string
  small?: boolean
  showAddress?: boolean
}) {
  const btnTitle = name || address
  return (
    <div
      className={`flex ${
        small ? "flex-row gap-1" : "flex-col gap-2"
      } items-center`}
    >
      <Identicon value={address} theme="polkadot" size={small ? 20 : 40} />
      {showAddress && (
        <div
          className={`${
            small ? "text-body-2 " : "text-body"
          } whitespace-nowrap`}
        >
          {stringShorten(btnTitle, 4)}
        </div>
      )}
    </div>
  )
}
