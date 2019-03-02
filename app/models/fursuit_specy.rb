class FursuitSpecy < ApplicationRecord
  self.primary_key = :uuid

  has_many :fursuits
  has_many :fursuit_species_hybrids, dependent: :destroy
  has_many :hybrids, through: :fursuit_specy_hybrids

  def self.as_options_for_react_select
    distinct.order(:name).pluck(:name)
  end

  def self.as_options_for_select
    distinct.order(:name).pluck(:name, :uuid)
  end
end
