module Types
  class CategoryType < Types::BaseObject
    description "Category object"
    field :id, ID, null: false
    field :name, String, null: false
  end
end
