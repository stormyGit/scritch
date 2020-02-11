class Mutations::UpdateEvent < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :name, String, required: true
  argument :country, String, required: true
  argument :web, String, required: true

  field :event, Types::EventType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    event = Event.find(arguments[:id])
    event.assign_attributes(arguments)

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
