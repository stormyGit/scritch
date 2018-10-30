class MessagePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where("messages.chat_id IN (?) OR messages.chat_id IN (?)", user.chats_as_sender.select(:uuid), user.chats_as_recipient.select(:uuid))
    end
  end

  def create?
    record.chat.present? && record.sender == user && record.recipient.present? && ChatPolicy.new(user, record.chat).update?
  end
end
