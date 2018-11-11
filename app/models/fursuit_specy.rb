class FursuitSpecy < ApplicationRecord
  self.primary_key = :uuid

  has_many :fursuits

  def self.as_options_for_react_select
    distinct.order(:name).pluck(:name)
  end

  def self.as_options_for_select
    distinct.order(:name).pluck(:name, :uuid)
  end
end
