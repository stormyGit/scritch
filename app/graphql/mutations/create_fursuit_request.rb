class Mutations::CreateFursuitRequest < Mutations::BaseMutation
  argument :user_id, ID, required: true
  argument :name, String, required: true
  argument :maker_ids, [ID], required: false
  argument :creation_year, Integer, required: false
  argument :fursuit_leg_type_id, ID, required: false
  argument :fursuit_style_id, ID, required: false
  argument :fursuit_padding_id, ID, required: false
  argument :fursuit_build_id, ID, required: false
  argument :fursuit_gender_id, ID, required: false
  argument :fursuit_finger_id, ID, required: false
  argument :is_hybrid, Boolean, required: false
  argument :species_ids, [ID], required: false
  argument :base_color, String, required: false
  argument :eyes_color, String, required: false
  argument :url, String, required: false
  argument :notes, String, required: false

  field :fursuit_request, Types::FursuitRequestType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    puts arguments
    fursuit_request = FursuitRequest.new(arguments)

    if fursuit_request.save
      {
        fursuit_request: fursuit_request,
        errors: [],
      }
    else
      {
        fursuit_request: nil,
        errors: fursuit_request.errors.full_messages
      }
    end
  end
end
