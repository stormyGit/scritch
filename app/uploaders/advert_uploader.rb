class AdvertUploader < SecureUploader
  process :store_meta

  def store_meta
    if file.present? && model.present?
      image = ::MiniMagick::Image.open(file.file)
      model.width = image.width
      model.height = image.height
      model.size = image.size
    end
  end
end
