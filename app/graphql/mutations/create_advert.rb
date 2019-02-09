class Mutations::CreateAdvert < Mutations::BaseMutation
  argument :file, String, required: true

  field :advert, Types::AdvertType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    advert = Advert.new(arguments)
    advert.user = context[:current_user]
    #raise Pundit::NotAuthorizedError unless AdvertPolicy.new(context[:current_user], advert).create?

    if advert.save
      {
        advert: advert,
        errors: [],
      }
    else
      puts advert.errors.full_messages
      {
        advert: nil,
        errors: advert.errors.full_messages
      }
    end
  end
end
