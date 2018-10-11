class Mutations::ReadActivities < Mutations::BaseMutation
  field :user, Types::UserType, null: true
  field :errors, [String], null: false

  def resolve(arguments = {})
    if context[:current_user].update(last_activities_read: DateTime.now)
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
