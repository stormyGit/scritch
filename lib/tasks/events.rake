require 'csv'

namespace :events do
  task :fetch => :environment do
    i = 0
    conlist = []
    csv_text = open("https://s3.eu-west-3.amazonaws.com/storage.pogs-eip/Scritch+Backbone+Workbook+-+Convention-Event+Backbone.csv")
    csv = CSV.parse(csv_text, :headers => true)
    csv.each do |row|
      puts row
      if i == 0
        i = i + 1
        next
      end
      conlist << row[0]
      puts row[0]
      i = i + 1
    end

    conlist = conlist.uniq
    conlist.each do |e|
      puts e.to_s
      Event.create!(name: e)
    end
    puts conlist.to_s
  end

  ###
  #####
  ###

  task :editions, [:filepath] => :environment do |t, args|
    i = 0
    editionList = []
    csv_text = open("https://s3.eu-west-3.amazonaws.com/storage.pogs-eip/Scritch+Backbone+Workbook+-+Convention-Event+Backbone.csv")
    csv = CSV.parse(csv_text, :headers => true)
    csv.each do |row|
      if i == 0
        i = i + 1
        next
      end
      convention = row[0]
      attendance = row[1]
      theme = row[2]
      country = row[3]
      kind = row[4]
      location = row[5]
      venue = row[6]
      year = row[9]
      start_date = row[13]
      end_date = row[14]
      name = row[17]

      if country == "USA"
        country = "United States"
      elsif country == "Czechia"
        country = "Czech Republic"
      end
      editionList << [convention, attendance, theme, country, location, venue, kind, start_date, end_date, name, year]
      i = i + 1
    end

    editionList.each do |e|
      puts e.to_s
      edition = Edition.create!(
        event: Event.find_by(name: e[0]),
        attendance: e[1],
        #theme: e[2],
        country: e[3],
        city: e[4],
        venue: e[5],
        kind: e[6],
        start_date: DateTime.parse(e[7]),
        end_date: DateTime.parse(e[8]),
        name: e[9],
        year: e[10])
      if edition.event.avatar.blank?
        edition.event.avatar =
          begin
            File.open("app/assets/images/events/Scritch Event Thumbnail - #{edition.country}.png")
          rescue
            File.open("app/assets/images/eventPlaceholder.png")
          end
        edition.event.save!
      end
    end

  end
end
