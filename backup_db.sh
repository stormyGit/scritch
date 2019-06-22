#!/bin/bash

rsync -av -e ssh --no-o --delete root@scritch.es:/root/scritch_db_backups/* /mnt/g/scritch_db_backups/
