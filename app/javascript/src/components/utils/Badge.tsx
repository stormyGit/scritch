import * as React from "react"

interface BadgeProps {
  label: string
  value?: string
  variant: "base" | "primary"
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  value,
  variant = "base"
}) => {
  const baseStyle = "px-2 py-1 rounded"
  let style: string = ""

  switch (variant) {
    case "base":
      style = `${baseStyle} bg-gray-900 text-light-500`
  }

  return (
    <div className={style}>
      {value && <strong>{value}{" "}</strong>}
      {label}
    </div>
  )
}
