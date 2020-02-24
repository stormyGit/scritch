class Mutations::UpdateAdvert < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :status, String, required: true

  field :advert, Types::AdvertType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    advert = Advert.find(arguments[:id])

    advert.status = arguments[:status]
    # raise Pundit::NotAuthorizedError unless FursuitSubscriptionPolicy.new(context[:current_user], subscription).destroy?

    if advert.save
      {
        advert: advert,
        errors: [],
      }
    else
      {
        advert: advert,
        errors: advert.errors.full_messages
      }
    end
  end
end
