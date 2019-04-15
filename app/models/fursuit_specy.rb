class FursuitSpecy < ApplicationRecord
  self.primary_key = :uuid

  belongs_to :specy
  belongs_to :fursuit
end
