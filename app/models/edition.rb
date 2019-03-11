class Edition < ApplicationRecord
  self.primary_key = :uuid

  extend FriendlyId
  friendly_id :slug_candidates, use: [:scoped, :slugged], scope: :event

  belongs_to :event
  has_many :media
  has_many :sub_event, dependent: :destroy

  mount_base64_uploader :picture, PictureUploader

  validates :name, presence: true
  validates :slug, presence: true
  
  def slug_candidates
    [
      :name,
      [:name, "#{Edition.where(event: self.event, name: name).count + 1}"]
    ]
  end
end
