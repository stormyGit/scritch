class ActivityPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.blank?
        scope.none
      else
        scope
          .where(recipient: user)
          .where.not(owner: user)
          .joins("INNER JOIN users AS recipients ON recipients.uuid = activities.recipient_id")
          .joins("INNER JOIN users AS owners ON owners.uuid = activities.owner_id")
          .where.not("owners.uuid::text = SOME(recipients.blocked_users_ids)")
          .where.not("recipients.uuid::text = SOME(owners.blocked_users_ids)")
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
