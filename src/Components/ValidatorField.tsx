import type { ValidatorData } from "@/api"

export const ValidatorField: React.FC<{
  field: keyof ValidatorData
  validator: ValidatorData | null
  className?: string
}> = ({ validator, field, className }) => {
  if (!validator) return <>&nbsp;</>
  const append =
    field === "selfStake" ? " DOT" : field === "commission" ? "%" : ""
  return (
    <div className={className}>{validator[field]?.toFixed(0) + append}</div>
  )
}
