import { i18n } from './i18n'
import { sdk } from './sdk'
import { port } from './utils'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const host = sdk.MultiHost.of(effects, 'main')
  const origin = await host.bindPort(port, {
    protocol: 'http',
    preferredExternalPort: port,
  })

  return [
    await origin.export([
      sdk.createInterface(effects, {
        id: 'web',
        name: i18n('Web Interface'),
        description: i18n('Manage calendars, address books, and shares'),
        type: 'ui',
        masked: false,
        schemeOverride: null,
        username: null,
        path: '/.web/',
        query: {},
      }),
      sdk.createInterface(effects, {
        id: 'dav',
        name: i18n('DAV'),
        description: i18n('Connect CalDAV and CardDAV clients'),
        type: 'api',
        masked: false,
        schemeOverride: null,
        username: null,
        path: '',
        query: {},
      }),
    ]),
  ]
})
