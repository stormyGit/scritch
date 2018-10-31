class FollowPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      follows = scope
        .joins("INNER JOIN users AS followers ON followers.uuid = follows.follower_id")
        .joins("INNER JOIN users AS followables ON followables.uuid = follows.followable_id")
        .where.not("followables.uuid::text = SOME(followers.blocked_users_ids)")
        .where.not("followers.uuid::text = SOME(followables.blocked_users_ids)")

      if user.present?
        follows.where("(followers.public = ? AND followables.public = ?) OR follows.followable_id = ? OR follows.follower_id = ?", true, true, user.uuid, user.uuid)
          .where.not("? = SOME(followers.blocked_users_ids)", user.uuid)
          .where.not(followers: { uuid: Array(user.blocked_users_ids) })
          .where.not("? = SOME(followables.blocked_users_ids)", user.uuid)
          .where.not(followables: { uuid: Array(user.blocked_users_ids) })
      else
        follows.where("followers.public = ? AND followables.public = ?", true, true)
      end
    end
  end

  def show?
    true
  end

  def create?
    user.present? && user == record.follower && !user.has_block_with?(record.followable)
  end

  def update?
    create?
  end

  def destroy?
    create?
  end
end
