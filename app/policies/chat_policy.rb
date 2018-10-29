class ChatPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where("chats.recipient_id = ? OR chats.sender_id = ?", user.uuid, user.uuid)
    end
  end

  def create?
    record.sender == user && record.recipient.present?
  end

  def show?
    destroy?
  end

  def update?
    destroy?
  end

  def destroy?
    record.sender == user || record.recipient == user
  end

  def accept?
    record.recipient == user && record.recipient.present?
  end
end
