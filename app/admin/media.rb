ActiveAdmin.register Medium do
  action_item :accept, only: [:show, :edit] do
    link_to('Accept and encode', accept_admin_medium_path(resource), method: :put)
  end

  member_action :accept, method: :put do
    resource.push_video_encoding_job!
    redirect_to resource_path, notice: "Medium accepted"
  end
end
