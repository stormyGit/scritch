class Mutations::TagUnlockMedium < Mutations::BaseMutation
  argument :id, ID, required: true

  field :medium, Types::MediumType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    medium = Medium.find(arguments[:id])
    raise Pundit::NotAuthorizedError unless MediumPolicy.new(context[:current_user], medium).unlock?
    medium.tag_locked = false
    medium.tag_lock_data = nil
    medium.tagger = nil

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
