class Mutations::CreateMedium < Mutations::BaseMutation
  argument :title, String, required: true
  argument :description, String, required: false
  argument :temporary_key, String, required: true

  field :medium, Types::MediumType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    medium = Medium.new({
      title: arguments[:title],
      description: arguments[:description],
      temporary_key: arguments[:temporary_key],
      user: context[:current_user]
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
