require 'csv'

namespace :toto do
  task :fetch => :environment do
    i = 0
    conlist = []
    csv_text = open("https://s3.eu-west-3.amazonaws.com/storage.pogs-eip/Scritch+Backbone+Workbook+-+Convention-Event+Backbone.csv")
    csv = CSV.parse(csv_text, :headers => true)
    csv.each do |row|
      puts row
    end
  end
end
