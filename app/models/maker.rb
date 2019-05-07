class Maker < ApplicationRecord
  self.primary_key = :uuid

  include PublicActivity::Model
  has_many :activities, as: :trackable, class_name: 'PublicActivity::Activity', dependent: :destroy

  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged

  belongs_to :user, optional: true
  belongs_to :commission_status, optional: true
  mount_base64_uploader :avatar, AvatarUploader

  has_many :fursuit_makers, dependent: :destroy
  has_many :fursuits, through: :fursuit_makers

  has_many :maker_claims, dependent: :destroy

  def slug_candidates
    [
      :name,
      [:name, "#{Maker.where(name: name).count + 1}"]
    ]
  end

  has_many :maker_subscriptions, dependent: :destroy

  def subscribers
    User.where(uuid: self.maker_subscriptions.pluck(:user_id))
  end

end
