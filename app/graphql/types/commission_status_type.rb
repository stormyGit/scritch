module Types
  class CommissionStatusType < Types::BaseObject
    description "CommissionStatus object"
    field :id, ID, null: false
    field :name, String, null: false
  end
end
