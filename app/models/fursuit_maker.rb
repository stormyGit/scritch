class FursuitMaker < ApplicationRecord
  self.primary_key = :uuid

  belongs_to :maker
  belongs_to :fursuit
end
