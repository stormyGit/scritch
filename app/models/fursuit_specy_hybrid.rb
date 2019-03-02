class FursuitSpecyHybrid < ApplicationRecord
  self.primary_key = :uuid

  belongs_to :fursuit_specy
  belongs_to :hybrid
end
