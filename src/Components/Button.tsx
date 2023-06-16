interface ButtonProps {
  children?: JSX.Element | string
  secondary?: boolean
  fullPink?: boolean
  onClick?: () => void
  fullWidth?: boolean
  className?: string
  small?: boolean
  id?: string
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

export default function Button({
  children,
  secondary,
  onClick,
  fullWidth,
  className,
  small,
  id,
  type,
  disabled,
  fullPink,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      id={id}
      onClick={onClick}
      className={`rounded-full font-semibold text-body-2 
      ${small ? "py-2 px-4" : "py-3 px-6"}
      ${
        secondary
          ? "bg-secondary disabled:bg-gray-400 hover:bg-p-purple-900 text-white shadow-none"
          : "bg-fill-secondary border-border-primary shadow-[inset_0_0_0_2px_rgb(230,0,122)] text-primary hover:bg-fill-secondary-hover hover:shadow-[inset_0_0_0_3px_rgb(230,0,122)]"
      }
      ${
        fullPink
          ? "bg-primary text-white hover:brightness-95 hover:bg-primary"
          : "bg-fill-secondary border-border-primary shadow-[inset_0_0_0_2px_rgb(230,0,122)] text-primary hover:bg-fill-secondary-hover hover:shadow-[inset_0_0_0_3px_rgb(230,0,122)]"
      }
      
      ${fullWidth ? "w-full" : "w-fit"} ${className}`}
    >
      {children}
    </button>
  )
}
