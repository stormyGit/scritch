class Mutations::CreateMessage < Mutations::BaseMutation
  argument :body, String, required: true
  argument :picture, String, required: false
  argument :recipient_id, ID, required: true
  argument :case_id, ID, required: false
  argument :chat_id, ID, required: false
  argument :case_type, String, required: false

  field :message, Types::MessageType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    raise Pundit::NotAuthorizedError unless UserPolicy.new(context[:current_user], User.find(arguments[:recipient_id])).message?

    pp arguments
    message = Message.new(body: arguments[:body], picture: arguments[:picture])
    message.sender = context[:current_user]
    
    if arguments[:chat_id].blank?
      chat = Chat.find_by(case_id: arguments[:case_id], case_type: arguments[:case_type])
      if chat.present?
        message.chat = chat
      else
        message.chat = Chat.create!(case_id: arguments[:case_id], case_type: arguments[:case_type], sender: context[:current_user], recipient: User.find(arguments[:recipient_id]))
      end
    else
      message.chat = Chat.find(arguments[:chat_id])
    end

    # raise Pundit::NotAuthorizedError unless MessagePolicy.new(context[:current_user], message).create?

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
