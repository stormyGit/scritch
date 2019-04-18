namespace :suspensions do
  task :unlock => :environment do
    SuspendedUser.where("limit < ?", Time.now).each do |su|
      su.destroy
    end
  end
end
