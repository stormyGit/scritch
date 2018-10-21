class LikePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.present?
        scope.joins(:user).where("users.public = ? OR users.uuid = ?", true, user.uuid)
      else
        scope.joins(:user).where("users.public = ?", true)
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
