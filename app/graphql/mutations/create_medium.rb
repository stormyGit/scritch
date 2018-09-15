class Mutations::CreateMedium < Mutations::BaseMutation
  argument :title, String, required: true
  argument :description, String, required: false
  argument :key, String, required: true

  field :medium, Types::MediumType, null: true
  field :errors, [String], null: false

  def resolve(title:, description:, key:)
    medium = Medium.new({
      title: title,
      description: description,
      key: key,
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
