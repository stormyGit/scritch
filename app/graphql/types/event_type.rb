module Types
  class EventType < Types::BaseObject
    description "Event object"
    field :id, ID, null: false
    field :name, String, null: false
    field :slug, String, null: false
    field :editions, [EditionType], null: true
  end
end
