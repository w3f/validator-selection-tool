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
        <div className="max-w-[180px] absolute flex flex-col items-center drop-shadow-md left-[50%] bottom-6 translate-x-[-50%] text-body-2 text-gray-500">
          <div className="w-full p-3 bg-white  rounded-sm">{children}</div>
          <div className="border-solid border-t-white border-t-8 rounded-sm border-x-transparent border-x-8 border-b-0" />
        </div>
      )}
    </div>
  )
}
