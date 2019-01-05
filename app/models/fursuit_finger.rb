class FursuitFinger < ApplicationRecord
  self.primary_key = :uuid

  has_many :fursuits
end
