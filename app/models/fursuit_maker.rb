class FursuitMaker < ApplicationRecord
  self.primary_key = :uuid

  belongs_to :maker, dependent: :destroy
  belongs_to :fursuit, dependent: :destroy
end
