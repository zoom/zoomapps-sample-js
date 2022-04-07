#!/usr/bin/env sh

##
# Generate random values to use as development secrets
##

set -eu

file=".env"
sample="$file.sample"

# copy the sample to .env if it doesn't exist
if [ ! -f "$file" ] && [ -f "$sample" ]; then
  cp "$sample" "$file"
fi

# generate a key 32 bits in length
dword() {
  openssl rand -base64 32
}

# array of variables we want to replace
vars[0]='_SESSION_SECRET'
vars[1]='_MONGO_KEY'
vars[2]='_MONGO_SIGN'
vars[3]='_MONGO_PASS'

# create string of environment variables
env_vars=''
allow_list=''

# shellcheck disable=SC2039
for i in ${vars[*]}; do
  case "$i" in
  '_MONGO_SIGN')
    key=$(openssl rand -base64 64 | tr -d '\n')
    ;;
  '_MONGO_PASS')
    key=$(dword | tr -d '/')
    ;;
  '_SESSION_SECRET')
    key=$(openssl rand -hex 32)
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
new_env=$(env $env_vars envsubst "${allow_list}" <$file)

# send replaced env vars to the .env file
echo "${new_env}" >$file
echo "$(basename "$0") - Generated secrets for $file"

exit
