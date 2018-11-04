class Mutations::CreateMessage < Mutations::BaseMutation
  argument :body, String, required: true
  argument :recipient_id, ID, required: true

  field :message, Types::MessageType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    raise Pundit::NotAuthorizedError unless UserPolicy.new(context[:current_user], User.find(arguments[:recipient_id])).message?

    message = Message.new(body: arguments[:body])
    message.sender = context[:current_user]
    message.chat = Chat.find_or_create_by(uuid: IdXor.xor_ids(arguments[:recipient_id], context[:current_user].id)) do |chat|
      chat.sender = context[:current_user]
      chat.recipient = User.find(arguments[:recipient_id])
    end

    raise Pundit::NotAuthorizedError unless MessagePolicy.new(context[:current_user], message).create?

    if message.save
      {
        message: message,
        errors: [],
      }
    else
      {
        message: nil,
        errors: message.errors.full_messages
      }
    end
  end
end
