class Event < ApplicationRecord
  self.primary_key = :uuid

  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged

  has_many :editions, dependent: :destroy

  mount_base64_uploader :avatar, AvatarUploader

  validates :name, presence: true

  def slug_candidates
    [
      :name,
      [:name, "#{Event.where(name: name).count + 1}"]
    ]
  end
end
