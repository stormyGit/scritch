class TooltipUploader < SecureUploader
  process :store_meta

  def store_meta
    if file.present? && model.present?
      image = ::MiniMagick::Image.open(file.file)
    end
  end
end
