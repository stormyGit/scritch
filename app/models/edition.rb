class Edition < ApplicationRecord
  self.primary_key = :uuid

  extend FriendlyId
  friendly_id :name, use: :slugged

  belongs_to :event
  has_many :media

  mount_base64_uploader :picture, PictureUploader

  validates :name, presence: true
end
