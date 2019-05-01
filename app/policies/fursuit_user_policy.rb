class FursuitUserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def create?
    FursuitUser.where(fursuit: record.fursuit, user: record.user).count < 1
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
