class SubEvent < ApplicationRecord
  self.primary_key = :uuid

  has_many :media
  belongs_to :edition
end
