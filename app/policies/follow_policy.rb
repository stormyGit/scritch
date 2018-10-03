class FollowPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
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
