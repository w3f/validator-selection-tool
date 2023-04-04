import { PolkadotIcon } from "@/Assets/Icons"

export default function Header() {
  return (
    <div className="flex gap-3 sticky top-0 bg-bg-default py-6 items-center border-b border-[#E9E9E9]">
      <PolkadotIcon />
      <div className="h-6 w-[2px] bg-gray-300" />
      <span className="text-xl font-[Unbounded]">Validator Picker</span>
    </div>
  )
}
