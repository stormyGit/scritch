ActiveAdmin.register Report do

  config.sort_order = 'created_at_desc'

  permit_params :description, :reporter_id, :user_id, :status

  filter :user_name, label: 'Reported user\'s name', as: :string
  filter :reporter_name, as: :string
  filter :description
  filter :created_at
  filter :status, as: :select, collection: Report::STATUSES

  index do
    selectable_column
    id_column

    column 'Reported user' do |record|
      record.user
    end

    column :reporter

    column 'Description' do |record|
      record.description.truncate(70)
    end

    column :status
    column :created_at
    actions
  end


  form do |f|
    f.inputs "Associations" do
      f.input :reporter, hint: (f.object.reporter.present? && f.template.link_to(edit_magret_user_url(f.object.reporter.id), edit_magret_user_path(f.object.reporter.id)))
      f.input :user, hint: (f.object.user.present? && f.template.link_to(edit_magret_user_url(f.object.user.id), edit_magret_user_path(f.object.user.id)))
    end

    f.inputs "Report Details" do
      f.input :description
      f.input :status, as: :select, collection: Report::STATUSES
    end

    f.actions
  end
end
