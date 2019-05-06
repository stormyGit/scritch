class Moderation::ClaimsController < ModerationController
  include ModerationHelper
  before_action :ensure_assets_capability!


  def index
    if flash[:notice] == "Signed in successfully."
      flash[:notice] = ""
    end

    @claims = Claim.where(status: :open).order(:created_at)

    @claims = @claims.page(params[:page]).per(90)
  end

  def show
  end

  def edit
  end

  def update
    claim = Claim.find(params[:id])
    raise Pundit::NotAuthorizedError unless FursuitUserPolicy.new(nil, claim).create?

    if claim.conflictual
      if params[:status] == "approve"
        FursuitUser.where(fursuit: claim.fursuit).first.user.update!(score: FursuitUser.where(fursuit: claim.fursuit).first.user.score - 10)
        FursuitUser.where(fursuit: claim.fursuit).first.destroy
        FursuitUser.create!(user: claim.user, fursuit: claim.fursuit)
        sub = FursuitSubscription.where(user: claim.user, fursuit: claim.fursuit).first
        sub.destroy unless sub.blank?
        claim.fursuit.create_activity :claim_success, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: claim.user
        claim.update!(status: "accepted")
        flash[:notice] = "Claim approved!"
        flash[:class] = "has-text-warning"
      elsif params[:status] == "reject"
        user = User.find(claim.user.uuid)
        user.update!(score: user.score - 10)
        claim.fursuit.create_activity :claim_reject, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: claim.user
        claim.update!(status: "rejected")
        flash[:notice] = "Claim rejected!"
        flash[:class] = "has-text-danger"
      end
    else
      if params[:status] == "approve"
        FursuitUser.create!(user: claim.user, fursuit: claim.fursuit)
        claim.fursuit.create_activity :claim_success, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: claim.user
        claim.update!(status: "accepted")
        sub = FursuitSubscription.where(user: claim.user, fursuit: claim.fursuit).first
        sub.destroy unless sub.blank?
        flash[:notice] = "Claim approved!"
        flash[:class] = "has-text-warning"
      elsif params[:status] == "reject"
        user = User.find(claim.user.uuid)
        user.update!(score: user.score - 10)
        claim.fursuit.create_activity :claim_reject, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: claim.user
        claim.update!(status: "rejected")
        flash[:notice] = "Claim rejected!"
        flash[:class] = "has-text-danger"
      end
    end
    #    authorize claim

    redirect_to moderation_claims_path
  end

  def new

  end

  protected

  def ensure_assets_capability!
    ensure_capability! "fursuit_claims"
  end
end
