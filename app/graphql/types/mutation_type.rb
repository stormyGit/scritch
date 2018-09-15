module Types
  class MutationType < Types::BaseObject
    field :create_user, mutation: Mutations::CreateUser
    field :create_medium, mutation: Mutations::CreateMedium
  end
end
