class Mutations::UpdatePassword < Mutations::BaseMutation
  argument :current_password, String, required: true
  argument :new_password, String, required: true

  field :errors, [String], null: false

  def resolve(params)
    user = context[:current_user]
    if !user.valid_password?(params[:current_password])
      return GraphQL::ExecutionError.new('wrong_pwd')
    end

    user.update!(password: params[:new_password])

    return { errors: []}
  end
end
