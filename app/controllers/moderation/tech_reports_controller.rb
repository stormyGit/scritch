class Moderation::TechReportsController < ModerationController
  before_action :load_report, only: [
    :show,
    :destroy
  ]
  before_action :ensure_reports_capability!

  def index
    @reports = TechReport
      .order(updated_at: :desc)

  end

  def show
  end

  def destroy
    @report.destroy
  end

  protected

  def ensure_reports_capability!
    ensure_capability! "tech"
  end

  def load_report
    @report = TechReport.find(params[:report_id] || params[:id])
  end
end
