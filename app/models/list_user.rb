class ListUser < ApplicationRecord
  self.primary_key = :uuid
  self.table_name = "lists_users"
  
  belongs_to :user
  belongs_to :list
end
