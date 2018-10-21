class MediumPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.blank?
        scope.where(restriction: 'none', visibility: 'public').published
      else
        scope
          .where("media.user_id = ? OR (media.visibility = ? AND media.restriction != ?) OR (media.visibility = ? AND media.restriction = ? AND ?)", user.uuid, 'public', 'content_producers', 'public', 'content_producers', user.media.published.any?)
          .where("media.user_id = ? OR media.published_at IS NOT NULL", user.uuid)
      end
    end
  end

  def show?
    if user.blank?
      record.published_at.present? && record.restriction == 'none'
    elsif record.published_at.present?
      if record.restriction == 'content_producers'
        user.media.published.any?
      else
        true
      end
    else
      record.user == user
    end
  end

  def create?
    user.present? && user == record.user
  end

  def update?
    create?
  end

  def destroy?
    create?
  end
end
