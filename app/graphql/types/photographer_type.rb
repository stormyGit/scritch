module Types
  class PhotographerType < Types::BaseObject
    description "Fursuit object"
    field :id, ID, null: false
    field :name, String, null: false
    field :country, String, null: false
    field :slug, String, null: false
    field :web_1, String, null: true
    field :web_2, String, null: true
    field :user, UserType, null: false
  end
end
