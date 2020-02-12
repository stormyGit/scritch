class Mutations::RejectEventRequest < Mutations::BaseMutation
  argument :id, ID, required: true

  field :event_request, Types::AssetRequestType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    event_request = AssetRequest.find(arguments[:id])

    event_request.status = "dismissed"
    event_request.create_activity :rejected, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: event_request.user


    if event_request.save
      {
        event_request: event_request,
        errors: [],
      }
    else
      {
        event_request: event_request,
        errors: event_request.errors.full_messages
      }
    end
  end
end
