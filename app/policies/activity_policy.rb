class ActivityPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.blank?
        scope.none
      else
        scope
          .where(recipient: user).where.not(owner: user)
      end
    end
  end

  def read?
    update?
  end

  def update?
    (record.sender == user || record.recipient == user) && !user.has_block_with?(record.recipient) && !user.has_block_with?(record.sender)
  end
end
