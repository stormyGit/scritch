module Types
  class MutationType < Types::BaseObject
    field :create_session, mutation: Mutations::CreateSession
    field :create_medium, mutation: Mutations::CreateMedium
    field :create_comment, mutation: Mutations::CreateComment
    field :create_follow, mutation: Mutations::CreateFollow
    field :delete_follow, mutation: Mutations::DeleteFollow
    field :create_like, mutation: Mutations::CreateLike
    field :delete_like, mutation: Mutations::DeleteLike
    field :delete_session, mutation: Mutations::DeleteSession
    field :delete_user, mutation: Mutations::DeleteUser
    field :update_user, mutation: Mutations::UpdateUser
  end
end
