module Types
  class ReportType < Types::BaseObject
    description "Report object"
    field :id, ID, null: false
    field :description, String, null: false
    field :user, UserType, null: false
    field :reporter, UserType, null: false
    field :reported_user_name, String, null: true

    def reported_user_name
      object.user&.name
    end
  end
end
