module Types
  class ActivityTrackableType < BaseUnion
    description "Objects which may be subject of activities"
    possible_types UserType, LikeType, FollowType, CommentType, AssetRequestType, FursuitRequestType, FursuitMediumType, FursuitSubscriptionType, FursuitType, ReportType, CommentReportType, MediumReportType, TagReportType, MakerType, AdvertType, FaveType

    def self.resolve_type(object, context)
      if object.model_name.name === "Like"
        LikeType
      elsif object.model_name.name === "AssetRequest"
        AssetRequestType
      elsif object.model_name.name === "FursuitRequest"
        FursuitRequestType
      elsif object.model_name.name === "Fave"
        FaveType
      elsif object.model_name.name === "Follow"
        FollowType
      elsif object.model_name.name === "Comment"
        CommentType
      elsif object.model_name.name === "FursuitMedium"
        FursuitMediumType
      elsif object.model_name.name === "FursuitSubscription"
        FursuitSubscriptionType
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
      elsif object.model_name.name === "User"
        UserType
      end
    end
  end
end
