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
  secondary,
  onClick,
  fullWidth,
  className,
  small,
  id,
  type,
  disabled,
  fullPink,
  variant,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      id={id}
      onClick={onClick}
      className={`rounded-full font-semibold ${
        small ? "py-2 px-4 text-caption" : "py-3 px-6 text-body-2 "
      } ${fullWidth ? "w-full" : "w-fit"} ${
        variant === "primary" &&
        "bg-fill-secondary shadow-[inset_0_0_0_2px_rgb(230,0,122)] text-primary hover:bg-fill-secondary-hover hover:shadow-[inset_0_0_0_3px_rgb(230,0,122)]"
      } 
      ${
        variant === "ghost" &&
        "bg-fill-secondary shadow-[inset_0_0_0_2px_rgb(225,225,225)] text-black hover:bg-fill-secondary-hover hover:shadow-[inset_0_0_0_3px_rgb(225,225,225)]"
      }
      ${
        variant === "fullPink" &&
        "bg-primary shadow-none text-white hover:bg-[#D50071] hover:shadow-none"
      }
      ${
        variant === "fullPurple" &&
        "bg-secondary shadow-none text-white hover:bg-[#28123E] hover:shadow-none"
      }`}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  variant: "primary",
}
