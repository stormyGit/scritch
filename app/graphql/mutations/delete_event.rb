class Mutations::DeleteEvent < Mutations::BaseMutation
  argument :id, ID, required: true

  field :event, Types::EventType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    event = Event.find(arguments[:id])

    if event.destroy
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
