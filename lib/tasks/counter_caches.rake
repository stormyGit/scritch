namespace :counter_caches do
  task refresh_counters: :environment do
    Medium.reset_column_information
    Medium.find_each do |medium|
      Medium.reset_counters medium.id, :likers
      Medium.reset_counters medium.id, :comments
      Medium.reset_counters medium.id, :views
    end
  end
end
