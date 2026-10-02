import { FileHelper } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

export const radicaleConfig = `[server]
hosts = 0.0.0.0:5232, [::]:5232
validate_user_value = strict

[auth]
type = htpasswd
htpasswd_filename = /var/lib/radicale/users
htpasswd_encryption = autodetect
htpasswd_cache = false
delay = 1

[rights]
type = owner_only

[storage]
type = multifilesystem
filesystem_folder = /var/lib/radicale/collections
folder_umask = 0077

[sharing]
type = files
collection_by_map = true
permit_create_map = true
permit_properties_overlay = true
default_permissions_create_map = r

[web]
type = internal
prefer_browser_login = true

[headers]
Content-Security-Policy = default-src 'self'; object-src 'none'
`

export const configFile = FileHelper.string({
  base: sdk.volumes.main,
  subpath: 'config',
})
