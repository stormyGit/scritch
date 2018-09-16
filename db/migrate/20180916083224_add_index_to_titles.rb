class AddIndexToTitles < ActiveRecord::Migration[5.2]
  def change
    execute 'CREATE INDEX "index_media_on_title" ON "media" USING gin(to_tsvector(\'english\', "title"))'
  end
end
