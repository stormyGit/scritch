class Advert < ApplicationRecord
  self.primary_key = :uuid

  belongs_to :user
  mount_base64_uploader :file, AdvertUploader
end
