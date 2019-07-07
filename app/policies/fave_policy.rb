class FavePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.present?
        scope
          .joins(:user)
          .joins(:medium)
          .where("users.public = ? OR users.uuid = ?", true, user.uuid)
      else
        scope
          .joins(:user)
          .joins(:medium)
          .where("users.public = ?", true)
      end
        .where("media.uuid IN (?)", MediumPolicy::Scope.new(user, Medium.where(uuid: scope.select(:medium_id))).resolve.select(:uuid))
        .joins("INNER JOIN users AS favers ON favers.uuid = faves.user_id")
        .joins("INNER JOIN users AS faveds ON faveds.uuid = media.user_id")
        .where.not("favers.uuid::text = SOME(faveds.blocked_users_ids)")
        .where.not("faveds.uuid::text = SOME(favers.blocked_users_ids)")
    end
  end

  def show?
    true
  end

  def create?
    user.present? && user == record.user && !user.has_block_with?(record.user)
  end

  def update?
    create?
  end

  def destroy?
    create?
  end
end
