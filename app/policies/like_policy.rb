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
      end.where("media.uuid IN (?)", MediumPolicy::Scope.new(user, Medium.where(uuid: scope.select(:medium_id))).resolve.select(:uuid))
    end
  end

  def show?
    true
  end

  def create?
    user.present? && user == record.user
  end

  def update?
    create?
  end

  def destroy?
    create?
  end
end
