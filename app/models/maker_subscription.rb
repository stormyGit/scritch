class MakerSubscription < ApplicationRecord
  self.primary_key = :uuid

  belongs_to :user
  belongs_to :maker
end
