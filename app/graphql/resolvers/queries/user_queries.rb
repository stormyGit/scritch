include ActiveRecord::Sanitization::ClassMethods

module Resolvers
    module Queries
        module UserQueries
            class GetUser < GraphQL::Function
                type Types::UserType

                argument :id, !types.ID

                def call(obj, args, ctx)
                    user = User.find(args[:id])

                    raise Pundit::NotAuthorizedError unless UserPolicy.new(ctx[:current_user] || nil, user).show?
                    
                    user
                end
            end

            class GetUsers < GraphQL::Function
                type types[Types::UserType]

                argument :q, types.String
                argument :fillWithFollowing, types.Boolean
                argument :offset, !types.Int
                argument :limit, !types.Int

                def call(obj, args, ctx)
                    users =
                    if args[:q].present?
                      UserPolicy::Scope.new(ctx[:current_user], User.all).resolve
                        .where("users.uuid::varchar = ? OR users.name % ? OR users.slug % ?", args[:q], args[:q], args[:q])
                    elsif args[:fillWithFollowing] && ctx[:current_user].present?
                      UserPolicy::Scope.new(ctx[:current_user],
                        User.where(uuid: FollowPolicy::Scope.new(ctx[:current_user], Follow.where(follower_id: ctx[:current_user])).resolve.select(:followable_id))
                      ).resolve
                    else
                      User.none
                    end
            
                  users.offset(args[:offset]).limit(args[:limit] > 10 ? 10 : args[:limit])
                end
            end

            class GetUserActivities < GraphQL::Function
                type types[Types::ActivityType]

                argument :offset, !types.Int
                argument :limit, !types.Int

                def call(obj, args, ctx)
                    ActivityPolicy::Scope.new(ctx[:current_user], Activity.all).resolve
                        .order(created_at: :desc)
                        .offset(args[:offset]).limit(args[:limit])
                        .includes(:owner, :recipient, :trackable)
                end
            end

            class GetUserLikes < GraphQL::Function
                type types[Types::LikeType]

                argument :userId, !types.ID
                argument :offset, !types.Int
                argument :limit, !types.Int

                def call(obj, args, ctx)
                    LikePolicy::Scope.new(ctx[:current_user], Like.where(user_id: args[:userId])).resolve.order(created_at: :desc).offset(args[:offset]).limit(args[:limit])
                end
            end

            class GetUserFaves < GraphQL::Function
                type types[Types::FaveType]

                argument :userId, !types.ID
                argument :offset, !types.Int
                argument :limit, !types.Int

                def call(obj, args, ctx)
                    FavePolicy::Scope.new(ctx[:current_user], Fave.where(user_id: args[:userId])).resolve.order(created_at: :desc).offset(args[:offset]).limit(args[:limit])
                end
            end

            class GetUserFollowers < GraphQL::Function
                type types[Types::UserType]

                argument :userId, !types.ID
                argument :offset, !types.Int
                argument :limit, !types.Int

                def call(obj, args, ctx)
                    follows = FollowPolicy::Scope.new(ctx[:current_user], Follow.where(followable_id: User.find(args[:userId]))).resolve.order(created_at: :desc)

                    User.joins("JOIN unnest('{#{follows.pluck(:follower_id).map { |uuid| sanitize_sql(uuid) }.join(",")}}'::uuid[]) WITH ORDINALITY t(uuid, ord) USING (uuid)").order("t.ord")
                end
            end

            class GetUserFollowingProfiles < GraphQL::Function
                type types[Types::UserType]

                argument :userId, !types.ID
                argument :offset, !types.Int
                argument :limit, !types.Int

                def call(obj, args, ctx)
                    follows = FollowPolicy::Scope.new(ctx[:current_user], Follow.where(follower_id: User.find(args[:userId]))).resolve.order(created_at: :desc)

                    User.joins("JOIN unnest('{#{follows.pluck(:followable_id).map { |uuid| sanitize_sql(uuid) }.join(",")}}'::uuid[]) WITH ORDINALITY t(uuid, ord) USING (uuid)").order("t.ord")
                end
            end

            class GetUserFollowingMakers < GraphQL::Function
                type types[Types::MakerType]

                argument :userId, !types.ID
                argument :offset, !types.Int
                argument :limit, !types.Int

                def call(obj, args, ctx)
                    User.find(args[:userId]).followed_makers
                end
            end

            class GetUserFollowingFursuits < GraphQL::Function
                type types[Types::FursuitType]

                argument :userId, !types.ID
                argument :offset, !types.Int
                argument :limit, !types.Int

                def call(obj, args, ctx)
                    User.find(args[:userId]).subscriptions
                end
            end

            class GetUnreadActivityCount < GraphQL::Function
                type types.Int

                def call(obj, args, ctx)
                    return 0 if ctx[:current_user].blank?

                    Activity
                        .where(recipient: ctx[:current_user])
                        .where.not(owner: ctx[:current_user])
                        .where("activities.created_at > ?", ctx[:current_user].last_activities_read)
                        .count
                end
            end

            class GetUnreadChatsCount < GraphQL::Function
                type types.Int

                def call(obj, args, ctx)
                    return 0 if ctx[:current_user].blank?

                    ChatPolicy::Scope.new(ctx[:current_user], Chat.all).resolve
                        .where("(chats.recipient_id = ? AND chats.is_recipient_unread) OR (chats.sender_id = ? AND chats.is_sender_unread)", ctx[:current_user].id, ctx[:current_user].id)
                        .count
                end
            end

            class GetBlockedUsers < GraphQL::Function
                type types[Types::UserType]

                def call(obj, args, ctx)
                    User.where(uuid: ctx[:current_user].blocked_users_ids)
                end
            end
        end
    end
end
