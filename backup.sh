#!/bin/bash

export OLDER_STORAGE="/mnt/g/scritch_storage_backups/`date +%Y-%m-%d -d yesterday`"
rsync -av -e ssh --no-o --delete --safe-links --link-dest=$OLDER_STORAGE root@scritch.es:/var/lib/dokku/data/storage/minio/ "/mnt/g/scritch_storage_backups/`date +%Y-%m-%d`"
find /mnt/g/scritch_storage_backups/* -type d -ctime +7 -exec rm -rf {} +
