require 'csv'

namespace :fursuits do
  task :fetch, [:filepath] => :environment do |t, args|
    i = 0
    File.new("failed", 'a')
    fursuits = []
    csv_text = open("app/assets/csv/fursuits.csv")
    csv = CSV.foreach(csv_text, :headers => true)
    csv.each do |row|
      puts row.to_s
    #  puts "ID: #{row[0]} |||| name: #{row[2]} || species: #{row[5]} || creation: #{row[8]} || maker: #{row[20]} || style: #{row[23]} || legs: #{row[24]} |-------| build: #{row[21]} || padding: #{row[22]} || fingers: #{row[25]} || base: #{row[26]} || eyes: #{row[27]} || file: #{row[28]}\n\n"
      name = row[1]
      species = row[2]
      creation_year = row[4].present? ? Date.parse(row[4]).year : nil
      maker = row[7]
      build = row[8]
      padding = row[9]
      style = row[10]
      legs = row[11]
      fingers = row[12]
      base = row[13]
      eyes = row[14]
      file = row[15]
      #
      fursuits << [name, species, creation_year, maker, style, legs, build, padding, fingers, base, eyes, file]
      i = i + 1
    end

    fursuits.each_with_index do |e, i|
      puts e.to_s
      puts "\n"
      begin
        if e[1] == "Hybrid Custom"
          fursuit = Fursuit.create!(
            name: e[0],
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
            is_hybrid: false,
            creation_year: e[2],
            fursuit_style: FursuitStyle.find_by(name: e[4]),
            fursuit_leg_type: FursuitLegType.find_by(name: e[5]),
            fursuit_build: FursuitBuild.find_by(name: e[6]),
            fursuit_padding: FursuitPadding.find_by(name: e[7]),
            fursuit_finger: FursuitFinger.find_by(name: e[8]),
            base_color: e[9],
            eyes_color: e[10],
            species_ids: [Specy.find_by(name: e[1]).uuid]
          )
        end
        begin
          fursuit.avatar = File.open("app/assets/images/species/#{e[11]}.png")
        rescue
          if Maker.find_by(reference: e[3].to_i).present?
            TechReport.create!(user: User.first, description: "FURSUIT AVATAR:: #{fursuit.name} by: #{Maker.find_by(reference: e[3].to_i).name}")
          else
            TechReport.create!(user: User.first, description: "FURSUIT AVATAR:: #{fursuit.name} by: UNKNOWN")
          end
          fursuit.avatar = File.open("app/assets/images/species/FAILED.png")
        end
        fursuit.save!
        if e[3].present? && e[3] != "UNKNOWN"
          FursuitMaker.create!(fursuit: fursuit, maker: Maker.find_by(reference: e[3].to_i))
        end
      rescue => error
        TechReport.create!(user: User.first, description: "FURSUIT CREATION:: #{e[0]} -- #{e[1]} -- #{e[9]} =======>>> #{error}")
      end


    end

  end
end
