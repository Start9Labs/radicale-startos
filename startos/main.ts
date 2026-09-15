import { configFile } from './fileModels/config'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { configPath, mount, port, usersPath } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Radicale'))
  await configFile.read().const(effects)

  const radicale = sdk.SubContainer.of(
    effects,
    { imageId: 'radicale' },
    mount,
    'radicale',
  )

  return sdk.Daemons.of(effects)
    .addOneshot('prepare-data', {
      subcontainer: radicale,
      exec: {
        command: [
          'sh',
          '-c',
          'install -d -m 0700 -o 1000 -g 1000 /var/lib/radicale /var/lib/radicale/collections && chown 1000:1000 "$1" "$2" && chmod 0600 "$1" "$2"',
          'sh',
          configPath,
          usersPath,
        ],
        user: 'root',
      },
      requires: [],
    })
    .addDaemon('radicale', {
      subcontainer: radicale,
      exec: {
        command: sdk.useEntrypoint(['--config', configPath]),
        user: 'radicale',
      },
      ready: {
        display: i18n('Web Interface'),
        gracePeriod: 30_000,
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, port, {
            successMessage: i18n('Radicale is ready'),
            errorMessage: i18n('Radicale is unavailable'),
          }),
      },
      requires: ['prepare-data'],
    })
})
