class TagReport < ApplicationRecord
  self.primary_key = :uuid

  include PublicActivity::Model
  tracked owner: Proc.new{ |_, model| User.last }, recipient: Proc.new{ |_, model| model.reporter }, only: [:create]
  # TODO
  #tracked owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV["ADMIN_ACCOUNT_TELEGRAM_ID"]) }, recipient: Proc.new{ |_, model| model.reporter }, only: [:create]

  belongs_to :medium
  belongs_to :reporter, class_name: "User", optional: true
  belongs_to :assignee, class_name: "Moderator", optional: true

  has_many :moderation_comments, as: :subject, class_name: "Moderation::Comment"

  def tags
    FursuitMedium.where(uuid: self.fursuit_medium_ids)
  end
end
