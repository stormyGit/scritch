class Moderator < ApplicationRecord
  CAPABILITIES = %w(
    adverts
    analytics
    assets
    suspended_users
    events
    fursuit_claims
    maker_claims
    moderators
    reports
    sponsors
    tech
    tooltips
  )

  devise :database_authenticatable, :rememberable, :trackable, :recoverable, :rememberable

  has_many :moderation_comments, class_name: "Moderation::Comment"

end
