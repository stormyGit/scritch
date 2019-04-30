require 'csv'

namespace :fields do
  task :categories, [:filepath] => :environment do |t, args|
    [
      "Animals & Pets",
      "Antiques & Collectibles",
      "Business Office & Industrial",
      "Comedic",
      "Computing & Technology",
      "Character Cosplay (Worn Over Fursuit)",
      "Fitness",
      "Food & Drink",
      "Fund Raising",
      "Furmeet",
      "Gaming",
      "Group",
      "Historical",
      "Holidays & Travel",
      "Home",
      "Inflatables",
      "Literature",
      "Macro/Micro",
      "Music & Instruments",
      "Other",
      "Outdoors",
      "Paws",
      "Plush",
      "Seasonal Event (Birthday/Wedding/Anniversary etc)",
      "Seasonal Event (Festive)",
      "Seasonal Event (Halloween)",
      "Seasonal Event (New Year)",
      "Seasonal Event (Other)",
      "Seasonal Event (Thanksgiving)",
      "Selfies",
      "Sports (Aquatic)",
      "Sports (Avianic)",
      "Sports (Other)",
      "Sports (Team)",
      "Sports (Winter)",
      "Underwear",
      "Vehicles (2 Wheels or Less)",
      "Vehicles (4 Wheels or More)",
      "Vehicles (4 Wheels)",
      "Vehicles (Airborne)",
      "Vehicles (Grouped Various)",
      "Vehicles (Tracked)",
      "Vehicles (Waterborne)"
    ].each do |e|
      Category.create!(name: e)
    end
  end

  task :sub_event, [:filepath] => :environment do |t, args|
    [
      "Charity Event",
      "Dance Competition",
      "Dealers Den/Artist Alley",
      "Excursions",
      "Floorwars",
      "Fureoke",
      "Fursuit Games/Fiasco",
      "Fursuit Parade/Walk",
      "Grounds/Outdoor Areas",
      "Hotel Room",
      "Main Lobby",
      "Main Stage Event (Other)",
      "Motorfurs",
      "Opening/Closed Ceremony",
      "Other",
      "Panels",
      "Photoshoots",
      "Raves/Dances/DJ Sets",
      "Room Party",
      "Talent/Variety Show"
    ].each do |e|
      SubEvent.create!(name: e)
    end
  end

  task :fursuits, [:filepath] => :environment do |t, args|
    [
      "Artist",
      "Cosplayer",
      "Dancer",
      "Fursuiter",
      "Furtuber",
      "Gamer",
      "Gearhead",
      "Musician",
      "Photographer"
    ].each do |e|
      FursuitFinger.create!(name: e)
    end

    [
      "Feminine",
      "Masculine",
      "Androgynous"
    ].each do |e|
      FursuitGender.create!(name: e)
    end

    [
      "Digitigrade",
      "Plantigrade",
      "Quad",
      "N/A"
    ].each do |e|
      FursuitLegType.create!(name: e)
    end

    [
      "Partial",
      "Fullsuit"
    ].each do |e|
      FursuitBuild.create!(name: e)
    end

    [
      "None",
      "Muscle",
      "Plush"
    ].each do |e|
      FursuitPadding.create!(name: e)
    end

    [
      "Realistic",
      "Toony",
      "Realistic Toony"
    ].each do |e|
      FursuitStyle.create!(name: e)
    end
  end
end
