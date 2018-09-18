module Types
  class UserType < Types::BaseObject
    description "User object"
    field :id, ID, null: false
    field :slug, ID, null: false
    field :name, String, null: false
    field :published_media, [MediumType], null: false
    field :avatar, String, null: true

    def avatar
      object.avatar&.service_url
    end
  end
end
