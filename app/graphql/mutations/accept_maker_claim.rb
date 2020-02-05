class Mutations::AcceptMakerClaim < Mutations::BaseMutation
  argument :id, ID, required: true

  field :maker_claim, Types::MakerClaimType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    maker_claim = MakerClaim.find(arguments[:id])
    maker = Maker.find(maker_claim.maker.id)
    # raise Pundit::NotAuthorizedError unless FursuitSubscriptionPolicy.new(context[:current_user], subscription).destroy?
    if maker_claim.conflictual
        maker.user.update!(score: maker.user.score - 10)
        maker.update!(user: maker_claim.user)
        maker.create_activity :claim_success, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: maker_claim.user
        maker_claim.update!(status: "accepted")
    else
        maker.update!(user: maker_claim.user)
        maker_claim.update!(status: "accepted")
        maker.create_activity :claim_success, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: maker_claim.user
    end
    if maker_claim.destroy
      {
        maker_claim: maker_claim,
        errors: [],
      }
    else
      {
        maker_claim: maker_claim,
        errors: maker_claim.errors.full_messages
      }
    end
  end
end
