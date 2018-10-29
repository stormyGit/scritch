class Chat < ApplicationRecord
  self.primary_key = :uuid

  belongs_to :sender, class_name: "User", inverse_of: :chats_as_sender
  belongs_to :recipient, class_name: "User", inverse_of: :chats_as_recipient

  has_many :messages, dependent: :destroy
  has_one :last_message, -> { order("messages.created_at DESC") }, class_name: "Message"

  after_commit :notify_create, on: [:create]
  after_destroy :notify_destroy

  def notify_create
  end

  def notify_destroy
  end
end
