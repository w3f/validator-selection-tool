import { CheckIcon } from "@/Assets/Icons"

interface CheckBoxProps {
  checked?: boolean
}

export default function CheckBox({ checked }: CheckBoxProps) {
  return (
    <input
      checked={checked}
      onChange={(e) => {
        let checkboxes = document.getElementsByName(
          "selectedAddress",
        ) as unknown as HTMLInputElement[]

        let allChecked = true

        for (let i = 0; i < checkboxes.length; i++) {
          checkboxes[i].checked === true
            ? (allChecked = true)
            : (allChecked = false)
        }

        checkboxes.forEach((checkbox) => {
          allChecked && e.currentTarget.checked === false
            ? (checkbox.checked = false)
            : (checkbox.checked = true)
        })
      }}
      className="w-full h-full"
      type="checkbox"
      name="mainCheckbox"
    />
  )
}
