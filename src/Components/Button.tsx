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
  variant?: "primary" | "ghost" | "fullPink" | "fullPurple"
}

export default function Button({
  children,
  onClick,
  className,
  small,
  id,
  type,
  disabled,
  variant,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      id={id}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault()
          e.stopPropagation()
          onClick()
        }
      }}
      className={`rounded-full font-semibold font-unbounded disabled:bg-fill-disabled disabled:shadow-none disabled:text-foreground-disabled disabled:pointer-events-none ${
        small ? "py-2 px-4 text-xs" : "py-3 px-6 text-sm"
      } ${
        variant === "primary" &&
        "bg-fill-secondary shadow-[inset_0_0_0_2px_rgb(230,0,122)] text-foreground-primary hover:bg-fill-secondary-hover hover:shadow-[inset_0_0_0_3px_rgb(230,0,122)] "
      }
      ${
        variant === "ghost" &&
        "bg-fill-ghost shadow-[inset_0_0_0_2px_rgb(225,225,225)] text-foreground-contrast hover:bg-fill-ghost-hover hover:shadow-[inset_0_0_0_3px_rgb(225,225,225)]"
      }
      ${
        variant === "fullPink" &&
        "bg-fill-primary shadow-none text-white hover:bg-fill-primary-hover hover:shadow-none"
      }
      ${
        variant === "fullPurple" &&
        "bg-pPurple-700 shadow-none text-white hover:bg-pPurple-800 hover:shadow-none"
      } ${className}}`}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  variant: "primary",
}
