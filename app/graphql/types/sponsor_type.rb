module Types
  class SponsorType < Types::BaseObject
    description "Sponsor object"
    field :id, ID, null: false
    field :user, UserType, null: false
    field :limit, Integer, null: true
    field :plan, String, null: true
    field :status, String, null: false
    field :created_at, String, null: false

    def created_at
      object.created_at.iso8601
    end
  end
end
