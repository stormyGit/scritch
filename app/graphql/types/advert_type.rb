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
    field :user, UserType, null: false
    field :impressions, Integer, null: false
    field :is_placeholder, Boolean, null: false
    field :clicks, Integer, null: false
    field :url, String, null: false

    def file
      object.file_url
    end

  end
end
