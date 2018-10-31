module Types
  class ActivityTrackableType < BaseUnion
    description "Objects which may be subject of activities"
    possible_types LikeType, FollowType, CommentType, MediumType, ReportType

    def self.resolve_type(object, context)
      if object.model_name.name === "Like"
        LikeType
      elsif object.model_name.name === "Follow"
        FollowType
      elsif object.model_name.name === "Comment"
        CommentType
      elsif object.model_name.name === "Medium"
        MediumType
      elsif object.model_name.name === "Report"
        ReportType
      end
    end
  end
end
