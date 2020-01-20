class Mutations::DeleteAnnouncement < Mutations::BaseMutation
  argument :id, ID, required: true

  field :announcement, Types::AnnouncementType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    announcement = Announcement.find(arguments[:id])

    # raise Pundit::NotAuthorizedError unless AnnouncementPolicy.new(context[:current_user], announcement).update?

    if announcement.destroy
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
