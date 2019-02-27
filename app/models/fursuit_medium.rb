class FursuitMedium < ApplicationRecord
  self.primary_key = :uuid

  belongs_to :fursuit
  belongs_to :medium
  belongs_to :user
end
