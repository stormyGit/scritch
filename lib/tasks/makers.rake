namespace :makers do
  task :fetch, [:filepath] => :environment do |t, args|
    i = 0
    makers = []
    csv_text = open("https://s3.eu-west-3.amazonaws.com/storage.pogs-eip/Scritch+Fursuit+Maker+Backbone+-+Backbone.csv")
    csv = CSV.parse(csv_text, :headers => true)
    csv.each do |row|
      name = row[2]
      country = row[0]
      web_1 = row[4]
      puts "#{i + 2} => #{name}"
      makers << [name, country, web_1, i + 2]
      i = i + 1
    end

    makers.each do |e|
      Maker.create!(name: e[0], country: e[1], web: e[2], reference: e[3])
    end

  end
end
