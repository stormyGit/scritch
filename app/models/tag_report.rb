class TagReport < ApplicationRecord
  self.primary_key = :uuid

  belongs_to :medium
  belongs_to :reporter, class_name: "User", optional: true
  belongs_to :assignee, class_name: "Moderator", optional: true

  has_many :moderation_comments, as: :subject, class_name: "Moderation::Comment"
end
