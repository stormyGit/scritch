class Specy < ApplicationRecord
  self.primary_key = :uuid

  has_many :fursuit_species, dependent: :destroy
  has_many :fursuits, through: :fursuit_species
end
