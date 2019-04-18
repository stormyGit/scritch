class Maker < ApplicationRecord
  self.primary_key = :uuid

  include PublicActivity::Model
  has_many :activities, as: :trackable, class_name: 'PublicActivity::Activity', dependent: :destroy

  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged

  belongs_to :user, optional: true
  mount_base64_uploader :avatar, AvatarUploader

  has_many :fursuit_makers, dependent: :destroy
  has_many :fursuits, through: :fursuit_makers

  has_many :maker_claims, dependent: :destroy

  def self.as_options_for_react_select
    distinct.order(:name).pluck(:name)
  end

  def self.as_options_for_select
    distinct.order(:name).pluck(:name, :uuid)
  end

  def slug_candidates
    [
      :name,
      [:name, "#{Maker.where(name: name).count + 1}"]
    ]
  end
end
