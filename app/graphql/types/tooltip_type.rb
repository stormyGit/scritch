module Types
  class TooltipType < Types::BaseObject
    description "Tooltip object"
    field :id, ID, null: false
    field :public, Boolean, null: false
    field :file, String, null: false
    field :category, String, null: false

    def file
      object.file_url
    end

  end
end
