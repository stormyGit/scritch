class Advert < ApplicationRecord
  self.primary_key = :uuid

  include PublicActivity::Model

  belongs_to :user
  mount_base64_uploader :file, AdvertUploader
end
