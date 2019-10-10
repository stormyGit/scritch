#!/bin/bash

rsync -av -e ssh --no-o --delete  root@scritch.es:/var/lib/dokku/data/storage/minio/ "/media/stormy/Elements/scritch_storage_backups/now"
