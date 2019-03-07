class FursuitUser < ApplicationRecord
  self.primary_key = :uuid

  include PublicActivity::Model
  tracked owner: Proc.new{ |_, model| model.fursuit }, recipient:  Proc.new{ |_, model| model.user }, only: [:create]

  belongs_to :user
  belongs_to :fursuit
end
