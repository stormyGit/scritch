Install system packages (example: Ubuntu)
---

```
sudo apt install nodejs postgres ruby ruby-dev libcurl4-nss-dev libpq-dev libz-dev ffmpeg
```

put 
1. .env into root
2. application.yml into app/config/

get the 2 files above from stormy


postgres setup
---

https://www.a2hosting.com/kb/developer-corner/postgresql/managing-postgresql-databases-and-users-from-the-command-line

```
su - postgres
createuser --interactive --pwprompt
```

gem setup
---

```
gem install bundler
bundle install
yarn # (not working with npm i)
```


db setup
---

```
bundle exec rails db:create
bundle exec rails db:migrate
```

init
---

console: 
```
bundle exec rails c
```
inside the console:
```
App.create!()
Moderator.create!(name: "toto", email: "toto@toto.com", password: "12345678", capabilities: ["moderators"], telegram_username: "Test", telegram_id: "123456789")
```

populate the database
---
```
bundle exec rake species:fetch
bundle exec rake species_rake:fetch_icons
bundle exec rake fields:categories
bundle exec rake fields:sub_event
bundle exec rake fields:fursuits
bundle exec rake events:fetch
bundle exec rake events:editions
bundle exec rake makers:fetch  # only let a few run
bundle exec rake fursuits:fetch  # only let a few run
```

run server
---

```
bundle exec rails s (-p 3001) # ruby
./bin/webpack-dev-server  #for js
```

server runs on http://localhost:3000 

after running
---

login with telegram creates a user on dev enviroment


git push staging
---
```
git remote add staging dokku@scritch-staging.com:scritch-staging
git push staging dev
```
