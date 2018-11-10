class PictureUploader < SecureUploader
  process :store_meta

  version :thumbnail do
    process resize_to_fill: [512, 512]
  end

  def store_meta
    if file.present? && model.present?
      image = ::MiniMagick::Image.open(file.file)
      model.width, model.height = image[:dimensions]
      # model.exif = image.exif
      # model.data = image.data
      model.size = image.size
    end
  end
end
