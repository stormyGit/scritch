class TagReport < ApplicationRecord
  self.primary_key = :uuid

  STATUSES = [
    "open",
    "closed"
  ]

  belongs_to :fursuit_medium
  belongs_to :user
end
