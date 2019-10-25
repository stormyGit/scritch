include Resolvers::Queries::EventQueries

module Types
  module Query
    EventQuery = GraphQL::ObjectType.define do
      name 'EventQuery'

      field :event, function: GetEvent.new
      field :events, function: GetEvents.new
      field :edition, function: GetEdition.new
      field :editions, function: GetEditions.new
      field :subEvents, function: GetSubEvents.new
      field :eventsCountry, function: GetEventsCountry.new
      field :eventsStatuses, function: GetEventsStatuses.new

    end
  end
end
