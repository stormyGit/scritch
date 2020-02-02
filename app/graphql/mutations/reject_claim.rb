class Mutations::RejectClaim < Mutations::BaseMutation
  argument :id, ID, required: true

  field :claim, Types::ClaimType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    claim = Claim.find(arguments[:id])

    # raise Pundit::NotAuthorizedError unless FursuitSubscriptionPolicy.new(context[:current_user], subscription).destroy?
    if claim.conflictual
      user = User.find(claim.user.uuid)
      user.update!(score: user.score - 10)
      claim.fursuit.create_activity :claim_reject, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: claim.user
      claim.update!(status: "rejected")
    else
      user = User.find(claim.user.uuid)
      user.update!(score: user.score - 10)
      claim.fursuit.create_activity :claim_reject, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: claim.user
      claim.update!(status: "rejected")
    end


    if claim.destroy
      {
        claim: claim,
        errors: [],
      }
    else
      {
        claim: claim,
        errors: claim.errors.full_messages
      }
    end
  end
end
