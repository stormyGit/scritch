module Types
  class TechReportType < Types::BaseObject
    description "TechReport object"
    field :id, ID, null: false
    field :description, String, null: false
    field :kind, String, null: false
    field :page, String, null: true
    field :user, UserType, null: true

  end
end
