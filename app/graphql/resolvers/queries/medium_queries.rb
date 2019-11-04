module Resolvers
    module Queries
        module MediumQueries
           
            class GetMedium < GraphQL::Function
                type Types::MediumType

                argument :id, !types.ID
                argument :tagging, types.Boolean

                def call(obj, args, ctx)
                    medium = Medium.includes(comments: [:user]).find(args[:id])
                    raise Pundit::NotAuthorizedError unless MediumPolicy.new(ctx[:current_user], medium).show?
            
                    if (args[:tagging].present? && args[:tagging] == true)
                        raise Pundit::NotAuthorizedError unless MediumPolicy.new(ctx[:current_user], medium).unlock?
                    end

                    View.add(args[:id], ctx[:current_user_references])
            
                    medium
                end
            end

            class GetMedia < GraphQL::Function
                type types[Types::MediumType]

                argument :q, types.String
                argument :sort, types.String
                argument :filter, types.String
                argument :userId, types.ID
                argument :fursuitId, types.ID
                argument :categoryId, types.ID
                argument :subEventId, types.ID
                argument :fursuits, types[types.ID]
                argument :offset, !types.Int
                argument :uuid, types.ID
                argument :limit, !types.Int
                argument :tagging, types.Boolean
                argument :gifs, types.Boolean
                argument :faves, types.Boolean
                argument :editionId, types.ID
                argument :eventId, types.ID

                def call(obj, args, ctx)
                    media = MediumPolicy::Scope.new(ctx[:current_user], Medium.all).resolve

                    if args[:faves]
                        media = media.joins(:faves).where("faves.user_id = ?", ctx[:current_user].uuid).order("faves.created_at DESC")
                    end

                    media =
                        case args[:sort]
                        when 'latest'
                            media.order("media.created_at DESC, media.created_at DESC")
                        when 'earliest'
                            media.order("media.created_at, media.created_at")
                        when 'scritches'
                            media.order(["media.likes_count DESC, media.created_at DESC"])
                        when 'scritches_month'
                            media.where("media.created_at > ?", 30.days.ago).order(["media.likes_count DESC, media.created_at DESC"])
                        when 'views'
                            media.order(["media.views_count DESC, media.created_at DESC"])
                        when 'faves'
                            media.order(["media.faves_count DESC, media.created_at DESC"])
                        when 'leastComplete'
                            media.order(["media.completion, media.created_at DESC"])
                        when 'mostComplete'
                            media.order(["media.completion DESC, media.created_at DESC"])
                        when 'random'
                            media.order("RANDOM()")
                        else
                            media
                        end

                    media =
                        case args[:filter]
                        when 'subscriptions_users_all'
                            media.where(user: ctx[:current_user].all_following)
                                .order("media.created_at DESC, media.created_at DESC")
                        when 'subscriptions_fursuits_all'
                            Medium.joins(:fursuits)
                                .where("fursuits.uuid IN (?)", ctx[:current_user].subscriptions.pluck(:uuid))
                                .order(["media.created_at DESC, media.created_at DESC"])
                        when 'subscriptions_users'
                            media.where(user: ctx[:current_user].all_following)
                                .where("media.created_at > ?", ctx[:current_user].last_seen_media)
                                .order("media.created_at DESC, media.created_at DESC")
                        when 'subscriptions_fursuits'
                            Medium.joins(:fursuits)
                                .where("fursuits.uuid IN (?)", ctx[:current_user].subscriptions.pluck(:uuid))
                                .where("media.created_at > ?", ctx[:current_user].last_seen_fursuits)
                                .order(["media.created_at DESC, media.created_at DESC"])
                        else
                            media
                        end


                    if args[:eventId].present?
                        media = media.joins(:edition).where("editions.event_id = ?", args[:eventId])
                    end
                    if args[:editionId].present?
                        media = media.where(edition_id: args[:editionId])
                    end
                    if args[:subEventId].present?
                        media = media.where(sub_event_id: args[:subEventId])
                    end

                    if args[:gifs].present? && args[:gifs] == true
                        media = media.where(is_gif: true)
                    end

                    if args[:categoryId].present?
                        media = media.where(category_id: args[:categoryId])
                    end



                    if args[:fursuits].present? && args[:filter] == 'subscriptions_fursuits'
                        media = media.joins(:fursuits).where(fursuits: {uuid: args[:fursuits]}).group("media.id").having('count(media.id) >= ?', args[:fursuits].size)
                    elsif args[:fursuits].present? && args[:faves]
                        media = media.joins(:fursuits).where(fursuits: {uuid: args[:fursuits]}).group("media.id", "users.id, faves.id").having('count(media.id) >= ?', args[:fursuits].size)
                    elsif args[:fursuits].present?
                        media = media.joins(:fursuits).where(fursuits: {uuid: args[:fursuits]}).group("media.id", "users.id").having('count(media.id) >= ?', args[:fursuits].size)
                    end

                    if args[:tagging].present?
                        media = media.where.not("completion > ?", 99).where(tag_locked: false).order(:completion)
                    end

                    media.offset(args[:offset]).limit(args[:limit])
                end
            end

            class GetFrontMedia < GraphQL::Function
                type types[Types::MediumType]

                argument :filter, !types.String
                argument :limit, !types.Int
                argument :uuid, types.ID

                def call(obj, args, ctx)
                    if args[:filter] == "random"
                        media = MediumPolicy::Scope.new(ctx[:current_user], Medium.all).resolve.order("RANDOM()")
                    else
                        media = MediumPolicy::Scope.new(ctx[:current_user], Medium.all).resolve

                        media =
                        case args[:filter]
                        when 'latest'
                            media.order("media.created_at DESC, media.created_at DESC")
                        when 'scritched'
                            media.where("media.created_at > ?", 30.days.ago).order(["media.likes_count DESC, media.created_at DESC"])
                        else
                            media
                        end
                    end

                    media.limit(args[:limit])
                end
            end

            class GetFavedMedia < GraphQL::Function
                type types[Types::MediumType]

                argument :offset, !types.Int
                argument :limit, !types.Int
                
                def call(obj, args, ctx)

                end
            end

            class GetFursuitMedia < GraphQL::Function
                type types[Types::MediumType]

                argument :fursuitId, !types.ID
                argument :offset, !types.Int
                argument :limit, !types.Int
            
                def call(obj, args, ctx)
                    media = MediumPolicy::Scope.new(ctx[:current_user], Medium.all).resolve.includes(:user)
                    media = media.joins(:fursuits).where("fursuits.slug = ? AND fursuits.visible = ?", args[:fursuitId], true)

                    media.order(created_at: :desc).offset(args[:offset]).limit(args[:limit])
                end
            end

            class GetUserMedia < GraphQL::Function
                type types[Types::MediumType]

                argument :userId, !types.ID
                argument :offset, !types.Int
                argument :limit, !types.Int

                def call(obj, args, ctx)
                    media = MediumPolicy::Scope.new(ctx[:current_user], Medium.all).resolve
                    media = media.where(user_id: args[:userId])

                    media.order(created_at: :desc).offset(args[:offset]).limit(args[:limit])
                end
            end

            class GetEventMedia < GraphQL::Function
                type types[Types::MediumType]

                argument :eventId, !types.ID
                argument :editionId, types.ID
                argument :offset, !types.Int
                argument :limit, !types.Int

                def call(obj, args, ctx)
                    media = MediumPolicy::Scope.new(ctx[:current_user], Medium.all).resolve.includes(:user)
                    media = media.joins(:edition).where("editions.event_id = ?", args[:eventId])
                    if args[:editionId].present?
                        media = media.where(edition_id: args[:editionId])
                    end

                    media.order(created_at: :desc).offset(args[:offset]).limit(args[:limit])
                end
            end

            class GetCategories < GraphQL::Function
                type types[Types::CategoryType]

                argument :limit, types.Int
                argument :offset, types.Int
                argument :name, types.String

                def call(obj, args, ctx)
                    categories = Category.all

                    if args[:name].present?
                        categories = categories.where("name @@ ? or name ilike ?", args[:name], "%#{args[:name]}%")
                    end

                    categories.offset(args[:offset]).limit(args[:limit]).order(:name)
                end
            end

            class GetLikes < GraphQL::Function
                type types[Types::LikeType]

                argument :mediumId, types.ID
                argument :offset, !types.Int
                argument :limit, !types.Int
  
                def call(obj, args, ctx)
                    LikePolicy::Scope.new(ctx[:current_user], Like.where(medium_id: args[:mediumId]))
                        .resolve.order("likes.created_at DESC")
                        #.offset(args[:offset]).limit(args[:limit])
                end
            end

            class GetFaves < GraphQL::Function
                type types[Types::FaveType]

                argument :mediumId, types.ID
                argument :offset, !types.Int
                argument :limit, !types.Int
  
                def call(obj, args, ctx)
                    FavePolicy::Scope.new(ctx[:current_user], Fave.where(medium_id: args[:mediumId]))
                        .resolve.order("faves.created_at DESC")
                        #.offset(args[:offset]).limit(args[:limit])
                end
            end

            class GetComments < GraphQL::Function
                type types[Types::CommentType]

                argument :mediumId, !types.ID
                argument :parentId, types.ID
                argument :offset, !types.Int
                argument :limit, !types.Int
  
                def call(obj, args, ctx)
                    raise Pundit::NotAuthorizedError unless MediumPolicy.new(ctx[:current_user], Medium.find(args[:mediumId])).show?

                    CommentPolicy::Scope.new(ctx[:current_user], Comment.where(medium_id: args[:mediumId], parent_id: args[:parentId])).resolve
                        .order(updated_at: :desc).offset(args[:offset]).limit(args[:limit])
                end
            end
        end
    end
end
