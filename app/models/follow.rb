class Follow < ActiveRecord::Base
  self.primary_key = :uuid

  extend ActsAsFollower::FollowerLib
  extend ActsAsFollower::FollowScopes

  include PublicActivity::Model
  tracked owner: Proc.new{ |_, model| model.follower }, recipient:  Proc.new{ |_, model| model.followable }, only: [:create]

  has_many :activities, as: :trackable, class_name: 'PublicActivity::Activity', dependent: :destroy

  # NOTE: Follows belong to the "followable" and "follower" interface
  belongs_to :followable, polymorphic: true
  belongs_to :follower,   polymorphic: true

  def block!
    self.update_attribute(:blocked, true)
  end

end
