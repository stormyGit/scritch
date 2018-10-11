class Mutations::ClearActivities < Mutations::BaseMutation
  field :user, Types::UserType, null: true
  field :errors, [String], null: false

  def resolve(arguments = {})
    if Activity.where(recipient: context[:current_user]).delete_all
      {
        user: context[:current_user],
        errors: [],
      }
    else
      {
        user: context[:current_user],
        errors: user.errors.full_messages
      }
    end
  end
end
