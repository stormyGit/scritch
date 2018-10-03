class Comment < ApplicationRecord
  self.primary_key = :uuid

  belongs_to :user
  belongs_to :medium, counter_cache: true
end
