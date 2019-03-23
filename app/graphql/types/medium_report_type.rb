module Types
  class MediumReportType < Types::BaseObject
    description "MediumReport object"
    field :id, ID, null: false
    field :reported_picture_title, String, null: true

    def reported_picture_title
      object.medium&.title
    end
  end
end
