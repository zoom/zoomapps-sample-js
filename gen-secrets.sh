#!/usr/bin/env bash

####
# Generate random values for use as development keys and secrets
# Environment Vars Generated: SESSION_SECRET, MONGOOSE_KEY, MONGOOSE_SIGNATURE, MONGODB_PASSWORD,
###

set -eu

# generate a key 32 bits in length
dword() {
  openssl rand -hex 32
}

# generate a key 64 bits in length
qword() {
  openssl rand -hex 64
}

templates=('_SESSION_SECRET' '_MONGOOSE_KEY' '_MONGOOSE_SIGN' '_MONGO_PASSWORD')

# get a list of environment variables
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

env_vars=${env_vars:1}

allow_list=$(printf ',$%s' "${templates[@]}")
allow_list=${allow_list:1}

# shellcheck disable=SC2086
new_env=$(env $env_vars envsubst "${allow_list}" <.env)

echo "$new_env" >.env

exit
