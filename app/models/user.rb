class User < ApplicationRecord
  self.primary_key = :uuid

  extend FriendlyId
  friendly_id :name, use: :slugged

  acts_as_followable
  acts_as_follower

  has_one_attached :avatar
  has_one_attached :banner

  has_many :media
  has_many :published_media, -> { joins(:video_encoding_job).where("chronofage_jobs.completed_at IS NOT NULL AND chronofage_jobs.failed_at IS NULL") }, class_name: "Medium"

  has_many :comments
end
