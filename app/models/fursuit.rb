class Fursuit < ApplicationRecord
  self.primary_key = :uuid

  extend FriendlyId
  friendly_id :name, use: :slugged

  # has_many :fursuit_custom_attributes, dependent: :destroy
  belongs_to :fursuit_finger, optional: true
  belongs_to :fursuit_build, optional: true
  belongs_to :fursuit_padding, optional: true
  belongs_to :fursuit_style, optional: true
  belongs_to :fursuit_specy, optional: true
  belongs_to :fursuit_leg_type, optional: true

  has_one :hybrid
  has_many :fursuit_species, through: :hybrid

  mount_base64_uploader :avatar, AvatarUploader
  has_many :fursuit_users
  has_many :users, through: :fursuit_users
  #
  has_many :fursuit_makers
  has_many :makers, through: :fursuit_makers
  #
  has_many :fursuit_media
  has_many :media, through: :fursuit_media

  # scope :with_species, -> (id) { where(fursuit_specy_id: id) }
  # scope :with_style,   -> (id) { where(fursuit_style_id: id) }
  # scope :with_legs,    -> (id) { where(fursuit_leg_type_id: id) }
  # scope :by_maker,     -> (id) { joins(:fursuit_makers).where("fursuit_makers.maker_id = ?", id) }

  def slug_candidates
    [
      :name,
      [:name, :creation_year]
    ]
  end

  def maker
    if self.makers.present?
      self.makers.first.name
    else
      nil
    end
  end
end
