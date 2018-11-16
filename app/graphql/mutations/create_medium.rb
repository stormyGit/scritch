class Mutations::CreateMedium < Mutations::BaseMutation
  argument :title, String, required: true
  argument :description, String, required: false
  argument :picture, String, required: true
  argument :comments_disabled, Boolean, required: true
  argument :share_on_twitter, Boolean, required: false
  argument :tag_list, [String], required: false

  field :medium, Types::MediumType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    medium = Medium.new(arguments)
    medium.user = context[:current_user]
    puts ">>>>>\n\n\n#{arguments}\n\n\n\n>>>>>"
    raise Pundit::NotAuthorizedError unless MediumPolicy.new(context[:current_user], medium).create?

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
