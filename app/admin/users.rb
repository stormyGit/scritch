ActiveAdmin.register User do
  permit_params :name, :slug, :bio, :website

  config.sort_order = 'created_at_desc'

  filter :id
  filter :telegram_id
  filter :name
  filter :slug
  filter :created_at

  index do
    selectable_column
    id_column

    column :telegram_id
    column :name
    column :slug
    column :created_at
    column :updated_at

    actions
  end

  form do |f|
    f.inputs "User Details" do
      f.input :telegram_id
      f.input :name
      f.input :slug
      f.input :bio
      f.input :website
    end
    f.actions
  end
end
