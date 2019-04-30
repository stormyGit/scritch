require 'csv'

namespace :tooltips do
  task :fetch, [:filepath] => :environment do |t, args|

    tooltips = []
    csv_text = open("app/assets/csv/tooltips.csv")
    csv = CSV.parse(csv_text, :headers => true)
    csv.each do |row|
      name = row[0]
      category = row[4]
      aspect = row[5]
      topic = row[6]
      body = row[10]
      tooltips << [name, category, aspect, topic, body]
    end

    tooltips.each do |e|
      puts e
      puts "\n"
      if e[1] == "Scritch"
        next
      end
      tooltip = Tooltip.create!(name: e[0], category: e[1], aspect: e[2], topic: e[3], body: e[4])
      begin
        tooltip.file = File.open("app/assets/images/tooltips/#{tooltip.name}.png")
      rescue
        TechReport.create!(user: User.first, description: "TOOLTIP:: #{tooltip.name}")
      end
      tooltip.save!
    end
  end
end
