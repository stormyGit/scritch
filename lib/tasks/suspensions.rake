namespace :suspensions do
  task :unlock => :environment do
    SuspendedUser.where("suspended_users.limit < ?", Time.now).each do |su|
      su.destroy
    end
  end
end
