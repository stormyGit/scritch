class TechReport < ApplicationRecord
  belongs_to :user, optional: true

    KINDS = [
      :general,
      :suggestion,
      :technical,
      :other
    ]
end
