class Mutations::DeleteSession < Mutations::BaseMutation
  argument :id, ID, required: true

  field :session, Types::SessionType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    session = Session.find(arguments[:id])

    raise Pundit::NotAuthorizedError unless SessionPolicy.new(context[:current_user], session).destroy?

    if session.destroy
      {
        session: session,
        errors: [],
      }
    else
      {
        session: session,
        errors: session.errors.full_messages
      }
    end
  end
end
