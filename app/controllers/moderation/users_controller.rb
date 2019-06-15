class Moderation::UsersController < ModerationController
  before_action :load_user, only: [
    :show,
    :moderate_profile,
    :ban_and_remove_account,
    :ban_permanently,
    :ban_for_a_month,
    :minor_tag_violation,
    :serious_tag_violation,
    :minor_user_violation,
    :serious_user_violation,
    :minor_medium_violation,
    :serious_medium_violation,
    :minor_comment_violation,
    :serious_comment_violation,
    :not_worth_report
  ]

  def show
  end

  def moderate_profile
    if params[:clear_avatar].present?
      @user.remove_avatar!
      @user.save!

      delete_avatar_telegram_message!
    end

    if params[:clear_bio].present?
      @user.update(bio: nil)
    end

    if params[:clear_website].present?
      @user.update(clear_website: nil)
    end

    if params[:pictures_to_delete].present?
      Picture.where(uuid: Array(params[:pictures_to_delete])).destroy_all
    end

    accept_all_reports if params[:submit_and_close].present?

    redirect_back fallback_location: moderation_user_path(@user)
  end

  def serious_tag_violation
    @user.update!(score: @user.score - 10) #__SCORE__ SERIOUS TAG VIOLATION
    accept_all_tag_reports(params[:medium_id], true)
    FursuitMedium.where(uuid: params[:fursuit_media]).destroy_all
    medium = Medium.find(params[:medium_id])
    medium.update!(completion: medium.get_completion)
    redirect_back fallback_location: moderation_tag_reports_path
  end

  def minor_tag_violation
    @user.update!(score: @user.score - 0) #__SCORE__ MINOR TAG VIOLATION
    accept_all_tag_reports(params[:medium_id], true)
    FursuitMedium.where(uuid: params[:fursuit_media]).destroy_all
    medium = Medium.find(params[:medium_id])
    medium.update!(completion: medium.get_completion)
    redirect_back fallback_location: moderation_tag_reports_path
  end

  def serious_user_violation
    accept_all_user_reports(params[:profile_id], true)
    if !@user.suspended_user.present?
      SuspendedUser.create!(user: @user, limit: Time.now + (2 ** @user.offenses_number).days, reason: "User profile was in serious violation of Scritch's terms of use")
    end
    @user.update!(score: @user.score - 100, offenses_number: @user.offenses_number + 1) #__SCORE__ SERIOUS MEDIUM VIOLATION
    redirect_back fallback_location: moderation_reports_path
  end

  def minor_user_violation
    @user.update!(score: @user.score - 10) #__SCORE__ MINOR MEDIUM VIOLATION
    accept_all_user_reports(params[:profile_id], true)
    #User.find(params[:profile_id]).destroy TODO MODERATE PROFILE
    redirect_back fallback_location: moderation_reports_path
  end

  def serious_medium_violation
    accept_all_medium_reports(params[:medium_id], true)
    Medium.find(params[:medium_id]).destroy
    if !@user.suspended_user.present?
      SuspendedUser.create!(user: @user, limit: Time.now + (2 ** @user.offenses_number).days, reason: "Posted a picture in serious violation of Scritch's terms of use")
    end
    @user.update!(score: @user.score - 100, offenses_number: @user.offenses_number + 1) #__SCORE__ SERIOUS MEDIUM VIOLATION
    redirect_back fallback_location: moderation_medium_reports_path
  end

  def minor_medium_violation
    @user.update!(score: @user.score - 10) #__SCORE__ MINOR MEDIUM VIOLATION
    accept_all_medium_reports(params[:medium_id], true)
    Medium.find(params[:medium_id]).destroy
    redirect_back fallback_location: moderation_medium_reports_path
  end

  def harmless_medium_violation
    accept_all_medium_reports(params[:medium_id], true)
    Medium.find(params[:medium_id]).destroy
    redirect_back fallback_location: moderation_medium_reports_path
  end

  def serious_comment_violation
    accept_all_comment_reports(params[:comment_id], true)
    Comment.find(params[:comment_id]).destroy
    if !@user.suspended_user.present?
      SuspendedUser.create!(user: @user, limit: Time.now + (2 ** @user.offenses_number).days, reason: "Posted a comment in serious violation of Scritch's terms of use")
    end
    @user.update!(score: @user.score - 100, offenses_number: @user.offenses_number + 1) #__SCORE__ SERIOUS COMMENT VIOLATION
    redirect_back fallback_location: moderation_comment_reports_path
  end

  def minor_comment_violation
    @user.update!(score: @user.score - 10) #__SCORE__ MINOR COMMENT VIOLATION
    accept_all_comment_reports(params[:comment_id], true)
    Comment.find(params[:comment_id]).destroy
    redirect_back fallback_location: moderation_comment_reports_path
  end

  def not_worth_report
    @user.update!(score: @user.score - 10) #__SCORE__ BAD REPORT
    if params[:comment_id].present?
      if params[:submit_and_close].present? && params[:comment_id].present?
        accept_all_comment_reports(params[:comment_id], false)
      else
        CommentReport.find(params[:report_id]).update(status: 'accepted')
      end
      redirect_back fallback_location: moderation_comment_reports_path
    elsif params[:medium_id].present? && !params[:tag_report]
      if params[:submit_and_close].present? && params[:medium_id].present?
        accept_all_medium_reports(params[:medium_id], false)
      else
        MediumReport.find(params[:report_id]).update(status: 'accepted')
      end
      redirect_back fallback_location: moderation_medium_reports_path
    elsif params[:profile_id].present?
      if params[:submit_and_close].present? && params[:profile_id].present?
        accept_all_profile_reports(params[:profile_id], false)
      else
        Report.find(params[:report_id]).update(status: 'accepted')
      end
      redirect_back fallback_location: moderation_reports_path
    elsif params[:tag_report].present?
      if params[:submit_and_close].present? && params[:tag_report].present?
        accept_all_tag_reports(params[:medium_id], false)
      else
        Medium.find(params[:medium_id]).update!(completion: Medium.find(params[:medium_id]).get_completion())
        TagReport.find(params[:report_id]).update(status: 'accepted')
      end
      redirect_back fallback_location: moderation_tag_reports_path
    end
  end

  protected

  def load_user
    @user = User.find(params[:user_id])
  end

  def delete_avatar_telegram_message!
    Telegram::DeleteModerationMessageService.new(@user).call
  end

  def accept_all_user_reports(profile_id, reporter_ok)
    Report.where(status: 'new', user_id: profile_id).each do |e|
      e.update(status: 'accepted')
      if reporter_ok
        u = User.find_by(uuid: e.reporter_id)
        u.update!(score: u.score + 10)
      end
    end
  end

  def accept_all_comment_reports(comment_id, reporter_ok)
    CommentReport.where(status: 'new', comment_id: comment_id).each do |e|
      e.update(status: 'accepted')
      if reporter_ok
        u = User.find_by(uuid: e.reporter_id)
        u.update!(score: u.score + 10)
      end
    end
  end

  def accept_all_medium_reports(medium_id, reporter_ok)
    MediumReport.where(status: 'new', medium_id: medium_id).each do |e|
      e.update(status: 'accepted')
      if reporter_ok
        u = User.find_by(uuid: e.reporter_id)
        u.update(score: u.score + 10)
      end
    end
  end

  def accept_all_tag_reports(medium_id, reporter_ok)
    Medium.find(params[:medium_id]).update!(completion: Medium.find(params[:medium_id]).get_completion())
    TagReport.where(status: 'new', medium_id: medium_id).each do |e|
      e.update(status: 'accepted')
      if reporter_ok
        u = User.find_by(uuid: e.reporter_id)
        u.update!(score: u.score + 10)
      end
    end
  end

end
