class FursuitGender < ApplicationRecord
  self.primary_key = :uuid

  mount_base64_uploader :picture, IconUploader

end
