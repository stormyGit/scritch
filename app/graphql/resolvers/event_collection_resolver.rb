module Resolvers
  class EventCollectionResolver < BaseCollectionResolver
    type Types::EventType.connection_type, null: false

    model Event
  end
end
