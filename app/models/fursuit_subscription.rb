class FursuitSubscription < ApplicationRecord
  self.primary_key = :uuid

  belongs_to :user
  belongs_to :fursuit
end
