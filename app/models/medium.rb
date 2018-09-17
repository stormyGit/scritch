class Medium < ApplicationRecord
  self.primary_key = :uuid

  belongs_to :user
  belongs_to :video_encoding_job, class_name: "Chronofage::Job", primary_key: :job_id, dependent: :destroy, optional: true

  has_many :comments

  def push_video_encoding_job!
    update(video_encoding_job_id: EncodeVideoJob.perform_later(self).job_id)
  end

  def related_media
    Medium.all
  end
end
