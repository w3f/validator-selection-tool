interface ButtonProps {
  children?: JSX.Element | string
  secondary?: boolean
  onClick?: () => void
  fullWidth?: boolean
  className?: string
}

export default function Button({
  children,
  secondary,
  onClick,
  fullWidth,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`py-3 px-4 rounded-full text-body-2 text-white ${
        secondary
          ? "bg-secondary hover:bg-p-purple-900"
          : "bg-primary hover:bg-p-pink-600"
      } ${fullWidth ? "w-full" : "w-fit"} ${className}}`}
    >
      {children}
    </button>
  )
}
