class FursuitUser < ApplicationRecord
  self.primary_key = :uuid
  has_many :activities, as: :trackable, class_name: 'PublicActivity::Activity', dependent: :destroy

  belongs_to :user
  belongs_to :fursuit
end
