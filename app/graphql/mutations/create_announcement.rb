class Mutations::CreateAnnouncement < Mutations::BaseMutation
  argument :title, String, required: true
  argument :body, String, required: true

  field :announcement, Types::AnnouncementType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    announcement = Announcement.new(arguments)

    if announcement.save
      {
        announcement: announcement,
        errors: [],
      }
    else
      {
        announcement: announcement,
        errors: announcement.errors.full_messages
      }
    end
  end
end
