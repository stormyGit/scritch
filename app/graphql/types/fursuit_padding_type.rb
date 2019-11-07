module Types
  class FursuitPaddingType < Types::BaseObject
    description "Fursuit object"
    field :id, ID, null: false
    field :name, String, null: false
    field :slug, String, null: false
    field :fursuits, [FursuitType], null: true
    field :picture, String, null: true

    def picture
      object.picture_url
    end
  end
end
