module Types
  class UserType < Types::BaseObject
    description "User object"
    field :id, ID, null: false
    field :slug, ID, null: false
    field :name, String, null: false
    field :published_media, [MediumType], null: false
    field :avatar, String, null: true
    field :banner, String, null: true

    def banner
      object.banner.attached? ?  Rails.application.routes.url_helpers.rails_blob_path(object.banner, only_path: true) : nil
    end

    def avatar
      object.avatar.attached? ?  Rails.application.routes.url_helpers.rails_blob_path(object.avatar, only_path: true) : nil
    end
  end
end
