module Types
  class MediumType < Types::BaseObject
    description "Medium object"
    field :id, ID, null: false
    field :title, String, null: false
    field :description, String, null: true
    field :key, String, null: true
    field :thumbnail_key, String, null: true
    field :preview_key, String, null: true
    field :temporary_key, String, null: false
    field :user, UserType, null: true
  end
end
