import * as React from "react"
import { Medium } from "../../types"
import { H5 } from "../../../wombat-ui"

type MediumCardProps = {
  medium: Medium
  onClick?: (e: any) => VoidFunction
}

export const MediumCard: React.FC<MediumCardProps> = ({
  medium,
  onClick
}) => {
  return (
    <div
      className="relative text-center rounded cursor-pointer bg-light-300 hover:bg-gray-700"
      onClick={onClick}
    >
      <img
        src={medium.picture}
        className="block rounded"
      />
    </div>
  )
}
