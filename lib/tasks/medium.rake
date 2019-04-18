namespace :medium do
  task :unlock_tag => :environment do
    Medium.where(tag_locked: true).find_each do |e|
      if e.tag_lock_data < 30.minutes.ago
        e.update!(tag_locked: false, tagger: nil, tag_lock_data: nil)
      end
    end
  end
end
