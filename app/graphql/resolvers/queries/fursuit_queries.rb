module Resolvers
    module Queries
        module FursuitQueries
            class GetFursuit < GraphQL::Function
                description "fursuit by id"
                type Types::FursuitType

                argument :id, !types.ID
                argument :isModerator, types.Boolean

                def call(obj, args, ctx)
                    if args[:isModerator].blank?
                        return Fursuit.where(visible: true).find(args[:id])
                    else
                        return Fursuit.find(args[:id])
                    end

                end
            end

            class GetFursuits < GraphQL::Function
                description "fursuit by id"
                type types[Types::FursuitType]

                argument :name, types.String
                argument :limit, !types.Int
                argument :offset, !types.Int
                argument :exclude, types[types.ID]
                argument :hybridSearch, types.Boolean
                argument :isModerator, types.Boolean
                argument :speciesIds, types[types.ID]
                argument :uuid, types.ID
                argument :filter, types.String
                argument :fursuitStyle, types.ID
                argument :fursuitLegType, types.ID
                argument :fursuitBuild, types.ID
                argument :fursuitPadding, types.ID
                argument :fursuitFinger, types.ID
                argument :fursuitGender, types.ID
                argument :fursuitColor, types.String
                argument :fursuitEyes, types.String
                argument :maker, types.ID
                argument :userId, types.ID

                def call(obj, args, ctx)
                    fursuits = Fursuit.all
                    if args[:isModerator].blank?
                        fursuits = Fursuit.where(visible: true)
                    end

                    if args[:filter].present? && args[:filter] == "subscriptions_fursuits"
                        fursuits = fursuits.joins(:makers).where("makers.uuid IN (?)", ctx[:current_user].followed_makers.pluck(:uuid))
                            .where("fursuits.created_at > ?", ctx[:current_user].last_seen_makers)
                            .order("fursuits.created_at DESC")
                    end

                    if args[:userId].present?
                        fursuits = fursuits.joins(:users).where("users.uuid = ?", args[:userId])
                    end

                    if args[:speciesIds].present? && args[:hybridSearch].present? && args[:hybridSearch] == true
                        fursuits = fursuits.where(is_hybrid: true).joins(:species).where(species: {uuid: args[:speciesIds]}).group("fursuits.id").having('count(fursuits.id) >= ?', args[:speciesIds].size)
                    end

                    if args[:speciesIds].present? && (args[:hybridSearch].blank? || args[:hybridSearch] == false)
                        fursuits = fursuits.where(is_hybrid: false).joins(:species).where(species: {uuid: args[:speciesIds]}).group("fursuits.id").having('count(fursuits.id) >= ?', args[:speciesIds].size)
                    end

                    if args[:fursuitStyle].present?
                        fursuits = fursuits.where(fursuit_style_id: FursuitStyle.find(args[:fursuitStyle]))
                    end

                    if args[:fursuitLegType].present?
                        fursuits = fursuits.where(fursuit_leg_type_id: FursuitLegType.find(args[:fursuitLegType]))
                    end

                    if args[:fursuitBuild].present?
                        fursuits = fursuits.where(fursuit_build_id: FursuitBuild.find(args[:fursuitBuild]))
                    end

                    if args[:fursuitGender].present?
                        fursuits = fursuits.where(fursuit_gender_id: FursuitGender.find(args[:fursuitGender]))
                    end

                    if args[:fursuitFinger].present?
                        fursuits = fursuits.where(fursuit_finger_id: FursuitFinger.find(args[:fursuitFinger]))
                    end

                    if args[:fursuitPadding].present?
                        fursuits = fursuits.where(fursuit_padding_id: FursuitPadding.find(args[:fursuitPadding]))
                    end

                    if args[:fursuitColor].present?
                        fursuits = fursuits.where(base_color: args[:fursuitColor])
                    end

                    if args[:fursuitEyes].present?
                        fursuits = fursuits.where(eyes_color: args[:fursuitEyes])
                    end

                    if args[:maker].present?
                        fursuits = fursuits.joins(:makers).where("makers.uuid = ?", args[:maker])
                    end

                    if args[:name].present?
                        fursuits = fursuits.where("fursuits.name @@ ? or fursuits.name ilike ?", args[:name], "%#{args[:name]}%")
                    end

                    if args[:exclude].present?
                        fursuits = fursuits.where.not("uuid IN (?)", args[:exclude])
                    end

                    fursuits.offset(args[:offset]).limit(args[:limit]).order(:name, :uuid)
                end
            end

            class GetFursuitLegTypes < GraphQL::Function
                description "fursuit attributes"
                type types[Types::FursuitLegTypeType]

                def call(obj, args, ctx)
                    FursuitLegType.all.order(:name)
                end
            end

            class GetFursuitStyles < GraphQL::Function
                description "fursuit attributes"
                type types[Types::FursuitStyleType]

                def call(obj, args, ctx)
                    FursuitStyle.all.order(:name)
                end
            end

            class GetFursuitGenders < GraphQL::Function
                description "fursuit attributes"
                type types[Types::FursuitGenderType]

                def call(obj, args, ctx)
                    FursuitGender.all.order(:name)
                end
            end

            class GetFursuitFingers < GraphQL::Function
                description "fursuit attributes"
                type types[Types::FursuitFingerType]

                def call(obj, args, ctx)
                    FursuitFinger.all.order(:name)
                end
            end

            class GetFursuitBuilds < GraphQL::Function
                description "fursuit attributes"
                type types[Types::FursuitBuildType]

                def call(obj, args, ctx)
                    FursuitBuild.all.order(:name)
                end
            end

            class GetFursuitPaddings < GraphQL::Function
                description "fursuit attributes"
                type types[Types::FursuitPaddingType]

                def call(obj, args, ctx)
                    FursuitPadding.all.order(:name)
                end
            end

            class GetSpecies < GraphQL::Function
                description "fursuit attributes"
                type types[Types::SpecyType]

                def call(obj, args, ctx)
                    Specy.all.order(:name)
                end
            end

            class GetHybridSpecies < GraphQL::Function
                description "fursuit attributes"
                type types[Types::SpecyType]

                argument :species, types[types.String]

                def call(obj, args, ctx)
                    Specy.all.order(:name)
                end
            end
        end
    end
end
