class CommissionStatus < ApplicationRecord
  self.primary_key = :uuid

  has_many :makers
end
