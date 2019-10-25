module Resolvers
    module Queries
        module MakerQueries
            class GetMaker < GraphQL::Function
                type Types::MakerType

                argument :id, !types.ID
                argument :sort, !types.String

                def call(obj, args, ctx)
                    Maker.where(visible: true).find(args[:id])
                end
            end
            
            class GetMakers < GraphQL::Function
                type types[Types::MakerType]

                argument :limit, !types.Int
                argument :offset, !types.Int
                argument :name, types.String
                argument :country, types.String
                argument :commissionStatus, types.ID
                argument :region, types.String

                def call(obj, args, ctx)
                    makers = Maker.where(visible: true)

                    if args[:commissionStatus].present?
                        makers = makers.where(commission_status_id: args[:commissionStatus])
                    end
            
                    if args[:country].present?
                        makers = makers.where(country: args[:country])
                    end
            
                    if args[:region].present?
                        makers = makers.where(region: args[:region])
                    end
            
                    if args[:name].present?
                        makers = makers.where("name @@ ? or name ilike ?", args[:name], "%#{args[:name]}%")
                    end
            
                    makers.offset(args[:offset]).limit(args[:limit]).order(:name)
                end
            end
            
            class GetCommissionStatuses < GraphQL::Function
                type types[Types::CommissionStatusType]

                def call(obj, args, ctx)
                    CommissionStatus.all.order(:name)
                end
            end
              
            class GetMakersSelect < GraphQL::Function
                type types[Types::MakerType]

                def call(obj, args, ctx)
                    Maker.all.order(:name)
                end
            end

            class GetMakersCountry < GraphQL::Function
                type types[types.String]

                def call(obj, args, ctx)
                    Maker.all.distinct.order(:country).pluck(:country)
                end
            end
            
            class GetMakersRegion < GraphQL::Function
                type types[types.String]

                argument :country, !types.String

                def call(obj, args, ctx)
                    Maker.where(country: args[:country]).distinct.order(:region).pluck(:region)
                end
            end
        end
    end
end
