class FursuitPadding < ApplicationRecord
  self.primary_key = :uuid

  has_many :fursuits

  mount_base64_uploader :picture, IconUploader
end
