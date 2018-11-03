class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.present?
        scope
          .where.not("? = SOME(users.blocked_users_ids)", user.uuid)
          .where.not(users: { uuid: Array(user.blocked_users_ids) })
      else
        scope.none
      end
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
