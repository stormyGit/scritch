class Mutations::CreateEdition < Mutations::BaseMutation
  argument :name, String, required: true
  argument :city, String, required: true
  argument :kind, String, required: true
  argument :theme, String, required: true
  argument :charity, String, required: true
  argument :guest_of_honours, String, required: true
  argument :attendance, Integer, required: true
  argument :venue, String, required: true
  argument :year, Integer, required: true

  field :edition, Types::EditionType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    edition = Edition.new
    edition.assign_attributes(arguments.except(:request_id))

    if event.avatar.blank?
      begin
        event.avatar = File.open("app/assets/images/events/Scritch Event Thumbnail - #{edition.country}.png")
      rescue
        event.avatar = File.open("app/assets/images/events/FAILED.png")
      end
    end

    if edition.save
      {
        edition: edition,
        errors: [],
      }
    else
      {
        edition: edition,
        errors: edition.errors.full_messages
      }
    end
  end
end
