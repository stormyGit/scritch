class GraphqlController < ApplicationController
  def execute
    variables = ensure_hash(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    context = {
      current_session: current_session,
      current_user: current_user,
      current_user_references: current_user_references,
      cookies: cookies
    }
    result = MurrsuitSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
    render json: result
  rescue => e
    raise e unless Rails.env.development?
    handle_error_in_development e
  end

  private

  def current_session
    @current_session ||= Session.find_by(uuid: cookies[:token])
  end

  def current_user
    @current_user ||= current_session.try(:user)
  end

  def current_user_references
    {
      ip: Digest::SHA1.hexdigest(request.remote_ip.to_s.split.last.to_s),
    }.tap do |base|
      if @current_user.present?
        base[:user_id] = @current_user.id
      end
    end
  end

  def authorization_token
    request.headers["Authorization"]&.split(" ").try(:[], 1)
  end

  # Handle form data, JSON body, or a blank value
  def ensure_hash(ambiguous_param)
    case ambiguous_param
    when String
      if ambiguous_param.present?
        ensure_hash(JSON.parse(ambiguous_param))
      else
        {}
      end
    when Hash, ActionController::Parameters
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end

  def handle_error_in_development(e)
    logger.error e.message
    logger.error e.backtrace.join("\n")

    render json: { error: { message: e.message, backtrace: e.backtrace }, data: {} }, status: 500
  end
end
