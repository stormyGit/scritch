class Mutations::CreateMakerClaim < Mutations::BaseMutation
  argument :maker_id, ID, required: true

  field :maker_claim, Types::MakerClaimType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    claim = MakerClaim.new(arguments)
    claim.user = context[:current_user]

    if claim.maker.user.present?
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
