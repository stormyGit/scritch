class Comment < ApplicationRecord
  self.primary_key = :uuid

  include PublicActivity::Model
  tracked owner: Proc.new{ |_, model| model.user }, recipient:  Proc.new{ |_, model| model.medium.user }

  belongs_to :user
  belongs_to :medium, counter_cache: true
  belongs_to :parent, optional: true, class_name: "Comment", counter_cache: :replies_count
  has_many :replies, class_name: "Comment", foreign_key: :parent_id
end
