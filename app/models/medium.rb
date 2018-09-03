class Medium < ApplicationRecord
  self.primary_key = :uuid

  belongs_to :user
end
