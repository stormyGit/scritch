#!/usr/bin/env bash

rvm 2.7.0 exec bundle exec rails s -p 3001 &
./bin/webpack-dev-server