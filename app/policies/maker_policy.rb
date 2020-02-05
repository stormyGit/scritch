class MakerPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def show?
    true
  end

  def update?
    record.present? && (record.user == user || Moderator.find_by(telegram_id: user.telegram_id).present?)
  end

  def destroy?
    create?
  end

  def create?
    Moderator.find_by(telegram_id: user.telegram_id).present?
  end

  def follow?
    user.present? && user != record
  end

  def has_unread_announcements?
    user.present? && user == record
  end

  def message?
    return false if user.blank?

    if Chat.find_by(uuid: IdXor.xor_ids(user.uuid, record.uuid)).present?
      true
    elsif record.chat_enabled?
      true
    else
      false
    end
  end
end
