module Types
  class MakerType < Types::BaseObject
    description "Fursuit object"
    field :id, ID, null: false
    field :name, String, null: false
    field :country, String, null: false
    field :region, String, null: true
    field :slug, String, null: false
    field :web, String, null: true
    field :fursuits, [FursuitType], null: false
    field :user, UserType, null: false
  end
end
