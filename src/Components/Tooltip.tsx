import { useState } from "react"
import { InformationalIcon } from "../Assets/Icons"

interface TooltipProps {
  children: string
}

export default function Tooltip({ children }: TooltipProps) {
  const [show, setShow] = useState(false)

  return (
    <div
      className="block relative cursor-pointer"
      onMouseEnter={() => {
        setShow(true)
      }}
      onMouseLeave={() => {
        setShow(false)
      }}
    >
      <InformationalIcon className="text-gray-500" />
      {show && (
        <div className=" z-50 absolute flex flex-col items-center drop-shadow-md left-[50%] bottom-6 translate-x-[-50%] text-body-2 text-gray-700">
          <div className="w-64 p-3 bg-white rounded-md whitespace-pre-wrap">
            {children}
          </div>
          <div className="border-solid border-t-white border-t-8 rounded-sm border-x-transparent border-x-8 border-b-0" />
        </div>
      )}
    </div>
  )
}
