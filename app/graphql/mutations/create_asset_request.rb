class Mutations::CreateAssetRequest < Mutations::BaseMutation
  argument :asset_name, String, required: true
  argument :asset_type, String, required: true
  argument :url, String, required: true
  argument :body, String, required: false

  field :asset_request, Types::AssetRequestType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    asset_request = AssetRequest.new(arguments)
    asset_request.user = context[:current_user]
    if /:\/\//.match?(arguments[:url])
      asset_request.url = arguments[:url].split("://")[1]
    end
  
    if asset_request.save
      {
        asset_request: asset_request,
        errors: [],
      }
    else
      {
        asset_request: nil,
        errors: asset_request.errors.full_messages
      }
    end
  end
end
