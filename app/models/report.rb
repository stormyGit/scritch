class Report < ApplicationRecord
  STATUSES = [
    :new,
    :dismissed,
    :accepted,
    :closed
  ]

  self.primary_key = :uuid

  belongs_to :user, optional: true
  belongs_to :reporter, class_name: "User", optional: true
  belongs_to :assignee, class_name: "Moderator", optional: true

  validates :description, presence: true
end
