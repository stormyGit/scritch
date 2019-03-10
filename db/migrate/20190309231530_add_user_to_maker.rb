class AddUserToMaker < ActiveRecord::Migration[5.2]
  def change
    add_reference :makers, :user, type: :uuid, index: true
  end
end
