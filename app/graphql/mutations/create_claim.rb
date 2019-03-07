class Mutations::CreateClaim < Mutations::BaseMutation
  argument :fursuit_id, String, required: true

  field :claim, Types::ClaimType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    claim = Claim.new(arguments)
    claim.user = context[:current_user]

    if claim.fursuit.users.present?
      claim.conflictual = true
    end

    if claim.save
      {
        claim: claim,
        errors: [],
      }
    else
      {
        claim: nil,
        errors: claim.errors.full_messages
      }
    end
  end
end
