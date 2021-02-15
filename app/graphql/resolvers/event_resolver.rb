module Resolvers
  class EventResolver < BaseResolver
    type Types::EventType, null: false

    model Event
  end
end
