class User < ApplicationRecord
  has_secure_password
  
  self.primary_key = :uuid

  has_many :media
end
