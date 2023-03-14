import React from "react"

export const Loading: React.FC<{ size: number }> = ({ size }) => (
  <svg
    version="1.1"
    baseProfile="full"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width={size}
    height={size}
    className="animate-spin"
  >
    <defs>
      <linearGradient id="grad1">
        <stop offset="0%" stopColor="rgb(107, 114, 128)" />
        <stop offset="100%" stopColor="rgb(107, 114, 128)" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M50 10  A40 40 0 1 0 90 50"
      stroke="url(#grad1)"
      strokeWidth="10"
      fill="none"
    />
  </svg>
)

export const loading = <Loading size={15} />
