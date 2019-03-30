require 'csv'

namespace :fursuits do
  task :fetch, [:filepath] => :environment do |t, args|
    i = 0
    File.new("failed", 'a')
    fursuits = []
    csv_text = open("app/assets/csv/fursuits.csv")
    csv = CSV.foreach(csv_text, :headers => true)
    csv.each do |row|
      puts row
      puts "ID: #{row[0]} |||| name: #{row[2]} || species: #{row[5]} || creation: #{row[8]} || maker: #{row[20]} || style: #{row[23]} || legs: #{row[24]} |-------| build: #{row[21]} || padding: #{row[22]} || fingers: #{row[25]} || base: #{row[26]} || eyes: #{row[27]} || file: #{row[28]}\n\n"
      name = row[2]
      species = row[5]
      creation_year = row[8].present? ? row[8].to_i : nil
      maker = row[20]
      style = row[23]
      legs = row[24]
      build = row[21]
      padding = row[22]
      fingers = row[25]
      base = row[26]
      eyes = row[27]
      file = row[28]
      #
      fursuits << [name, species, creation_year, maker, style, legs, build, padding, fingers, base, eyes, file]
      i = i + 1
    end

    fursuits.each do |e|
      if e[3] == "1"
        next
      end

      puts e.to_s
      puts "\n"
      fursuit =
        if e[1] == "Hybrid"
          fursuit = Fursuit.create!(
            name: e[0],
            fursuit_specy: nil,
            is_hybrid: true,
            creation_year: e[2],
            fursuit_style: FursuitStyle.find_by(name: e[4]),
            fursuit_leg_type: FursuitLegType.find_by(name: e[5]),
            fursuit_build: FursuitBuild.find_by(name: e[6]),
            fursuit_padding: FursuitPadding.find_by(name: e[7]),
            fursuit_finger: FursuitFinger.find_by(name: e[8]),
            base_color: e[9],
            eyes_color: e[10]
          )
        else
          fursuit = Fursuit.create!(
            name: e[0],
            fursuit_specy: FursuitSpecy.find_by(name: e[1]),
            creation_year: e[2],
            fursuit_style: FursuitStyle.find_by(name: e[4]),
            fursuit_leg_type: FursuitLegType.find_by(name: e[5]),
            fursuit_build: FursuitBuild.find_by(name: e[6]),
            fursuit_padding: FursuitPadding.find_by(name: e[7]),
            fursuit_finger: FursuitFinger.find_by(name: e[8]),
            base_color: e[9],
            eyes_color: e[10]
          )
        end

      fursuit.avatar =
        begin
          File.open("app/assets/images/species/#{e[11]}.png")
        rescue
          File.open("app/assets/images/species/FAILED.png")
            File.open("failed", 'a') { |file| file.write("#{fursuit.name} by: #{Maker.find_by(reference: e[3].to_i)}\n")}
        end
      fursuit.save!
      if e[3].present? && e[3] != "UNKNOWN"
        FursuitMaker.create!(fursuit: fursuit, maker: Maker.find_by(reference: e[3].to_i))
      end
    end

  end
end
