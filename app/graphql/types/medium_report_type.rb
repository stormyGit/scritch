module Types
  class MediumReportType < Types::BaseObject
    description "MediumReport object"
    field :id, ID, null: false
    field :description, String, null: false
    field :medium, MediumType, null: false
    field :reporter, UserType, null: false

    field :reported_picture_title, String, null: true

    def reported_picture_title
      if object.medium.present?
        object.medium&.uuid.split("-")[0]
      end
      nil
    end
  end
end
