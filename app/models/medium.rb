class Medium < ApplicationRecord
  self.primary_key = :uuid

  extend FriendlyId
  friendly_id :title, use: :slugged

  include PublicActivity::Model
  tracked owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV["ADMIN_ACCOUNT_TELEGRAM_ID"]) }, recipient: Proc.new{ |_, model| model.user }, only: [:create]

  acts_as_taggable

  has_many :activities, as: :trackable, class_name: 'PublicActivity::Activity', dependent: :destroy

  belongs_to :user
  belongs_to :video_encoding_job, class_name: "Chronofage::Job", primary_key: :job_id, dependent: :destroy, optional: true

  has_many :likes, dependent: :destroy
  has_many :likers, through: :likes, source: :user

  has_many :views, dependent: :destroy

  has_many :comments

  validates :temporary_key, presence: true
  validates :title, presence: true

  after_commit :send_moderation_notification, on: [:create]
  after_destroy :remove_medium_files

  scope :published, -> { where.not(published_at: nil) }
  scope :publicly_available, -> { where(visibility: 'public') }

  def push_video_encoding_job!
    update(video_encoding_job_id: EncodeVideoJob.perform_later(self).job_id)
  end

  def send_moderation_notification
    Moderation::SendMediumNotificationJob.perform_later(self)
  end

  def remove_medium_files
    RemoveMediumFilesJob.perform_later self.uuid
  end
end
