namespace :user_score do
  task :strike => :environment do
    User.where("score < ?", -100).each do |u|
      SuspendedUser.create!(user: u, limit: Time.now + (2 ** u.offenses_number).days, reason: "Score too low")
      u.update!(score: 0, offenses_number: u.offenses_number + 1)
    end
  end

  task :compute_global => :environment do
    User.find_each do |e|
      tags = FursuitMedium.where(user: e).distinct.count
      pictures = Medium.where(user: e).distinct.count

      e.update!(global_score: pictures + tags)
    end
  end


  task :species => :environment do
    Rails.logger = Logger.new(STDOUT)
    species = Specy.all.order(:name).pluck(:name)
    count = (User.count.to_f / species.count.to_f).floor
    sp = 0
    j = 0
    puts User.where.not(uuid: SuspendedUser.all.pluck(:user_id)).order("users.global_score + users.score").pluck("users.global_score + users.score")
    User.where.not(uuid: SuspendedUser.all.pluck(:user_id)).order("users.global_score + users.score").each_with_index do |user, i|
      puts [i, j, count, sp, species.count].to_s
      begin
        user.update!(metric_species: species[sp])
        j += 1
        if j == count && sp < (species.count - 1)
          j = 0
          sp += 1
        end
      rescue => error
        TechReport.create!(user: User.first, description: "FAILED SPECIES RAKE :: USER #{user.name} - #{user.uuid}")
      end
    end
  end
end
