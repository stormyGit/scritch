class Mutations::CreateMedium < Mutations::BaseMutation
  argument :title, String, required: true
  argument :description, String, required: false
  argument :picture, String, required: true
  argument :comments_disabled, Boolean, required: true
  argument :is_photographer, Boolean, required: true
  argument :is_gif, Boolean, required: true
  argument :photographer_slug, String, required: true
  argument :photographer_string, String, required: true
  argument :share_on_twitter, Boolean, required: false
  argument :edition_id, ID, required: false
  argument :sub_event_id, ID, required: false
  argument :category_id, ID, required: false
  argument :panel_id, ID, required: false

  field :medium, Types::MediumType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    medium = Medium.new(arguments.except(:is_photographer, :photographer_slug, :photographer_string))
    medium.user = context[:current_user]
    raise Pundit::NotAuthorizedError unless MediumPolicy.new(context[:current_user], medium).create?

    medium.completion = medium.get_completion()

    if arguments[:is_photographer]
      medium.photographer_slug = medium.user.slug
    else
      if arguments[:photographer_slug].present?
        if User.where(slug: arguments[:photographer_slug]).count == 0
          medium.photographer_string = arguments[:photographer_slug]
        else
          medium.photographer_slug = arguments[:photographer_slug]
        end
      elsif arguments[:photographer_string].present?
        medium.photographer_string = arguments[:photographer_string]
      end
    end

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
