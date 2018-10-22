class MurrsuitSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)

  GraphQL::Errors.configure(MurrsuitSchema) do
    rescue_from ActiveRecord::RecordNotFound do |exception|
      GraphQL::ExecutionError.new(exception.message.split('[').first)
    end

    rescue_from ActiveRecord::RecordInvalid do |exception|
      GraphQL::ExecutionError.new(exception.record.errors.full_messages.join("\n"))
    end

    rescue_from ActiveRecord::RecordNotUnique do |exception|
      GraphQL::ExecutionError.new(exception.record.errors.full_messages.join("\n"))
    end

    rescue_from ActiveRecord::StatementInvalid do |exception|
      [GraphQL::ExecutionError.new(/ERROR:*(.*)/.match(exception.message)[0].remove("ERROR:  ").capitalize)]
    end

    rescue_from ActiveModel::RangeError do |exception|
      [GraphQL::ExecutionError.new(exception.message)]
    end

    rescue_from ::Pundit::NotAuthorizedError do |exception|
      GraphQL::ExecutionError.new("Not authorized");
    end
  end
end
