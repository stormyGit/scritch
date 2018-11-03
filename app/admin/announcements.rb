ActiveAdmin.register Announcement do
  permit_params :body

  index do
    selectable_column
    id_column
    column :body do |record|
      record.body.truncate(100)
    end
    actions
  end

  filter :body

  form do |f|
    f.inputs do
      f.input :body
    end
    f.actions
  end

end
