class Report < ApplicationRecord
  self.primary_key = :uuid

  include PublicActivity::Model
  tracked owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV["ADMIN_ACCOUNT_TELEGRAM_ID"]) }, recipient: Proc.new{ |_, model| model.reporter }, only: [:create]

  belongs_to :user, optional: true
  belongs_to :reporter, class_name: "User", optional: true
  belongs_to :assignee, class_name: "Moderator", optional: true

  validates :description, presence: true

  has_many :moderation_comments, as: :subject, class_name: "Moderation::Comment"

  STATUSES = [
    :new,
    :dismissed,
    :accepted,
    :closed
  ]
end
