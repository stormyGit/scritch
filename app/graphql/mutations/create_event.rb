class Mutations::CreateEvent < Mutations::BaseMutation
  argument :name, String, required: true
  argument :web, String, required: false
  argument :avatar, String, required: false
  argument :status, String, required: false
  argument :request_id, ID, required: false

  field :event, Types::EventType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    event = Event.new
    event.assign_attributes(arguments.except(:request_id))

    if arguments[:request_id].present?
      event_request = AssetRequest.find(arguments[:request_id])
      event_request.update(status: "accepted")
      event_request.create_activity :accepted, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: event_request.user
    end

    if event.save
      {
        event: event,
        errors: [],
      }
    else
      {
        event: event,
        errors: event.errors.full_messages
      }
    end
  end
end
