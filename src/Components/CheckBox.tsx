import { CheckIcon } from "@/Assets/Icons"

interface CheckBoxProps {
  onChange: (e: any) => void
  value: string
}

export default function CheckBox({ onChange, value }: CheckBoxProps) {
  return (
    <div className="w-5 h-5 p-[2px] mr-3">
      <input
        defaultChecked={true}
        onChange={onChange}
        className="w-full h-full"
        type="checkbox"
        value={value}
        name="selectedAddress"
      />
    </div>
  )
}
