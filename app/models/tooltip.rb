class Tooltip < ApplicationRecord
  self.primary_key = :uuid

  mount_base64_uploader :file, TooltipUploader

  CATEGORIES = [
    "Fursuits",
    "Scritch",
    "Conventions"
  ]
end
