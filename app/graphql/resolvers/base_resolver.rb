module Resolvers
  class BaseResolver < GraphQL::Schema::Resolver
    def self.model model
      argument :id, ID, required: true

      define_method("resolve") do |id:|
        model.find(id).tap do |record|
          unless Pundit::PolicyFinder.new(model).policy.new(context[:current_resource], record).show?
            raise Pundit::NotAuthorizedError
          end
        end
      end
    end
  end
end
