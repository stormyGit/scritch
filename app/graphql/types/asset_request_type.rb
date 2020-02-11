module Types
  class AssetRequestType < Types::BaseObject
    description "AssetRequest object"
    field :id, ID, null: false
    field :asset_name, String, null: false
    field :asset_type, String, null: false
    field :url, String, null: false
    field :body, String, null: true
    field :user, UserType, null: true

  end
end
