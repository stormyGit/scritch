require 'csv'

namespace :makers do
  task :fetch, [:filepath] => :environment do |t, args|
    i = 0
    makers = []
    csv_text = open("app/assets/csv/makers.csv")
    csv = CSV.parse(csv_text, :headers => true)
    csv.each do |row|
      name = row[2]
      country = row[0]
      region = row[1] == "Unknown" ? nil : row[1]
      web_1 = row[5]
      # puts "#{i + 2} => #{name}"
      makers << [name, country, web_1, i + 1, region]
      i = i + 1
    end

    makers.each do |e|
      puts e
      puts "\n"
      begin
        if e[3] == 1
          maker = Maker.create!(name: e[0], country: "Owner Made", region: nil, web: nil, reference: e[3])
          maker.commission_status = CommissionStatus.find_by(name: "Closed")
          maker.avatar = File.open("app/assets/images/makers/Scritch Maker Thumbnail - Owner Made.png")
          maker.save!
          next
        end
        maker = Maker.create!(name: e[0], country: e[1], region: e[4], web: e[2], reference: e[3])
        maker.commission_status = CommissionStatus.find_by(name: "Closed")
        begin
          maker.avatar = File.open("app/assets/images/makers/Scritch Maker Thumbnail - #{maker.country}.png")
        rescue
          TechReport.create!(kind: "exception", user: User.first, description: "MAKER:: #{maker.name}")
          maker.avatar = File.open("app/assets/images/makerPlaceholder.png")
        end
        maker.save!
      rescue
        TechReport.create!(kind: "exception", user: User.first, description: "MAKER CREATE:: #{e[0]}")
      end
    end

  end
end
