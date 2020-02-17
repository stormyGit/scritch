class Mutations::AcceptClaim < Mutations::BaseMutation
  argument :id, ID, required: true

  field :claim, Types::ClaimType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    claim = Claim.find(arguments[:id])

    # raise Pundit::NotAuthorizedError unless FursuitSubscriptionPolicy.new(context[:current_user], subscription).destroy?

    if claim.conflictual
        FursuitUser.where(fursuit: claim.fursuit).first.user.update!(score: FursuitUser.where(fursuit: claim.fursuit).first.user.score - 10)
        FursuitUser.where(fursuit: claim.fursuit).first.destroy
        FursuitUser.create!(user: claim.user, fursuit: claim.fursuit)
        sub = FursuitSubscription.where(user: claim.user, fursuit: claim.fursuit).first
        sub.destroy unless sub.blank?
        claim.fursuit.create_activity :claim_success, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: claim.user
        claim.update!(status: "accepted")
    else
        FursuitUser.create!(user: claim.user, fursuit: claim.fursuit)
        claim.fursuit.create_activity :claim_success, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: claim.user
        claim.update!(status: "accepted")
        sub = FursuitSubscription.where(user: claim.user, fursuit: claim.fursuit).first
        sub.destroy unless sub.blank?
    end

    if claim.save
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
