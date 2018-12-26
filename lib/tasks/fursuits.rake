namespace :fursuits do
  task :fetch, [:filepath] => :environment do |t, args|
    i = 0
    fursuits = []
    csv_text = open("https://s3.eu-west-3.amazonaws.com/storage.pogs-eip/Scritch+Fursuit+Card+Backbone+-+Backbone.csv")
    csv = CSV.parse(csv_text, :headers => true)
    csv.each do |row|
      puts "#{row[2]} || #{row[5]} || #{row[8]} || #{row[19]} || #{row[23]} || #{row[24]}\n\n"
      name = row[2]
      species = row[5]
      creation_year = row[8].present? ? row[8].to_i : nil
      maker = row[20]
      style = row[23]
      legs = row[24]
      #
      fursuits << [name, species, creation_year, maker, style, legs]
      i = i + 1
    end

    fursuits.each do |e|
      puts e.to_s
      fursuit = Fursuit.create!(name: e[0],
        fursuit_specy: FursuitSpecy.find_by(name: e[5]),
        creation_year: e[2],
        fursuit_style: FursuitStyle.find_by(name: e[4]),
        fursuit_leg_type: FursuitLegType.find_by(name: e[5])
      )
      if e[3].present? && e[3] != "UNKNOWN" && e[3] != "1"
        FursuitMaker.create!(fursuit: fursuit, maker: Maker.find_by(reference: e[3].to_i))
      end
    end

  end
end
