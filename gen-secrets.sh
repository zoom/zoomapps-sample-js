#!/usr/bin/env sh

##
# Generate random values to use as development secrets
##

set -eu

# generate a key 32 bits in length
dword() {
  openssl rand -hex 32
}

# generate a key 64 bits in length
qword() {
  openssl rand -hex 64
}

# array of variables we want to replace
vars[0]='_SESSION_SECRET'
vars[1]='_MONGOOSE_KEY'
vars[2]='_MONGOOSE_SIGN'
vars[3]='_MONGO_PASSWORD'

# create string of environment variables
env_vars=''
allow_list=''

# shellcheck disable=SC2039
for i in ${vars[*]}; do
  case "$i" in
  '_MONGOOSE_SIGN')
    key=$(qword)
    ;;
  '_MONGO_PASSWORD')
    key=$(openssl rand -base64 16)
    ;;
  *)
    key=$(dword)
    ;;
  esac

  env_vars="${env_vars} ${i}=${key}"
  allow_list="${allow_list},\$${i}"
done

# remove proceeding space or comma
env_vars=$(echo "${env_vars}" | cut -c 2-)
allow_list=$(echo "${allow_list}" | cut -c 2-)

# shellcheck disable=SC2086
new_env=$(env $env_vars envsubst "${allow_list}" <.env)

# prevent .env changes from being tracked by git
git update-index --assume-unchanged .env

# send replaced env vars to the .env file
echo "${new_env}" >.env
echo "$(basename "$0") - Generated secrets for .env"

exit
