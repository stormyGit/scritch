class Moderation::MakerClaimsController < ModerationController
  include ModerationHelper
  before_action :ensure_assets_capability!


  def index
    if flash[:notice] == "Signed in successfully."
      flash[:notice] = ""
    end

    @maker_claims = MakerClaim.where(status: :open).order(:created_at)

    @maker_claims = @maker_claims.page(params[:page]).per(90)
  end

  def show
  end

  def edit
  end

  def update
    maker_claim = MakerClaim.find(params[:id])
    maker = Maker.find(maker_claim.maker_id)

    if maker_claim.conflictual
      if params[:status] == "approve"
        maker.user.update!(score: maker.user.score - 10)
        maker.update!(user: maker_claim.user)
        maker.create_activity :claim_success, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: maker_claim.user
        maker_claim.update!(status: "accepted")
        flash[:notice] = "Maker Claim approved!"
        flash[:class] = "has-text-warning"
      elsif params[:status] == "reject"
        user = User.find(maker_claim.user.uuid)
        user.update!(score: user.score - 10)
        maker_claim.update!(status: "rejected")
        maker.create_activity :claim_reject, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: maker_claim.user
        flash[:notice] = "Maker Claim rejected!"
        flash[:class] = "has-text-danger"
      end
    else
      if params[:status] == "approve"
        maker.update!(user: maker_claim.user)
        maker_claim.update!(status: "accepted")
        maker.create_activity :claim_success, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: maker_claim.user
        flash[:notice] = "Maker Claim approved!"
        flash[:class] = "has-text-warning"
      elsif params[:status] == "reject"
        user = User.find(maker_claim.user.uuid)
        user.update!(score: user.score - 10)
        maker_claim.update!(status: "rejected")
        maker.create_activity :claim_reject, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: maker_claim.user
        flash[:notice] = "Maker Claim rejected!"
        flash[:class] = "has-text-danger"
      end
    end
    #    authorize maker_claim

    redirect_to moderation_maker_claims_path
  end

  def new

  end

  protected

  def ensure_assets_capability!
    ensure_capability! "maker_claims"
  end
end
