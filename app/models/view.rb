class View < ApplicationRecord
  self.primary_key = :uuid

  belongs_to :user, optional: true
  belongs_to :medium, counter_cache: true

  def self.add(medium_id, user_references)
    return if View.find_by("views.medium_id = ? AND (views.ip = ? OR views.user_id = ?)", medium_id, user_references[:ip], user_references[:user_id]).present?

    View.create({
      medium: Medium.find(medium_id),
    }.merge(user_references))
  end
end
