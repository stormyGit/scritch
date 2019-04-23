class MediumPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.blank?
        scope.where(refused_at: nil)
      else
        scope
          .where("media.user_id = ? OR media.created_at IS NOT NULL", user.uuid)
          .where(refused_at: nil)
          .joins(:user)
          .where.not("? = SOME(users.blocked_users_ids)", user.uuid)
          .where.not(users: { uuid: Array(user.blocked_users_ids) })
      end
    end
  end

  def show?
    if user.blank?
      true
    elsif record.created_at.present?
      !user.has_block_with?(record.user)
    else
      record.user == user
    end
  end

  def create?
    user.present? && user == record.user
  end

  def lock?

    user.present? && record.tagger == nil && record.tag_locked == false
  end

  def unlock?
    user.present? && record.tagger == user.uuid && record.tag_locked == true
  end


  def update?
    create? || record.tagger == user.uuid
  end

  def destroy?
    create?
  end
end
