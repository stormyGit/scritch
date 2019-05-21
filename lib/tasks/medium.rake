namespace :medium do
  task :unlock_tag => :environment do
    Medium.where(tag_locked: true).find_each do |e|
      if e.tag_lock_data < 30.minutes.ago
        e.update!(tag_locked: false, tagger: nil, tag_lock_data: nil)
      end
    end
  end

  task :fix_exif => :environment do
    Medium.where.not(exif: nil).each do |e|
      tmp = {
        "DateTimeOriginal" => e.exif["DateTimeOriginal"],
        "Model" => e.exif["Model"],
        "FNumber" => e.exif["FNumber"],
        "ExposureTime" => e.exif["ExposureTime"],
        "FocalLength" => e.exif["FocalLength"],
        "ISOSpeedRatings" => e.exif["ISOSpeedRatings"],
        "Flash" => e.exif["Flash"],
      }
      e.exif = tmp
      e.save!
    end

  end
end
