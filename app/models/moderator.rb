class Moderator < ApplicationRecord
  CAPABILITIES = %w(
    adverts
    analytics
    announcements
    assets
    delete_and_edit
    events
    extra_analytics
    fursuit_claims
    maker_claims
    moderators
    reports
    sponsors
    suspended_users
    tickets
    tech
    tooltips
  )

  devise :database_authenticatable, :rememberable, :trackable, :recoverable, :rememberable

  has_many :moderation_comments, class_name: "Moderation::Comment"

  has_many :chats_as_sender, class_name: "Chat", foreign_key: :sender_id, dependent: :destroy, inverse_of: :sender
end
