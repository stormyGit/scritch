#!/bin/bash

rsync -av -e ssh --no-o --delete root@scritch.es:/root/scritch_db_backups/* /media/stormy/Elements/scritch_db_backups/now
