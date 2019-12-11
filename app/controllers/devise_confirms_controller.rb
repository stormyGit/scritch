class DeviseConfirmsController < Devise::ConfirmationsController

  protected

    def after_confirmation_path_for(resource_name, resource)
      "/"
    end
end
