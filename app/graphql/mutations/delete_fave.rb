class Mutations::DeleteFave < Mutations::BaseMutation
  argument :medium_id, ID, required: true

  field :fave, Types::FaveType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    fave = Fave.find_by({
      user: context[:current_user],
      medium: arguments[:medium_id],
    })

    raise Pundit::NotAuthorizedError unless FavePolicy.new(context[:current_user], fave).destroy?

    if fave.destroy
      {
        fave: fave,
        errors: [],
      }
    else
      {
        fave: fave,
        errors: fave.errors.full_messages
      }
    end
  end
end
