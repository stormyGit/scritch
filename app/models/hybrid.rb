class Hybrid < ApplicationRecord
  self.primary_key = :uuid
  belongs_to :fursuit, dependent: :destroy

  has_many :fursuit_specy_hybrids
  has_many :fursuit_species, through: :fursuit_specy_hybrids
end
