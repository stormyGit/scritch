module Types
  class FursuitGenderType < Types::BaseObject
    description "Fursuit Gender object"
    field :id, ID, null: false
    field :name, String, null: false
    field :picture, String, null: true

    def picture
      object.picture_url
    end
  end
end
