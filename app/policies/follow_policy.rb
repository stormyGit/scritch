class FollowPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      follows = scope
        .joins("INNER JOIN users AS followers ON followers.uuid = follows.follower_id")
        .joins("INNER JOIN users AS followables ON followables.uuid = follows.followable_id")
      if user.present?
        follows.where("(followers.public = ? AND followables.public = ?) OR follows.followable_id = ? OR follows.follower_id = ?", true, true, user.uuid, user.uuid)
      else
        follows.where("followers.public = ? AND followables.public = ?", true, true)
      end
    end
  end

  def show?
    true
  end

  def create?
    user.present? && user == record.follower
  end

  def update?
    create?
  end

  def destroy?
    create?
  end
end
