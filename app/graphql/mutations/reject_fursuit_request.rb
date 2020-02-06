class Mutations::RejectFursuitRequest < Mutations::BaseMutation
  argument :id, ID, required: true

  field :fursuit_request, Types::FursuitRequestType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    fursuit_request = FursuitRequest.find(arguments[:id])

    fursuit_request.status = "dismissed"
    fursuit_request.create_activity :rejected, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: fursuit_request.user


    if fursuit_request.save
      {
        fursuit_request: fursuit_request,
        errors: [],
      }
    else
      {
        fursuit_request: fursuit_request,
        errors: fursuit_request.errors.full_messages
      }
    end
  end
end
