class Mutations::DeleteEdition < Mutations::BaseMutation
  argument :id, ID, required: true

  field :edition, Types::EditionType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    edition = Edition.find(arguments[:id])

    if edition.destroy
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
