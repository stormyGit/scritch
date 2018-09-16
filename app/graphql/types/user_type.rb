module Types
  class UserType < Types::BaseObject
    description "User object"
    field :id, ID, null: false
    field :slug, ID, null: false
    field :name, String, null: false
    field :published_media, [MediumType], null: false
  end
end
