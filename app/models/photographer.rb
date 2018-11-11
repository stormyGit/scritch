class Photographer < ApplicationRecord
  self.primary_key = :uuid

  extend FriendlyId
  friendly_id :name, use: :slugged

  belongs_to :user, optional: true
  has_many :media
end
