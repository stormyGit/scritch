class BannedUser < ApplicationRecord
  belongs_to :user, optional: true

  before_create :store_telegram_id
  before_create :store_user_attributes

  def self.find_last_active_ban_for(telegram_id)
    BannedUser
      .order(created_at: :desc)
      .where(telegram_id: telegram_id)
      .where("banned_users.banned_until IS NULL OR banned_users.banned_until > ?", DateTime.now)
      .first
  end

  def user_with_deleted
    @user_with_deleted ||= self.user || User.new(self.user_attributes)
  end

  def ban_end_in_words
    if banned_until.present?
      "until #{self.banned_until.strftime("%B %d, %Y at %H:%M UTC")}"
    else
      "permanently"
    end
  end

  def ban_in_words
    if self.notification_message.present?
      "You have been banned #{self.ban_end_in_words} for the following reason: #{self.notification_message}."
    else
      "You have been banned #{self.ban_end_in_words}"
    end + " Please send an email to contact@howlr.im with your Telegram username if you think this is a mistake."
  end

  def store_telegram_id
    self.telegram_id = user.telegram_id
  end

  def store_user_attributes
    self.user_attributes = self.user.attributes.slice(
      "name",
      "uuid",
      "bio",
    )
  end
end
