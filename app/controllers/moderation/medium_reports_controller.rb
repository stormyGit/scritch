class Moderation::MediumReportsController < ModerationController
  before_action :load_report, only: [
    :show,
    :dismiss,
    :reopen,
    :mark_as_accepted,
    :assign,
    :unassign
  ]
  before_action :ensure_reports_capability!

  def index
    @reports = MediumReport
      .order(updated_at: :desc)
      .includes(:moderation_comments)
      .where(status: 'new')

    if params[:assigned_to_me] == 'true'
      @reports = @reports.where(assignee: current_moderator)
    end
  end

  def show
  end

  def dismiss
    @report.update(status: "dismissed")
    redirect_back fallback_location: moderation_report_path(@report)
  end

  def mark_as_accepted
    @report.update(status: "accepted")
    redirect_back fallback_location: moderation_report_path(@report)
  end

  def reopen
    @report.update(status: 'new')

    redirect_back fallback_location: moderation_report_path(@report)
  end

  def assign
    @report.update(assignee: current_moderator)

    redirect_back fallback_location: moderation_report_path(@report)
  end

  def unassign
    @report.update(assignee: nil)

    redirect_back fallback_location: moderation_report_path(@report)
  end

  protected

  def ensure_reports_capability!
    ensure_capability! "reports"
  end

  def load_report
    @report = MediumReport.find(params[:medium_report_id])
  end
end
