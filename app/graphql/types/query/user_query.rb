include Resolvers::Queries::UserQueries

module Types
  module Query
    UserQuery = GraphQL::ObjectType.define do
      name 'UserQuery'

      field :user, function: GetUser.new
      field :users, function: GetUsers.new
      field :likesByUser, function: GetUserLikes.new
      field :favesByUser, function: GetUserFaves.new
      field :followersByUser, function: GetUserFollowers.new
      field :followingsProfilesByUser, function: GetUserFollowingProfiles.new
      field :followingsMakersByUser, function: GetUserFollowingMakers.new
      field :followingsFursuitsByUser, function: GetUserFollowingFursuits.new
      field :unreadActivityCount, function: GetUnreadActivityCount.new
      field :unreadChatsCount, function: GetUnreadChatsCount.new
      field :blockedUsers, function: GetBlockedUsers.new

    end
  end
end
