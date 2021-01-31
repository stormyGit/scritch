module Types
  class BaseObject < GraphQL::Schema::Object
    field_class Types::BaseField
    connection_type_class Connections::BaseConnection

    def self.has_timestamp_fields
      field :created_at, String, null: false

      def created_at
        object.created_at&.iso8601
      end

      field :updated_at, String, null: false

      def updated_at
        object.updated_at&.iso8601
      end
    end

    def self.resource_field(model, options = {})
      name = options[:name] || model.model_name.element

      field name.pluralize, { resolver: "Resolvers::#{name.camelize}CollectionResolver".constantize }.merge(options)
      field name, { resolver: "Resolvers::#{name.camelize}Resolver".constantize }.merge(options)
    end

    def self.has_many_field(name, type, options = {})
      policy = options.delete(:policy)

      field(name, type, options)
      define_method name do
        object.send(name).select do |record|
          (policy || Pundit::PolicyFinder.new(record).policy).new(context[:current_resource], record).show?
        end
      end

      field("#{name.to_s.singularize}_ids", { type: [ID], null: false })
    end

    def self.belongs_to_field(name, type, options = {})
      batch_with = options.delete(:batch_with)
      polymorphic = options.delete(:polymorphic)

      field(name, type, options)
      field("#{name}_id", { type: ID, null: options[:null] })

      if polymorphic
        field("#{name}_type", { type: String, null: options[:null] })
      end

      if batch_with.present?
        define_method(name) do
          batch_with.find(object.send("#{name}_id"))
        end
      end
    end

    def self.has_one_field(name, type, options = {})
      field(name, type, options)
    end

    def self.has_policy_fields(policy, options)
      options[:can].each do |policy_method|
        field_name = "can_#{policy_method.to_s.parameterize}"

        field field_name, type: Boolean, null: false
        define_method field_name do
          policy.new(context[:current_resource], object).send policy_method
        end
      end
    end

    def self.has_capability_fields(capabilities, options)
      options[:can].each do |capability_method|
        field_name = "is_capable_of_#{capability_method.to_s.parameterize}"

        field field_name, type: Boolean, null: false
        define_method field_name do
          capabilities.new(context[:current_resource]).send capability_method
        end
      end
    end
  end
end
