class Medium < ApplicationRecord
  self.primary_key = :uuid

  extend FriendlyId
  friendly_id :title, use: :slugged

  include PublicActivity::Model
  tracked owner: Proc.new{ |_, model| model.user }, recipient: Proc.new{ |_, model| model.user }, only: []

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

  scope :published, -> { where.not(key: nil) }

  def push_video_encoding_job!
    update(video_encoding_job_id: EncodeVideoJob.perform_later(self).job_id)
  end

  def related_media
    limit = 10

    Medium.tagged_with(self.tag_list, any: true).published.limit(limit).to_a.tap do |media|
      if media.count < limit
        media.concat Medium.published.order("RANDOM()").limit(limit - media.count).to_a
      end
    end
  end

  def send_moderation_notification
    Moderation::SendMediumNotificationJob.perform_later(self)
  end
end
