interface ButtonProps {
  children?: JSX.Element | string
  secondary?: boolean
  onClick?: () => void
  width?: "full" | "fit"
}

export default function Button({
  children,
  secondary,
  onClick,
  width,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded-full text-body-2 text-white ${
        secondary
          ? "bg-secondary hover:bg-p-purple-900"
          : "bg-primary hover:bg-p-pink-600"
      } ${width ? width : "w-full"}`}
    >
      {children}
    </button>
  )
}
