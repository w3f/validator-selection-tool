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
      <InformationalIcon className="text-foreground-dimmed" />
      {show && (
        <div className=" z-50 absolute flex flex-col items-center drop-shadow-md dark:drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] left-[50%] bottom-6 translate-x-[-50%] text-sm text-foreground-contrast">
          <div className="w-64 p-3 bg-background-float rounded-md whitespace-pre-wrap">
            {children}
          </div>
          <div className="border-solid border-t-background-float border-t-8 rounded-sm border-x-transparent border-x-8 border-b-0" />
        </div>
      )}
    </div>
  )
}
