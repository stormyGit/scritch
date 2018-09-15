class Mutations::CreateMedium < Mutations::BaseMutation
  argument :title, String, required: true
  argument :description, String, required: false
  argument :temporary_key, String, required: true

  field :medium, Types::MediumType, null: true
  field :errors, [String], null: false

  def resolve(title:, description:, temporary_key:)
    medium = Medium.new({
      title: title,
      description: description,
      temporary_key: temporary_key,
      user: User.first
    })

    if medium.save
      {
        medium: medium,
        errors: [],
      }
    else
      {
        medium: nil,
        errors: medium.errors.full_messages
      }
    end
  end
end
