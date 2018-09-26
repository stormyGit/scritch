class User < ApplicationRecord
  self.primary_key = :uuid

  acts_as_followable
  acts_as_follower

  extend FriendlyId
  friendly_id :name, use: :slugged

  mount_uploader :avatar, AvatarUploader
  mount_base64_uploader :banner, BannerUploader

  has_many :media, dependent: :destroy
  has_many :published_media, -> { joins(:video_encoding_job).where("chronofage_jobs.completed_at IS NOT NULL AND chronofage_jobs.failed_at IS NULL") }, class_name: "Medium"

  has_many :comments, dependent: :destroy
  has_many :sessions, dependent: :destroy

  has_many :likes, dependent: :destroy
  has_many :likeds, through: :likes, source: :medium
end
