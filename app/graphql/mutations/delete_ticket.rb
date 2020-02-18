class Mutations::DeleteTicket < Mutations::BaseMutation
  argument :id, ID, required: true

  field :ticket, Types::TechReportType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    ticket = TechReport.find(arguments[:id])

    if ticket.destroy
      {
        ticket: ticket,
        errors: [],
      }
    else
      {
        ticket: ticket,
        errors: ticket.errors.full_messages
      }
    end
  end
end
