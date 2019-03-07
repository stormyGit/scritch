class MakerClaim < ApplicationRecord
  self.primary_key = :uuid

  STATUSES = [
    "open",
    "closed"
  ]
  
  belongs_to :maker
  belongs_to :user
end
