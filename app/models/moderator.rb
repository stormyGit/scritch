class Moderator < ApplicationRecord
  CAPABILITIES = %w(
    analytics
    reports
    assets
    events
    tech
    moderators
    banned_users
    claims
    adverts
  )

  devise :database_authenticatable, :rememberable, :trackable

  has_many :moderation_comments, class_name: "Moderation::Comment"

end
