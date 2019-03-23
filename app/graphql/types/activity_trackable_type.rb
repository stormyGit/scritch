module Types
  class ActivityTrackableType < BaseUnion
    description "Objects which may be subject of activities"
    possible_types LikeType, FollowType, CommentType, FursuitMediumType, FursuitUserType, MediumType, ReportType, CommentReportType, MediumReportType, TagReportType

    def self.resolve_type(object, context)
      if object.model_name.name === "Like"
        LikeType
      elsif object.model_name.name === "Follow"
        FollowType
      elsif object.model_name.name === "Comment"
        CommentType
      elsif object.model_name.name === "Medium"
        MediumType
      elsif object.model_name.name === "FursuitMedium"
        FursuitMediumType
      elsif object.model_name.name === "FursuitUser"
        FursuitUserType
      elsif object.model_name.name === "Report"
        ReportType
      elsif object.model_name.name === "MediumReport"
        MediumReportType
      elsif object.model_name.name === "CommentReport"
        CommentReportType
      elsif object.model_name.name === "TagReport"
        TagReportType
      end
    end
  end
end
