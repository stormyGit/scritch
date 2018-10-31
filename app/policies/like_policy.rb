class LikePolicy < ApplicationPolicy
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
        .joins("INNER JOIN users AS likers ON likers.uuid = likes.user_id")
        .joins("INNER JOIN users AS likeds ON likeds.uuid = media.user_id")
        .where.not("likers.uuid::text = SOME(likeds.blocked_users_ids)")
        .where.not("likeds.uuid::text = SOME(likers.blocked_users_ids)")
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
