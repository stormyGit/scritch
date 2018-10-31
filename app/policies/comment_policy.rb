class CommentPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      comments = scope
        .joins(:medium)
        .joins("INNER JOIN users AS commenters ON commenters.uuid = comments.user_id")
        .joins("INNER JOIN users AS commenteds ON commenteds.uuid = media.user_id")
        .where.not("commenters.uuid::text = SOME(commenteds.blocked_users_ids)")
        .where.not("commenteds.uuid::text = SOME(commenters.blocked_users_ids)")

      if user.present?
        comments
          .where.not("? = SOME(commenters.blocked_users_ids)", user.uuid)
          .where.not(commenters: { uuid: Array(user.blocked_users_ids) })
          .where.not("? = SOME(commenteds.blocked_users_ids)", user.uuid)
          .where.not(commenteds: { uuid: Array(user.blocked_users_ids) })
      else
        comments
      end
    end
  end

  def show?
    true
  end

  def create?
    user.present? && user == record.user && !record.medium.comments_disabled? && !user.has_block_with?(record.user)
  end

  def update?
    create?
  end

  def destroy?
    create? || user == record.medium.user
  end
end
