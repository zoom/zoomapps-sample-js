#!/usr/bin/env sh

#
# Prepare the development servers for backend and frontend
#

set -eu

##
# Start server and app development servers
##
serve() {
  npx concurrently \
  -kn 'dev-app,dev-server' \
  -c 'inverse.cyan,inverse.yellow' \
  'npm run build -- --watch' \
  'nodemon app.js'
}

# narrow the debug logs to our app - fallback to a wildcard
DEBUG="$(npx dotenv -p APP_NAME)*"
export DEBUG

# start mongoDB in a container
docker compose up -d

# start dev servers
serve

# stop mongodb up when we're done
docker compose down -v --remove-orphans

exit
