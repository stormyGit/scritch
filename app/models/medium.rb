class Medium < ApplicationRecord
  self.primary_key = :uuid

  extend FriendlyId
  friendly_id :title, use: :slugged

  belongs_to :user
  belongs_to :video_encoding_job, class_name: "Chronofage::Job", primary_key: :job_id, dependent: :destroy, optional: true

  has_many :likes, dependent: :destroy
  has_many :likers, through: :likes, source: :user

  has_many :comments

  validates :temporary_key, presence: true
  validates :title, presence: true

  after_commit :send_moderation_notification, on: [:create]

  def push_video_encoding_job!
    update(video_encoding_job_id: EncodeVideoJob.perform_later(self).job_id)
  end

  def related_media
    Medium.joins(:video_encoding_job).where("chronofage_jobs.completed_at IS NOT NULL AND chronofage_jobs.failed_at IS NULL").limit(10)
  end

  def send_moderation_notification
    Moderation::SendMediumNotificationJob.perform_later(self)
  end
end
