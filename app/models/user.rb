class User < ApplicationRecord
  self.primary_key = :uuid
  
  has_one_attached :avatar
  has_many :media
end
