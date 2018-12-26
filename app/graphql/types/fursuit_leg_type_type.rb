module Types
  class FursuitLegTypeType < Types::BaseObject
    description "Fursuit object"
    field :id, ID, null: false
    field :name, String, null: false
    field :fursuits, [FursuitType], null: true
  end

  def fursuits
    object.fursuits.order(:name)
  end
end
