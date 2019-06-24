class Moderation::TagReportsController < ModerationController
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
    @reports = TagReport
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
    redirect_back fallback_location: moderation_tag_reports_path
  end

  def mark_as_accepted
    @report.update(status: "accepted")
    redirect_back fallback_location: moderation_tag_reports_path
  end

  def reopen
    @report.update(status: 'new')

    redirect_back fallback_location: moderation_tag_reports_path
  end

  def assign
    @report.update(assignee: current_moderator)

    redirect_back fallback_location: moderation_tag_reports_path
  end

  def unassign
    @report.update(assignee: nil)

    redirect_back fallback_location: moderation_tag_reports_path
  end

  def fix_all_completions
    Medium.all.each do |medium|
      medium.update!(completion: medium.get_completion)
    end
    flash[:notice] = "Completion Fix Applied!"
    redirect_back fallback_location: moderation_tag_reports_path
  end

  protected

  def ensure_reports_capability!
    ensure_capability! "reports"
  end

  def load_report
    @report = TagReport.find(params[:tag_report_id])
    @fursuit_media = FursuitMedium.where(uuid: @report.fursuit_medium_ids)
  end
end
