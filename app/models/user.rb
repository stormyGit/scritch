class User < ApplicationRecord
  self.primary_key = :uuid

  extend FriendlyId
  friendly_id :name, use: :slugged

  has_one_attached :avatar
  has_many :media
end
