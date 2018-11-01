class Moderation::CommentsController < ModerationController
  def create
    comment = Moderation::Comment.new(params.require(:moderation_comment).permit(:body, :subject_id, :subject_type))
    comment.moderator = current_moderator
    comment.save!

    redirect_back fallback_location: moderation_root_path
  end
end
