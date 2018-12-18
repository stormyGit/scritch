class Maker < ApplicationRecord
  self.primary_key = :uuid

  extend FriendlyId
  friendly_id :name, use: :slugged

  belongs_to :user, optional: true
  mount_base64_uploader :avatar, AvatarUploader

  has_many :fursuit_makers, dependent: :destroy
  has_many :fursuits, through: :fursuit_makers

  def self.as_options_for_react_select
    distinct.order(:name).pluck(:name)
  end

  def self.as_options_for_select
    distinct.order(:name).pluck(:name, :uuid)
  end

end
