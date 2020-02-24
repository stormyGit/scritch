class Mutations::DeleteAdvert < Mutations::BaseMutation
  argument :id, ID, required: true

  field :advert, Types::AdvertType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    advert = Advert.find(arguments[:id])

    if advert.destroy
      {
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
