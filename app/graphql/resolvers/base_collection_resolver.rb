require 'search_object'
require 'search_object/plugin/graphql'

module Resolvers
  class BaseCollectionResolver
    include SearchObject.module(:graphql)

    # Use policy scope and expose helpers for belongs_to
    def self.model model
      # Return with a warning if the table doesn't exist
      # :nocov:
      unless ActiveRecord::Base.connection.table_exists? model.table_name
        Rails.logger.warn "Relation \"#{model.table_name}\" doesn't exist and thus its fields cannot be exposed with GraphQL, run your migrations and restart the server to fix this issue."
        return
      end
      # :nocov:

      scope do
        raise Pundit::NotAuthorizedError unless Pundit::PolicyFinder.new(model).policy.new(context[:current_user], model.new).index?

        Pundit::PolicyFinder.new(model).scope.new(context[:current_user], model.all).resolve
      end

      model.reflect_on_all_associations(:belongs_to).each do |association|
        # simple ID filtering
        option(association.foreign_key, type: ID, null: true) do |scope, value|
          scope.where(association.foreign_key => value)
        end

        # simple IDs filtering
        option(association.foreign_key.pluralize, type: [ID], null: true) do |scope, value|
          if value.blank?
            scope
          else
            scope.where(association.foreign_key => value)
          end
        end

        option("#{association.foreign_key.pluralize}_strict", type: [ID], null: true) do |scope, value|
          scope.where(association.foreign_key => value)
        end

        # simple IDs exclude
        option("not_#{association.foreign_key.pluralize}", type: [ID], null: true) do |scope, value|
          scope.where.not(association.foreign_key => value)
        end
      end

      model.reflect_on_all_associations(:has_one).each do |association|
        # Simple ID filtering
        option("#{association.name}_id", type: ID, null: true) do |scope, value|
          scope.left_outer_joins(association.name)
            .where(association.klass.table_name => { association.klass.primary_key => value })
        end

        # Simple IDs filtering
        option("#{association.name}_ids_strict", type: [ID], null: true) do |scope, value|
          scope.left_outer_joins(association.name)
            .where(association.klass.table_name => { association.klass.primary_key => value })
        end

        option("#{association.name}_ids", type: [ID], null: true) do |scope, value|
          if value.blank?
            scope
          else
            scope.left_outer_joins(association.name)
              .where(association.klass.table_name => { association.klass.primary_key => value })
          end
        end

        # Simple IDs exclude
        option("not_#{association.name}_ids", type: [ID], null: true) do |scope, value|
          scope.left_outer_joins(association.name)
            .where.not(association.klass.table_name => { association.klass.primary_key => value })
        end
      end

      # Expose timestamp fields
      model.columns.select do |column|
        column.sql_type_metadata.type == :datetime || column.sql_type_metadata.type == :date
      end.each do |column|
        normalized_column_name = column.name.sub(/_(at|date)$/, '')

        option("#{normalized_column_name}_after", type: String, null: true) do |scope, value|
          scope.where("#{model.table_name}.#{column.name}::date > ?::date", value)
        end

        option("#{normalized_column_name}_after_including", type: String, null: true) do |scope, value|
          scope.where("#{model.table_name}.#{column.name}::date >= ?::date", value)
        end

        option("#{normalized_column_name}_before", type: String, null: true) do |scope, value|
          scope.where("#{model.table_name}.#{column.name}::date < ?::date", value)
        end

        option("#{normalized_column_name}_before_including", type: String, null: true) do |scope, value|
          scope.where("#{model.table_name}.#{column.name}::date <= ?::date", value)
        end
      end

      # Expose simple matching for text fields
      model.columns.select do |column|
        puts column.name
        column.sql_type_metadata.type == :string
      end.each do |column|
        # multiple match
        option(column.name, type: [String], null: true) do |scope, value|
          scope.where(column.name => value)
        end

        # multiple exclusion
        option("not_#{column.name}", type: [String], null: true) do |scope, value|
          scope.where.not(column.name => value)
        end
      end
    end
  end
end
