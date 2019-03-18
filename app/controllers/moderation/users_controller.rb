class Moderation::UsersController < ModerationController
  before_action :load_user, only: [
    :show,
    :moderate_profile,
    :ban_and_remove_account,
    :ban_permanently,
    :ban_for_a_month,
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

  def ban_and_remove_account
    ban_and_redirect!(delete_account: true)
  end

  def ban_permanently
    ban_and_redirect!
  end

  def serious_comment_violation
    @user.update!(score: @user.score - 100) #__SCORE__ BAD REPORT
    if params[:submit_and_close].present? && params[:comment_id].present?
      accept_all_comment_reports(params[:comment_id])
    else
      CommentReport.find(params[:report_id]).update(status: 'accepted')
    end
    Comment.find(params[:comment_id]).destroy
    ## TODO HIATUS ON ACCOUNT
    redirect_back fallback_location: moderation_comment_reports_path
  end

  def minor_comment_violation
    @user.update!(score: @user.score - 10) #__SCORE__ MINOR COMMENT VIOLATION
    if params[:submit_and_close].present? && params[:comment_id].present?
      accept_all_comment_reports(params[:comment_id])
    else
      CommentReport.find(params[:report_id]).update(status: 'accepted')
    end
    Comment.find(params[:comment_id]).destroy
    redirect_back fallback_location: moderation_comment_reports_path
  end

  def not_worth_report
    @user.update!(score: @user.score - 10) #__SCORE__ BAD REPORT
    if params[:comment_id].present?
      if params[:submit_and_close].present? && params[:comment_id].present?
        accept_all_comment_reports(params[:comment_id])
      else
        CommentReport.find(params[:report_id]).update(status: 'accepted')
      end
      redirect_back fallback_location: moderation_comment_reports_path
    elsif params[:medium_id].present?
      if params[:submit_and_close].present? && params[:medium_id].present?
        accept_all_medium_reports(params[:medium_id])
      else
        MediumReport.find(params[:report_id]).update(status: 'accepted')
      end
      redirect_back fallback_location: moderation_medium_reports_path
    elsif params[:user_id].present?
      if params[:submit_and_close].present? && params[:user_id].present?
        accept_all_user_reports(params[:user_id])
      else
        UserReport.find(params[:report_id]).update(status: 'accepted')
      end
      redirect_back fallback_location: moderation_user_reports_path
    end
  end

  protected

  def ban_and_redirect!(options = {})
    begin
      ban_service = Users::BanService.new(@user,
        ban_reason: params[:ban_reason],
        send_notification: true,
        notification_message: params[:ban_reason],
        delete_account: options[:delete_account] || false,
        banned_until: options[:banned_until]
      )
      ban_service.call
    rescue => exception
      ExceptionNotifier.notify_exception exception
    end

    accept_all_reports if params[:submit_and_close].present?

    redirect_back fallback_location: moderation_reports_path
  end

  def load_user
    @user = User.find(params[:user_id] || params[:id])
  end

  def delete_avatar_telegram_message!
    Telegram::DeleteModerationMessageService.new(@user).call
  end

  def accept_all_reports
    Report.where(status: 'new', user: @user).update(status: 'accepted')
  end

  def accept_all_comment_reports(comment_id)
    CommentReport.where(status: 'new', comment_id: comment_id).update(status: 'accepted')
  end

end
