class Comment < ApplicationRecord
  self.primary_key = :uuid

  belongs_to :user
  belongs_to :medium, counter_cache: true
  belongs_to :parent, optional: true, class_name: "Comment", counter_cache: :replies_count
  has_many :replies, class_name: "Comment", foreign_key: :parent_id
end
