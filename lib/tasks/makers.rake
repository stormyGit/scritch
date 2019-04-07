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
      puts makers.to_s
      puts "\n"
      puts "\n"
      puts "\n"
    end

    makers.each do |e|
      puts e
      puts "\n"
      if e[3] == 1
        maker = Maker.create!(name: e[0], country: "Owner Made", region: nil, web: nil, reference: e[3])
        maker.avatar = File.open("app/assets/images/makers/Scritch Maker Thumbnail - Owner Made.png")
        maker.save!
        next
      end
      maker = Maker.create!(name: e[0], country: e[1], region: e[4], web: e[2], reference: e[3])
      begin
        maker.avatar = File.open("app/assets/images/makers/Scritch Maker Thumbnail - #{maker.country}.png")
      rescue
        File.open("failedMakers", 'a') { |file| file.write("#{maker.name}\n")}
        maker.avatar = File.open("app/assets/images/makerPlaceholder.png")
      end
      maker.save!
    end

  end
end
