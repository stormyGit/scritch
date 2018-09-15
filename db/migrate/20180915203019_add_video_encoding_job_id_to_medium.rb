class AddVideoEncodingJobIdToMedium < ActiveRecord::Migration[5.2]
  def change
    add_column :media, :video_encoding_job_id, :string
  end
end
