#!/usr/bin/env bash

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
templates=('_SESSION_SECRET' '_MONGOOSE_KEY' '_MONGOOSE_SIGN' '_MONGO_PASSWORD')

# create string of environment variables
env_vars=''
for i in "${templates[@]}"; do
  case "$i" in

  '_MONGOOSE_SIGN')
    key=$(qword)
    ;;
  '_MONGO_PASSWORD')
    key=$(openssl rand -base64 32)
    ;;
  *)
    key=$(dword)
    ;;
  esac

  env_vars="${env_vars} ${i}=${key}"
done

# remove proceeding space
env_vars=${env_vars:1}

# create comma separated list of allowed replacements
allow_list=$(printf ',$%s' "${templates[@]}")
allow_list=${allow_list:1}

# glob the env_vars but not the allow_list
# shellcheck disable=SC2086
new_env=$(env $env_vars envsubst "${allow_list}" <.env)

# send replaced env vars to the .env file
echo "${new_env}" >.env
echo "$(basename "$0") - Generated secrets for .env"

exit
