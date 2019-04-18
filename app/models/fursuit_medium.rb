class FursuitMedium < ApplicationRecord
  self.primary_key = :uuid
  include PublicActivity::Model

  tracked on: {:create => Proc.new{ |model, controller| model.fursuit.users.count > 0 }}, owner: Proc.new{ |_, model| model.fursuit }, recipient:  Proc.new{ |_, model| model.fursuit.users.first }, only: [:create]
  has_many :activities, as: :trackable, class_name: 'PublicActivity::Activity', dependent: :destroy

  belongs_to :fursuit
  belongs_to :medium
  belongs_to :user
end
