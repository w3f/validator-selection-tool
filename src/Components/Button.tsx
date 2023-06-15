interface ButtonProps {
  children?: JSX.Element | string
  secondary?: boolean
  onClick?: () => void
  fullWidth?: boolean
  className?: string
  small?: boolean
}

export default function Button({
  children,
  secondary,
  onClick,
  fullWidth,
  className,
  small,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full text-body-2 text-white 
      ${small ? "py-2 px-4" : "py-3 px-6"}
      ${
        secondary
          ? "bg-secondary hover:bg-p-purple-900"
          : "bg-primary hover:bg-p-pink-600"
      } ${fullWidth ? "w-full" : "w-fit"} ${className}}`}
    >
      {children}
    </button>
  )
}
