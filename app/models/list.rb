class List < ApplicationRecord
  self.primary_key = :uuid

  belongs_to :user

  has_many :user_lists, dependent: :destroy
  has_many :users, through: :user_lists
end
