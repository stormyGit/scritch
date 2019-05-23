class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.present?
        scope
          .where.not("? = SOME(users.blocked_users_ids)", user.uuid)
          .where.not(users: { uuid: Array(user.blocked_users_ids) })
      else
        scope.none
      end
    end
  end

  def show?
    !record.blocked_users_ids.include?(user.uuid)
  end

  def update?
    user.present? && user == record
  end

  def destroy?
    update?
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
