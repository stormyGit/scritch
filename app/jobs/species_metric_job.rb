class SpeciesMetric < ApplicationJob
  queue_as :default

  def perform()
    species = Specy.all.pluck(:name).order(:name)
    count = User.count / species.count
    sp = 0
    j = 0
    User.order(:global_score).find_each.with_index do |user, i|
      user.update!(metric_species: species[sp].name)
      j += 1
      if j == count && sp != species.count
        j = 0
        sp += 1
      end
    end
  end

end
