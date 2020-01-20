class Mutations::CreateModerator < Mutations::BaseMutation
  argument :name, String, required: true
  argument :telegram_id, String, required: true

  field :moderator, Types::ModeratorType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    moderator = Moderator.new(arguments)

    if moderator.save
      {
        moderator: moderator,
        errors: [],
      }
    else
      {
        moderator: moderator,
        errors: moderator.errors.full_messages
      }
    end
  end
end
