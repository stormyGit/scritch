class Mutations::DeleteMedium < Mutations::BaseMutation
  argument :id, ID, required: true

  field :medium, Types::MediumType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    medium = Medium.find(arguments[:id])

    if medium.destroy
      {
        medium: medium,
        errors: [],
      }
    else
      {
        medium: medium,
        errors: medium.errors.full_messages
      }
    end
  end
end
