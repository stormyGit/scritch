import * as React from "react"
import { Event } from "../../types"
import DefaultEventAvatar from "../../assets/FursuitPlaceholder.jpg"
import { H5 } from "../../../wombat-ui"

type EventCardProps = {
  event: Event
  onClick?: (e: any) => VoidFunction
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onClick
}) => {
  return (
    <div
      className="relative text-center rounded cursor-pointer bg-light-300 hover:bg-gray-700"
      onClick={onClick}
    >
      <img
        src={event.avatar || DefaultEventAvatar}
        className="block rounded"
      />
      <p className="absolute bottom-0 w-full p-2 bg-dark-900 opacity-70 text-light-0">
        {event.name}
      </p>
    </div>
  )
}
