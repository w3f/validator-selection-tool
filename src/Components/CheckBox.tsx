import { CheckIcon } from "@/Assets/Icons"

interface CheckBoxProps {
  checked?: boolean
  onChange?: () => void
}

export default function CheckBox({ checked, onChange }: CheckBoxProps) {
  return (
    <div className="w-5 h-5 p-[2px] mr-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`w-full h-full rounded-sm border-[1px] border-gray-300 ${
          checked && "bg-secondary border-secondary text-white"
        }`}
      />
    </div>
  )
}
