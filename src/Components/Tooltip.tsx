import { useState } from "react"
import { InformationalIcon } from "../Assets/Icons"

interface TooltipProps {
  children: string
}

export default function Tooltip({ children }: TooltipProps) {
  const [show, setShow] = useState(false)

  return (
    <div
      className="block relative"
      onMouseEnter={() => {
        setShow(true)
      }}
      onMouseLeave={() => {
        setShow(false)
      }}
    >
      <InformationalIcon className="text-gray-500" />
      {show && (
        <div className="max-w-[180px] absolute left-[50%] bottom-6 translate-x-[-50%] text-body-2 text-gray-500">
          <div className="w-full p-3 bg-white shadow-md">{children}</div>
        </div>
      )}
    </div>
  )
}
