class PictureUploader < SecureUploader
  process :store_meta

  version :square do
    process resize_to_fill: [512, 512]
  end

  version :thumbnail do
    process resize_to_fit: [nil, 256]
  end

  def store_meta
    if file.present? && model.present?
      image = ::MiniMagick::Image.open(file.file)
      puts "\n\n\n\n#{image.exif["Orientation"]}\n\n\n\n"
      if image.exif["Orientation"] == "6"
        model.width = image.height
        model.height = image.width
      else
        model.width = image.width
        model.height = image.height
      end
      if image.exif
        model.exif = image.exif
      end
      # model.data = image.data
      model.size = image.size
    end
  end
end
