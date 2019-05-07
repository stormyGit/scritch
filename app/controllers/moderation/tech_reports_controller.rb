class Moderation::TechReportsController < ModerationController
  before_action :load_report, only: [
    :show,
    :destroy
  ]
  before_action :ensure_reports_capability!

  def index
    if params[:switch].present? && params[:switch] == ENV["TECH_SWITCH_CODE"] && moderator_can_see?("tech")
      @reports = TechReport
        .where(kind: "exception")
        .order(updated_at: :desc)
      @tech = true
    else
      @reports = TechReport
        .where.not(kind: "exception")
        .order(updated_at: :desc)
      @tech = false
    end

  end

  def show
  end

  def destroy
    @report.destroy
    flash[:notice] = "Ticket removed!"
    flash[:class] = "has-text-danger"
    redirect_back fallback_location: moderation_tech_report_path(@report)
  end
  protected

  def ensure_reports_capability!
    ensure_capability! "tickets"
  end

  def load_report
    @report = TechReport.find(params[:report_id] || params[:id])
  end
end
