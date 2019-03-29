module Types
  class ActivityTrackableType < BaseUnion
    description "Objects which may be subject of activities"
    possible_types LikeType, FollowType, CommentType, FursuitMediumType, FursuitType, ReportType, CommentReportType, MediumReportType, TagReportType, MakerType, AdvertType

    def self.resolve_type(object, context)
      if object.model_name.name === "Like"
        LikeType
      elsif object.model_name.name === "Follow"
        FollowType
      elsif object.model_name.name === "Comment"
        CommentType
      elsif object.model_name.name === "FursuitMedium"
        FursuitMediumType
      elsif object.model_name.name === "Fursuit"
        FursuitType
      elsif object.model_name.name === "Report"
        ReportType
      elsif object.model_name.name === "MediumReport"
        MediumReportType
      elsif object.model_name.name === "CommentReport"
        CommentReportType
      elsif object.model_name.name === "TagReport"
        TagReportType
      elsif object.model_name.name === "Maker"
        MakerType
      elsif object.model_name.name === "Advert"
        AdvertType
      end
    end
  end
end
