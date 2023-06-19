import { PolkadotIcon } from "@/Assets/Icons"
import Button from "@/Components/Button"
import ThemeSwitch from "@/Components/ThemeSwitch"

export default function Header() {
  return (
    <div className="w-full flex justify-between sticky top-0 bg-background-default text-foreground-contrast py-6  md:py-10 items-center">
      <div className="flex gap-3 items-center">
        <PolkadotIcon />
        <div className="h-6 w-[2px] bg-fill-separator" />
        <span className="text-xl font-unbounded">Validator Selector</span>
      </div>
      <ThemeSwitch />
    </div>
  )
}
