class Medium < ApplicationRecord
  self.primary_key = :uuid

  extend FriendlyId
  friendly_id :title, use: :slugged

  include PublicActivity::Model
  tracked owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV["ADMIN_ACCOUNT_TELEGRAM_ID"]) }, recipient: Proc.new{ |_, model| model.user }, only: []

  acts_as_taggable

  has_many :activities, as: :trackable, class_name: 'PublicActivity::Activity', dependent: :destroy

  belongs_to :user
  belongs_to :edition, optional: true

  has_many :likes, dependent: :destroy
  has_many :likers, through: :likes, source: :user

  has_many :views, dependent: :destroy

  has_many :comments

  belongs_to :category, optional: true
  belongs_to :panel, optional: true

  has_many :fursuit_media, dependent: :destroy
  has_many :fursuits, through: :fursuit_media

  validates :picture, presence: true
  validates :title, presence: true

  mount_base64_uploader :picture, PictureUploader

  def get_completion
    completion = 20

    if self.edition.present?
      completion += 10
    end

    if self.category.present?
      completion += 10
    end

    if self.fursuits_count.present?
      completion += 10
      completion += (50 * (1 / self.fursuits_count)) # self.fursuits.count / self.fursuits_count
    end


    completion
  end
end
