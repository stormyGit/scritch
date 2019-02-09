module Types
  class AdvertType < Types::BaseObject
    description "Medium object"
    field :id, ID, null: false
    field :status, String, null: false
    field :public, Boolean, null: false
    field :file, String, null: false
    field :width, Integer, null: true
    field :height, Integer, null: true
    field :created_at, String, null: true
    field :user, UserType, null: true
    field :impressions, Integer, null: true

    def file
      object.file_url
    end

  end
end
