import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'radicale',
  title: 'Radicale',
  license: 'GPL-3.0-or-later',
  packageRepo: 'https://github.com/Start9Labs/radicale-startos',
  upstreamRepo: 'https://github.com/Kozea/Radicale',
  marketingUrl: 'https://radicale.org/',
  donationUrl: 'https://github.com/Kozea/Radicale/wiki/Donations',
  description: { short, long },
  volumes: ['main'],
  images: {
    radicale: {
      source: { dockerBuild: {} },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {},
})
