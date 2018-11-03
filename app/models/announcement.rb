class Announcement < ApplicationRecord
  self.primary_key = :uuid

  validates :body, presence: true
end
