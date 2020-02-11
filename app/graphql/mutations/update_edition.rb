class Mutations::UpdateEdition < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :name, String, required: true
  argument :city, String, required: true
  argument :kind, String, required: true
  argument :theme, String, required: true
  argument :charity, String, required: true
  argument :guest_of_honours, String, required: true
  argument :attendance, Integer, required: true
  argument :venue, String, required: true
  argument :year, Integer, required: true

  field :edition, Types::EditionType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    edition = Edition.find(arguments[:id])
    edition.assign_attributes(arguments)

    if edition.save
      {
        edition: edition,
        errors: [],
      }
    else
      {
        edition: edition,
        errors: edition.errors.full_messages
      }
    end
  end
end
