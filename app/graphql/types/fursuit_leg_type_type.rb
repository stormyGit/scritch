module Types
  class FursuitLegTypeType < Types::BaseObject
    description "Fursuit object"
    field :id, ID, null: false
    field :name, String, null: false
    field :picture, String, null: true

    def picture
      object.picture_url
    end
  end
end
