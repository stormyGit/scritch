class Moderation::Comment < ApplicationRecord
  self.table_name = "moderation_comments"
  
  belongs_to :subject, polymorphic: true, touch: true
  belongs_to :moderator
end
