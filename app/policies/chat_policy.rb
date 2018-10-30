class ChatPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where("chats.recipient_id = ? OR chats.sender_id = ?", user.uuid, user.uuid)
    end
  end

  def read?
    update?
  end

  def update?
    record.sender == user || record.recipient == user
  end
end
