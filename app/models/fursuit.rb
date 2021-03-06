class Fursuit < ApplicationRecord
  self.primary_key = :uuid

  include PublicActivity::Model

  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged
  has_many :activities, as: :trackable, class_name: 'PublicActivity::Activity', dependent: :destroy

  # has_many :fursuit_custom_attributes, dependent: :destroy
  belongs_to :fursuit_finger, optional: true
  belongs_to :fursuit_build, optional: true
  belongs_to :fursuit_padding, optional: true
  belongs_to :fursuit_style, optional: true
  belongs_to :fursuit_leg_type, optional: true
  belongs_to :fursuit_gender, optional: true

  has_many :claims, dependent: :destroy

  has_many :fursuit_subscriptions, dependent: :destroy

  mount_base64_uploader :avatar, AvatarUploader
  has_many :fursuit_users, dependent: :destroy
  has_many :users, through: :fursuit_users
  #
  has_many :fursuit_species, dependent: :destroy
  has_many :species, through: :fursuit_species, source: :specy
  #
  has_many :fursuit_makers, dependent: :destroy
  has_many :makers, through: :fursuit_makers
  #
  has_many :fursuit_media, dependent: :destroy
  has_many :media, through: :fursuit_media

  def slug_candidates
    [
      :name,
      [:name, "#{Fursuit.where(name: name).count + 1}"]
    ]
  end

  has_many :fursuit_subscriptions, dependent: :destroy

  def subscribers
    User.where(uuid: self.fursuit_subscriptions.pluck(:user_id))
  end

  def maker
    if self.makers.present?
      self.makers.first.name
    else
      nil
    end
  end

  BASE_COLORS = [
    "Brown",
    "Black",
    "Blue",
    "Green",
    "Grey",
    "Orange",
    "Pink",
    "Purple",
    "Rainbow",
    "Red",
    "White",
    "Yellow"
  ]

  EYES_COLORS = [
    "Brown",
    "Black",
    "Blue",
    "Green",
    "Grey",
    "Orange",
    "Pink",
    "Purple",
    "Multi",
    "Red",
    "White",
    "Yellow"
  ]
end
