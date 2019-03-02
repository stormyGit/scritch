class Mutations::CreateFave < Mutations::BaseMutation
  argument :medium_id, ID, required: true

  field :fave, Types::FaveType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    fave = Fave.new({
      user: context[:current_user],
      medium_id: arguments[:medium_id],
    })

    raise Pundit::NotAuthorizedError unless FavePolicy.new(context[:current_user], fave).create?

    if fave.save
      {
        fave: fave,
        errors: [],
      }
    else
      {
        fave: nil,
        errors: fave.errors.full_messages
      }
    end
  end
end
