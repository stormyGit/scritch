class Claim < ApplicationRecord
  self.primary_key = :uuid

  STATUSES = [
    "open",
    "closed"
  ]

  belongs_to :fursuit
  belongs_to :user
  after_commit :send_moderation_notification, on: [:create]

  def send_moderation_notification
    Moderation::SendClaimNotificationJob.perform_later(self)
  end
end
