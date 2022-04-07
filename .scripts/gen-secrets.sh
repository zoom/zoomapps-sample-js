#!/usr/bin/env sh

##
# Generate random values to use as development secrets
##

set -eu

# generate a key based on input
genKey() {
  openssl rand "-$1" "$2"
}

# generate a base64 key
base64Key() {
  genKey 'base64' "$1"
}

# generate a hex key
hexKey() {
  genKey 'hex' "$1"
}

# environment vars file
file=".env"

# sample env file to copy
sample="$file.sample"

# build a string of env vars from $file
env_vars=''

# allowed vars to substitute
allow_list=''

# array of variables we want to replace
vars[0]='_SESSION_SECRET'
vars[1]='_MONGO_KEY'
vars[2]='_MONGO_SIGN'
vars[3]='_MONGO_PASS'

# copy the sample to .env if it doesn't exist
if [ ! -f "$file" ] && [ -f "$sample" ]; then
  cp "$sample" "$file"
fi

# shellcheck disable=SC2039
for i in ${vars[*]}; do
  case "$i" in
  '_MONGO_SIGN')
    key=$(base64Key 64 | tr -d '\n')
    ;;
  '_MONGO_PASS')
    key=$(base64Key 32 | tr -d '/')
    ;;
  '_SESSION_SECRET')
    key=$(hexKey 32)
    ;;
  *)
    key=$(base64Key 32)
    ;;
  esac

  env_vars="${env_vars} ${i}=${key}"
  allow_list="${allow_list},\$${i}"
done

# remove proceeding space or comma
env_vars=$(echo "${env_vars}" | cut -c 2-)
allow_list=$(echo "${allow_list}" | cut -c 2-)

# shellcheck disable=SC2086
new_env=$(env $env_vars envsubst "${allow_list}" <"$file")

# send replaced env vars to the .env file
echo "${new_env}" >"$file"
echo "$(basename "$0") - Generated secrets for $file"

exit
