class Mutations::TagLockMedium < Mutations::BaseMutation
  argument :id, ID, required: true

  field :medium, Types::MediumType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    medium = Medium.find(arguments[:id])
    raise Pundit::NotAuthorizedError unless MediumPolicy.new(context[:current_user], medium).lock?
    medium.tag_locked = true
    medium.tag_lock_data = Time.now
    medium.tagger = context[:current_user].uuid


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
