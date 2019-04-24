class MakerClaim < ApplicationRecord
  self.primary_key = :uuid

  STATUSES = [
    :open,
    :rejected,
    :accepted,
    :closed
  ]

  belongs_to :maker
  belongs_to :user
end
