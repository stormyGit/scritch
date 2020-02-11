class Mutations::RejectMakerRequest < Mutations::BaseMutation
  argument :id, ID, required: true

  field :maker_request, Types::AssetRequestType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    maker_request = AssetRequest.find(arguments[:id])

    maker_request.status = "dismissed"
    maker_request.create_activity :rejected, owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: maker_request.user


    if maker_request.save
      {
        maker_request: maker_request,
        errors: [],
      }
    else
      {
        maker_request: maker_request,
        errors: maker_request.errors.full_messages
      }
    end
  end
end
