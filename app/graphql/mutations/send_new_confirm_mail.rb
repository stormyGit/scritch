class Mutations::SendNewConfirmMail < Mutations::BaseMutation
  argument :email, String, required: true

  field :errors, [String], null: false

  def resolve(params)
    begin
      user = User.find_by!(email: params[:email], service: "email")
      user.send_confirmation_instructions
    rescue => error
      return GraphQL::ExecutionError.new("unknown_email")
    end
    return {errors: []}
  end
end
