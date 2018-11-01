namespace :statistics do
  task :gather_data => :environment do
    Statistic.create!(users: User.count, chats: Chat.count, messages: Message.count, likes: Like.count, media: Medium.count)
  end
end
