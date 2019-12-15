class DevisePassUpdatesController < Devise::PasswordsController

  protected

    def after_resetting_password_path_for
      root_path
    end
end
