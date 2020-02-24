class Mutations::AcceptAdvert < Mutations::BaseMutation
  argument :id, ID, required: true

  field :advert, Types::AdvertType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    advert = Advert.find(arguments[:id])

    advert.create_activity :approved, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: advert.user
    advert.status = "ready"
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
