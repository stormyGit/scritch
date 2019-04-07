class FursuitUserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def show?
    true
  end

  def update?
  end

  def destroy?
    record && record.user == user
  end

end
