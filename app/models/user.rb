class User < ApplicationRecord
  self.primary_key = :uuid

  acts_as_followable
  acts_as_follower

  extend FriendlyId
  friendly_id :name, use: :slugged

  mount_base64_uploader :avatar, AvatarUploader
  mount_base64_uploader :banner, BannerUploader

  has_many :media, dependent: :destroy

  has_many :comments, dependent: :destroy
  has_many :sessions, dependent: :destroy

  has_many :likes, dependent: :destroy
  has_many :likeds, through: :likes, source: :medium

  before_validation :check_slug_uniqueness, if: :will_save_change_to_slug?
  before_create :set_theme

  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true

  def set_theme
    self.theme === ENV["DEFAULT_THEME"] || 'dark'
  end

  def check_slug_uniqueness
    if User.where(slug: self.slug).where.not(uuid: self.uuid).present?
      self.slug = "#{self.slug}-#{self.uuid.split("-")[0]}"
    end
  end
end
