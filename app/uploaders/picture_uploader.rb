class PictureUploader < SecureUploader

  def only_first_frame
    manipulate! do |img|
      if img.mime_type.match /gif/
        img.layers[0]
      end
      img
    end
  end

  version :resized do
    process resize_to_fit: [1280, nil]
  end

  version :thumbnail do
     process :only_first_frame
     process resize_to_fit: [nil, 256]
  end

  # def mogrify
  #   manipulate! do |img|
  #     img.format do |c|
  #       convert.profile.+('!icc,!xmp,*')
  #     end
  #   end
  # end

  def strip
    manipulate! do |img|
      img.strip
      img = yield(img) if block_given?
      img
    end
  end

  def store_meta
    if file.present? && model.present?
      image = ::MiniMagick::Image.open(file.file)
      if image.exif["Orientation"] == "6"
        model.width = image.height
        model.height = image.width
      else
        model.width = image.width
        model.height = image.height
      end
      if file.content_type == "image/gif" || file.content_type == "application/mp4"
        model.is_gif = true
      end
      if image.exif
        model.exif = image.exif.except(
          "GPSInfo",
          "GPSVersionID",
          "GPSLatitudeRef",
          "GPSLatitude",
          "GPSLongitudeRef",
          "GPSLongitude",
          "GPSAltitudeRef",
          "GPSAltitude",
          "GPSTimeStamp",
          "GPSProcessingMethod",
          "GPSDateStamp"
        )
      end
      # model.data = image.data
      model.size = image.size
    end
  end

  #process :mogrify
  process :store_meta
  process :strip

end
