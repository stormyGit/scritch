import * as React from "react"
import { Maker } from "../../types"
import DefaultMakerAvatar from "../../assets/MakerPlaceholder.jpg"
import { H5 } from "../../../wombat-ui"

type MakerCardProps = {
  maker: Maker
  onClick?: (e: any) => VoidFunction
}

export const MakerCard: React.FC<MakerCardProps> = ({ maker, onClick }) => {
  return (
    <div
      className="relative text-center rounded cursor-pointer bg-light-300 hover:bg-gray-700"
      onClick={onClick}
    >
      <img src={maker.avatar || DefaultMakerAvatar} className="block rounded" />
      <p className="absolute bottom-0 w-full p-2 bg-dark-900 opacity-70 text-light-0">
        {maker.name}
      </p>
    </div>
  )
}
