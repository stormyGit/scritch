class ChatPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where("chats.recipient_id = ? OR chats.sender_id = ?", user.uuid, user.uuid)
        .joins("INNER JOIN users AS recipients ON recipients.uuid = chats.recipient_id")
        .joins("INNER JOIN users AS senders ON senders.uuid = chats.sender_id")
        .where.not("senders.uuid::text = SOME(recipients.blocked_users_ids)")
        .where.not("recipients.uuid::text = SOME(senders.blocked_users_ids)")
    end
  end

  def read?
    update?
  end

  def update?
    (record.sender == user || record.recipient == user) && !user.has_block_with?(record.recipient) && !user.has_block_with?(record.sender)
  end
end
