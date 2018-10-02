class Mutations::UpdateMedium < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :title, String, required: true
  argument :description, String, required: false

  field :medium, Types::MediumType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    medium = Medium.find(arguments[:id])
    medium.assign_attributes(arguments)

    if medium.save
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
