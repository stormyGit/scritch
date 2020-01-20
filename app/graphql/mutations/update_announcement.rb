class Mutations::UpdateAnnouncement < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :body, String, required: false
  argument :title, String, required: false

  field :announcement, Types::AnnouncementType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    announcement = Announcement.find(arguments[:id])
    announcement.assign_attributes(arguments)

    # raise Pundit::NotAuthorizedError unless AnnouncementPolicy.new(context[:current_user], announcement).update?
    sleep(1)
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
