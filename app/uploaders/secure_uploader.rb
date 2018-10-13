class SecureUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  def store_dir
    Digest::SHA1.hexdigest("#{Rails.application.secrets.secret_key_base}#{model.id}#{self.class}")
  end

  def filename
    "picture.#{file.extension}" if original_filename.present?
  end
end
