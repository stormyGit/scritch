class Event < ApplicationRecord
  self.primary_key = :uuid

  extend FriendlyId
  friendly_id :name, use: :slugged

  has_many :editions, dependent: :destroy

  validates :name, presence: true
end
