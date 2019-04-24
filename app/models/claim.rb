class Claim < ApplicationRecord
  self.primary_key = :uuid

  has_many :activities, as: :trackable, class_name: 'PublicActivity::Activity', dependent: :destroy

  belongs_to :fursuit
  belongs_to :user
  after_commit :send_moderation_notification, on: [:create]

  def send_moderation_notification
    Moderation::SendClaimNotificationJob.perform_later(self)
  end

  STATUSES = [
    :open,
    :rejected,
    :accepted,
    :closed
  ]
end
