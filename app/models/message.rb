class Message < ApplicationRecord
  self.primary_key = :uuid

  belongs_to :chat, touch: true
  belongs_to :sender, class_name: "User"

  after_create :mark_recipient_as_unread
  after_commit :notify_create, on: [:create]

  mount_uploader :picture, PictureUploader

  def mark_recipient_as_unread
    if sender == chat.sender
      chat.update(is_recipient_unread: true)
    elsif sender == chat.recipient
      chat.update(is_sender_unread: true)
    end
  end

  def notify_create
  end

  def recipient
    sender == chat.sender ? chat.recipient : chat.sender
  end
end
