class Moderator < ApplicationRecord
  CAPABILITIES = %w(
    analytics
    reports
    assets
    events
    moderators
    banned_users
  )

  devise :database_authenticatable, :rememberable, :trackable

  has_many :moderation_comments, class_name: "Moderation::Comment"

end
