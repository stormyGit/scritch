class UsersController < ApplicationController
  def show
    user = User.find(params[:id])

    @meta[:type] = 'profile'
    @meta[:title] = user.name
    @meta["profile:first_name"] = user.name
    @meta["profile:username"] = user.slug

    render "application/index"
  end
end
