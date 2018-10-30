class LikePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.present?
        scope
          .joins(:user)
          .joins(:medium)
          .where("users.public = ? OR users.uuid = ?", true, user.uuid)
          .where("media.uuid IN (?)", MediumPolicy::Scope.new(user, Medium.all).resolve.select(:uuid))
      else
        scope
          .joins(:user)
          .joins(:medium)
          .where("users.public = ?", true)
          .where("media.uuid IN (?)", MediumPolicy::Scope.new(nil, Medium.all).resolve.select(:uuid))
      end
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
