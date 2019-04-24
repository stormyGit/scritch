class FursuitSubscription < ApplicationRecord
  self.primary_key = :uuid

  include PublicActivity::Model
  tracked on: {:create => Proc.new{ |model, controller| model.fursuit.users.count > 0 }}, owner: Proc.new{ |_, model| model.user }, recipient:  Proc.new{ |_, model| model.fursuit.users.first }, only: [:create]
  has_many :activities, as: :trackable, class_name: 'PublicActivity::Activity', dependent: :destroy

  belongs_to :user
  belongs_to :fursuit
end
