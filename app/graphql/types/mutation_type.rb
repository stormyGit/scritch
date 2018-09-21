module Types
  class MutationType < Types::BaseObject
    field :create_session, mutation: Mutations::CreateSession
    field :create_medium, mutation: Mutations::CreateMedium
    field :create_comment, mutation: Mutations::CreateComment
  end
end
