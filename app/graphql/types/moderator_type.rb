module Types
  class ModeratorType < Types::BaseObject
    description "User object"
    field :id, ID, null: false
    field :created_at, String, null: true
    field :name, String, null: false
    field :telegram_id, String, null: false
    field :capabilities, [String], null: false

  end
end
