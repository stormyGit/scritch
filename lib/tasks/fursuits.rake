require 'csv'

namespace :fursuits do
  task :fetch, [:filepath] => :environment do |t, args|
    i = 0
    fursuits = []
    csv_text = open("https://s3.eu-west-3.amazonaws.com/storage.pogs-eip/Scritch+Backbone+Workbook+(Launch)+-+Fursuit+Card+Backbone.csv")
    csv = CSV.parse(csv_text, :headers => true)
    csv.each do |row|
      puts "#{row[2]} || #{row[5]} || #{row[8]} || #{row[20]} || #{row[23]} || #{row[24]} |-------| #{row[21]} || #{row[22]} || #{row[25]} || #{row[26]} || #{row[27]}\n\n"
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
      #
      fursuits << [name, species, creation_year, maker, style, legs, build, padding, fingers, base, eyes]
      i = i + 1
    end

    fursuits.each do |e|
      puts e.to_s
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
      if e[3].present? && e[3] != "UNKNOWN" && e[3] != "1"
        FursuitMaker.create!(fursuit: fursuit, maker: Maker.find_by(reference: e[3].to_i))
      end
    end

  end
end
