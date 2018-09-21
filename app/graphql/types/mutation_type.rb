module Types
  class MutationType < Types::BaseObject
    field :create_session, mutation: Mutations::CreateSession
    field :create_medium, mutation: Mutations::CreateMedium
    field :create_comment, mutation: Mutations::CreateComment
    field :create_follow, mutation: Mutations::CreateFollow
    field :delete_follow, mutation: Mutations::DeleteFollow
  end
end
