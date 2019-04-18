class Advert < ApplicationRecord
  self.primary_key = :uuid

  include PublicActivity::Model
  has_many :activities, as: :trackable, class_name: 'PublicActivity::Activity', dependent: :destroy

  belongs_to :user
  mount_base64_uploader :file, AdvertUploader
end
