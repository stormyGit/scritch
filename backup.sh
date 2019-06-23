#!/bin/bash

export OLDER_STORAGE="/mnt/g/scritch_storage_backups/now"
rsync -av -e ssh --no-o --delete  root@scritch.es:/var/lib/dokku/data/storage/minio/ "/mnt/g/scritch_storage_backups/now"
#find /mnt/g/scritch_storage_backups/* -type d -ctime +7 -exec rm -rf {} +

#rsync -av -e ssh --no-o --delete root@scritch.es:/root/scritch_db_backups/scritch_backup20190622_041318.dump "/mnt/g/scritch_storage_backups/"
