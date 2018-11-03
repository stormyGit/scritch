ActiveAdmin.register Medium do
  permit_params :user_id, :title, :description, :share_on_twitter

  action_item :refuse, only: [:show, :edit] do
    if resource.refused_at.present?
      link_to('Cancel refuse', cancel_refuse_admin_medium_path(resource), method: :put, data: { confirm: "Are you sure you?" })
    else
      link_to('Refuse', refuse_admin_medium_path(resource), method: :put, data: { confirm: "Are you sure you want to refuse this video?" })
    end
  end

  member_action :refuse, method: :put do
    resource.create_activity key: 'medium.refused', owner: User.find_by(telegram_id: ENV["ADMIN_ACCOUNT_TELEGRAM_ID"]), recipient: resource.user
    resource.update(refused_at: DateTime.now)
    redirect_to resource_path, notice: "Medium refused"
  end

  member_action :cancel_refuse, method: :put do
    resource.update(refused_at: nil)
    redirect_to resource_path, notice: "Medium set back to waiting"
  end

  action_item :accept, only: [:show, :edit] do
    unless resource.refused_at.present?
      if resource.published_at.present?
        link_to('Reencode', accept_admin_medium_path(resource), method: :put)
      elsif resource.video_encoding_job.blank?
        link_to('Accept and encode', accept_admin_medium_path(resource), method: :put)
      end
    end
  end

  member_action :accept, method: :put do
    resource.create_activity key: 'medium.accepted', owner: User.find_by(telegram_id: ENV["ADMIN_ACCOUNT_TELEGRAM_ID"]), recipient: resource.user
    if resource.reload.video_encoding_job.blank? || resource.reload.video_encoding_job.state == :completed
      resource.push_video_encoding_job!
      redirect_to resource_path, notice: "Medium accepted"
    end
  end

  config.sort_order = 'created_at_desc'

  filter :user
  filter :id
  filter :created_at

  index do
    selectable_column
    id_column

    column :status do |record|
      record.video_encoding_job&.state
    end

    column :user
    column :share_on_twitter
    column :created_at
    column :updated_at

    actions
  end

  show do
    attributes_table do
      row :id
      row :user
      row :video do |record|
        video(width: 640, height: 480, controls: true) do
          source(src: "https://s3.amazonaws.com/#{ENV['TEMPORARY_S3_BUCKET']}/#{record.temporary_key}")
        end
      end
      row :temporary_file do |record|
        link_to "Download", "https://s3.amazonaws.com/#{ENV['TEMPORARY_S3_BUCKET']}/#{record.temporary_key}"
      end

      row :thumbnail do |record|
        img src: "#{ENV['S3_ENDPOINT']}/#{ENV['S3_BUCKET']}/#{record.thumbnail_key}"
      end

      row :preview do |record|
        img src: "#{ENV['S3_ENDPOINT']}/#{ENV['S3_BUCKET']}/#{record.thumbnail_key}"
      end

      row :created_at
      row :updated_at
    end
  end

  form do |f|
    f.inputs "Associations" do
      f.input :user
    end
    f.inputs "Medium Details" do
      f.input :id
      f.input :title
      f.input :description
      f.input :share_on_twitter
    end
    f.actions
  end
end
