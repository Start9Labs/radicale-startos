import { sdk } from './sdk'

export const port = 5232
export const dataPath = '/var/lib/radicale'
export const configPath = `${dataPath}/config`
export const usersPath = `${dataPath}/users`
export const collectionsPath = `${dataPath}/collections`

export const mount = sdk.Mounts.of().mountVolume({
  volumeId: 'main',
  subpath: null,
  mountpoint: dataPath,
  readonly: false,
})

export const prepareDataCommand = () => [
  'install',
  '-d',
  '-m',
  '0700',
  '-o',
  '1000',
  '-g',
  '1000',
  dataPath,
  collectionsPath,
]

export const atomicUserUpdateCommand = (
  operation: 'set' | 'delete',
  username: string,
  recreate = false,
) => [
  'sh',
  '-c',
  `set -eu
users="$1"
username="$2"
operation="$3"
recreate="$4"
temporary="\${users}.tmp.$$"
trap 'rm -f "$temporary"' EXIT HUP INT TERM
umask 077
if [ "$operation" = set ]; then
  if [ "$recreate" = true ] || [ ! -e "$users" ]; then
    htpasswd -5 -i -c "$temporary" "$username"
  else
    cp "$users" "$temporary"
    htpasswd -5 -i "$temporary" "$username"
  fi
else
  cp "$users" "$temporary"
  htpasswd -D "$temporary" "$username"
fi
chmod 0600 "$temporary"
mv -f "$temporary" "$users"
trap - EXIT HUP INT TERM`,
  'sh',
  usersPath,
  username,
  operation,
  recreate ? 'true' : 'false',
]
