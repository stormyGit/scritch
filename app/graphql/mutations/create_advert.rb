class Mutations::CreateAdvert < Mutations::BaseMutation
  argument :title, String, required: true
  argument :description, String, required: false
  argument :picture, String, required: true
  argument :comments_disabled, Boolean, required: true
  argument :share_on_twitter, Boolean, required: false
  argument :edition_id, ID, required: false
  argument :category_id, ID, required: false
  argument :panel_id, ID, required: false

  field :advert, Types::AdvertType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    advert = Advert.new(arguments)
    advert.user = context[:current_user]
    raise Pundit::NotAuthorizedError unless AdvertPolicy.new(context[:current_user], advert).create?

    advert.completion = advert.get_completion()

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
