module Types
  class UserType < Types::BaseObject
    description "User object"
    field :id, ID, null: false
    field :slug, ID, null: false
    field :name, String, null: false
    field :published_media, [MediumType], null: false
    field :avatar, String, null: true
    field :banner, String, null: true
    field :bio, String, null: true

    def banner
      object.banner_url
    end

    def avatar
      object.avatar_url(:thumbnail)
    end
  end
end
