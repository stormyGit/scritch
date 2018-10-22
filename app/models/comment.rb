class Comment < ApplicationRecord
  self.primary_key = :uuid

  include PublicActivity::Model
  tracked owner: Proc.new{ |_, model| model.user }, recipient:  Proc.new{ |_, model| model.medium.user }, only: [:create]

  has_many :activities, as: :trackable, class_name: 'PublicActivity::Activity', dependent: :destroy

  belongs_to :user
  belongs_to :medium
  belongs_to :parent, optional: true, class_name: "Comment", counter_cache: :replies_count, touch: true
  has_many :replies, class_name: "Comment", foreign_key: :parent_id, dependent: :destroy

  after_create :update_counter_cache
  after_destroy :update_counter_cache

  protected

  def update_counter_cache
    if self.parent.present?
      return if self.parent.frozen?

      self.parent.replies_count = Comment.where(medium: self.medium, parent: self.parent).count
      self.parent.save
    else
      return if self.medium.frozen?

      self.medium.comments_count = Comment.where(medium: self.medium, parent: nil).count
      self.medium.save
    end
  end
end
