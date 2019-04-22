namespace :user_score do
  task :strike => :environment do
    User.where("score < ?", -100).each do |u|
      SuspendedUser.create!(user: u, limit: Time.now + (2 ** u.offenses_number).days, reason: "Score too low")
      u.update!(score: 0, offenses_number: u.offenses_number + 1)
    end
  end

  task :species => :environment do
    species = Specy.all.order(:name).pluck(:name)
    count = (User.count.to_f / species.count.to_f).ceil
    sp = 0
    j = 0
    User.where.not(uuid: SuspendedUser.all.pluck(:user_id)).order("users.global_score + users.score").find_each.with_index do |user, i|
      begin
        user.update!(metric_species: species[sp])
        j += 1
        if j == count && sp != species.count
          j = 0
          sp += 1
        end
      rescue => error
        TechReport.create!(user: User.first, description: "FAILED SPECIES RAKE :: USER #{user.name} - #{user.uuid}")
      end
    end
  end
end
