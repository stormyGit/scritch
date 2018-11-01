class Moderation::UsersController < ModerationController
  before_action :load_user, only: [
    :show,
    :moderate_profile,
    :ban_and_remove_account,
    :ban_permanently,
    :ban_for_a_month,
    :ban_for_a_week
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

  def ban_for_a_month
    ban_and_redirect!(banned_until: 1.month.from_now)
  end

  def ban_for_a_week
    ban_and_redirect!(banned_until: 1.week.from_now)
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

end
