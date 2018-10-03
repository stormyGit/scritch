class SessionPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def show?
    true
  end

  def create?
    true
  end

  def update?
    user == record.user
  end

  def destroy?
    update?
  end
end
