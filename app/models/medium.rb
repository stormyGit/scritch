class Medium < ApplicationRecord
  self.primary_key = :uuid

  has_one_attached :video
  belongs_to :user
end
