class Hybrid < ApplicationRecord
  self.primary_key = :uuid
  belongs_to :fursuit

  has_many :fursuit_specy_hybrids, dependent: :destroy
  has_many :fursuit_species, through: :fursuit_specy_hybrids
end
