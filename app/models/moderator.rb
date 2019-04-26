class Moderator < ApplicationRecord
  CAPABILITIES = %w(
    adverts
    analytics
    assets
    suspended_users
    claims
    events
    moderators
    reports
    sponsors
    tech
    tooltips
  )

  devise :database_authenticatable, :rememberable, :trackable

  has_many :moderation_comments, class_name: "Moderation::Comment"

end
