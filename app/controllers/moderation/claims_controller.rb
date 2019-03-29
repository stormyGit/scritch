class Moderation::ClaimsController < ModerationController
  include ModerationHelper
  before_action :ensure_assets_capability!


  def index
    if flash[:notice] == "Signed in successfully."
      flash[:notice] = ""
    end

    @claims = Claim.all.order(:created_at)

    @claims = @claims.page(params[:page]).per(90)
  end

  def show
  end

  def edit
  end

  def update
    claim = Claim.find(params[:id])

    if claim.conflictual
      if params[:status] == "approve"
        FursuitUser.where(fursuit: claim.fursuit).first.user.update!(score: FursuitUser.where(fursuit: claim.fursuit).first.user.score - 10)
        FursuitUser.where(fursuit: claim.fursuit).first.destroy
        FursuitUser.create!(user: claim.user, fursuit: claim.fursuit)
        claim.fursuit.create_activity :claim_success, owner: Proc.new{ |_, model| User.last }, recipient: claim.user
        claim.destroy
        flash[:notice] = "Claim approved!"
        flash[:class] = "has-text-warning"
      elsif params[:status] == "reject"
        user = User.find(claim.user.uuid)
        user.update!(score: user.score - 10)
        claim.fursuit.create_activity :claim_reject, owner: Proc.new{ |_, model| User.last }, recipient: claim.user
        claim.destroy
        flash[:notice] = "Claim rejected!"
        flash[:class] = "has-text-danger"
      end
    else
      if params[:status] == "approve"
        FursuitUser.create!(user: claim.user, fursuit: claim.fursuit)
        claim.destroy
        claim.fursuit.create_activity :claim_success, owner: Proc.new{ |_, model| User.last }, recipient: claim.user
        flash[:notice] = "Claim approved!"
        flash[:class] = "has-text-warning"
      elsif params[:status] == "reject"
        user = User.find(claim.user.uuid)
        user.update!(score: user.score - 10)
        claim.fursuit.create_activity :claim_reject, owner: Proc.new{ |_, model| User.last }, recipient: claim.user
        claim.destroy
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
    ensure_capability! "claims"
  end
end
