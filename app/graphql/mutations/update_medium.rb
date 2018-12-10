class Mutations::UpdateMedium < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :title, String, required: true
  argument :description, String, required: false
  argument :share_on_twitter, Boolean, required: false
  argument :comments_disabled, Boolean, required: false
  argument :edition_id, ID, required: false
  argument :category_id, ID, required: false
  argument :tag_list, [String], required: false

  field :medium, Types::MediumType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    medium = Medium.find(arguments[:id])
    medium.assign_attributes(arguments)

    raise Pundit::NotAuthorizedError unless MediumPolicy.new(context[:current_user], medium).update?

    medium.completion = medium.get_completion()

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
