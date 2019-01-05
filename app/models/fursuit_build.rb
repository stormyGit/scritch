class FursuitBuild < ApplicationRecord
  self.primary_key = :uuid

  has_many :fursuits
end
