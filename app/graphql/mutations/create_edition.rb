class Mutations::CreateEdition < Mutations::BaseMutation
  require 'date'
  argument :event_id, ID, required: true
  argument :name, String, required: true
  argument :city, String, required: true
  argument :country, String, required: true
  argument :start_date, String, required: true
  argument :end_date, String, required: true
  argument :kind, String, required: true
  argument :theme, String, required: false
  argument :charity, String, required: false
  argument :guest_of_honours, String, required: false
  argument :attendance, Integer, required: false
  argument :venue, String, required: false
  argument :year, Integer, required: true

  field :edition, Types::EditionType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    edition = Edition.new
    edition.assign_attributes(arguments.except(:request_id, :guest_of_honours, :start_date, :end_date))

    if arguments[:guest_of_honours].present?
      edition.guest_of_honours = arguments[:guest_of_honours].split(",")
    end

    edition.start_date = DateTime.rfc3339(arguments[:start_date])
    edition.end_date = DateTime.rfc3339(arguments[:end_date])

    if edition.event.avatar.blank?
      begin
        edition.event.avatar = File.open("app/assets/images/events/Scritch Event Thumbnail - #{edition.country}.png")
      rescue
        edition.event.avatar = File.open("app/assets/images/events/FAILED.png")
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
