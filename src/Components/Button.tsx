interface ButtonProps {
  children?: JSX.Element | string
  secondary?: boolean
  fullPink?: boolean
  onClick?: () => void
  fullWidth?: boolean
  small?: boolean
  id?: string
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  variant?: "primary" | "ghost" | "fullPink" | "fullPurple"
  className?: string
}

export default function Button({
  children,
  onClick,
  small,
  className,
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
      onClick={onClick}
      className={`rounded-full font-semibold justify-center flex items-center whitespace-nowrap font-unbounded disabled:bg-fill-disabled disabled:shadow-none disabled:text-foreground-disabled disabled:pointer-events-none ${
        small ? "py-2 px-4 text-xs" : "py-3 px-6 text-sm"
      }  ${
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
