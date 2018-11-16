class Medium < ApplicationRecord
  self.primary_key = :uuid

  extend FriendlyId
  friendly_id :title, use: :slugged

  include PublicActivity::Model
  tracked owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV["ADMIN_ACCOUNT_TELEGRAM_ID"]) }, recipient: Proc.new{ |_, model| model.user }, only: []

  acts_as_taggable

  has_many :activities, as: :trackable, class_name: 'PublicActivity::Activity', dependent: :destroy

  belongs_to :user
  belongs_to :edition, optional: true

  has_many :likes, dependent: :destroy
  has_many :likers, through: :likes, source: :user

  has_many :views, dependent: :destroy

  has_many :comments

  validates :picture, presence: true
  validates :title, presence: true

  mount_base64_uploader :picture, PictureUploader
end
