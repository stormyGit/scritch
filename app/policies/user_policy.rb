class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def show?
    true
  end

  def update?
    user.present? && user == record
  end

  def destroy?
    create?
  end

  def follow?
    user.present? && user != record
  end
end
