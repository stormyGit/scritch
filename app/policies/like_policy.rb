class LikePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
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
