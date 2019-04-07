require 'csv'

namespace :events do
  task :fetch => :environment do
    i = 0
    conlist = []
    csv_text = open("app/assets/csv/events.csv")
    csv = CSV.parse(csv_text, :headers => true)
    csv.each do |row|
      puts row
      if i == 0
        i = i + 1
        next
      end
      conlist << [row[0], row[1]]
      puts row[0]
      i = i + 1
    end

    conlist = conlist.uniq
    conlist.each do |e|
      puts e.to_s
      if e[1] == "No Link"
        Event.create!(name: e[0])
      else
        Event.create!(name: e[0], web: e[1])
      end
    end
    puts conlist.to_s
  end

  ###
  #####
  ###

  task :editions, [:filepath] => :environment do |t, args|
    i = 0
    editionList = []
    csv_text = open("app/assets/csv/events.csv")
    csv = CSV.parse(csv_text, :headers => true)
    csv.each do |row|
      if i == 0
        i = i + 1
        next
      end
      convention = row[0]
      attendance = row[2]
      theme = row[3]
      country = row[4]
      kind = row[5]
      location = row[6]
      venue = row[8]
      year = row[17]
      start_date = row[18]
      end_date = row[19]
      name = row[22]

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
        begin
          edition.event.avatar = File.open("app/assets/images/events/Scritch Event Thumbnail - #{edition.country}.png")
        rescue
          File.open("failedEvents", 'a') { |file| file.write("#{edition.event.name}\n")}
          edition.event.avatar = File.open("app/assets/images/events/FAILED.png")
        end
        edition.event.save!
      end
    end

  end
end
