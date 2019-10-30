class Mutations::UpdateMedium < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :title, String, required: true
  argument :description, String, required: false
  argument :share_on_twitter, Boolean, required: false
  argument :comments_disabled, Boolean, required: false
  argument :is_photographer, Boolean, required: false
  argument :photographer_slug, String, required: false
  argument :photographer_string, String, required: false
  argument :edition_id, ID, required: false
  argument :category_id, ID, required: false
  argument :sub_event_id, ID, required: false
  argument :fursuits_count, Integer, required: false
  argument :fursuits, [ID], required: false
  argument :tag_list, [String], required: false

  field :medium, Types::MediumType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    medium = Medium.find(arguments[:id])
    medium.assign_attributes(arguments.except(:fursuits, :is_photographer, :photographer_slug, :photographer_string))

    raise Pundit::NotAuthorizedError unless MediumPolicy.new(context[:current_user], medium).update?

    if arguments[:is_photographer].present? && arguments[:is_photographer]
      medium.photographer_slug = medium.user.slug
    else
      if arguments[:photographer_slug].present?
        if User.where(slug: arguments[:photographer_slug]).count == 0
          medium.photographer_string = arguments[:photographer_slug]
          medium.photographer_slug = nil
        else
          medium.photographer_slug = arguments[:photographer_slug]
          medium.photographer_string = nil
        end
      elsif arguments[:photographer_string].present?
        medium.photographer_string = arguments[:photographer_string]
        medium.photographer_slug = nil
      end
    end

    if arguments[:fursuits].present?
      arguments[:fursuits].each do |fursuit|
        if FursuitMedium.where(medium: medium.id, fursuit: fursuit).blank?
          FursuitMedium.create(medium_id: medium.id, fursuit_id: fursuit, user: context[:current_user])
        end
      end
    end

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
