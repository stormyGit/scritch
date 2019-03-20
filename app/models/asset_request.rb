class AssetRequest < ApplicationRecord
  self.primary_key = :uuid

  belongs_to :user
  belongs_to :assignee, class_name: "Moderator", optional: true
  has_many :moderation_comments, as: :subject, class_name: "Moderation::Comment"

  include PublicActivity::Model
  tracked owner: Proc.new{ |_, model| User.first }, recipient: Proc.new{ |_, model| model.user }, only: [:mark_as_accepted]

  validates :asset_name, presence: true
  validates :url, presence: true
  validates :asset_type, presence: true


  STATUSES = [
    :new,
    :dismissed,
    :accepted,
    :closed
  ]
end
