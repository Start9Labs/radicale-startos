import {
  inspectUsersFile,
  isValidUsername,
  usersFile,
} from '../fileModels/users'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { credentialResult, writeUserCredential } from './userCredentials'
import { usernameInput } from './usernameInput'

export const resetUserCredentials = sdk.Action.withInput(
  'reset-user-credentials',
  async ({ effects }) => ({
    name: i18n('Reset User Credentials'),
    description: i18n('Replace a malformed Radicale credential file'),
    warning: i18n(
      'This removes every existing login. Calendars, address books, and shares remain on disk.',
    ),
    allowedStatuses: 'any',
    group: i18n('Users'),
    visibility:
      inspectUsersFile(await usersFile.read().const(effects)) === 'malformed'
        ? 'enabled'
        : 'hidden',
  }),
  usernameInput,
  async () => ({}),
  async ({ effects, input }) => {
    if (!isValidUsername(input.username)) {
      throw new Error(i18n('The Radicale username is invalid'))
    }
    if (inspectUsersFile(await usersFile.read().once()) !== 'malformed') {
      throw new Error(i18n('The credential file does not require a reset'))
    }

    const password = await writeUserCredential(effects, input.username, true)
    return credentialResult(input.username, password)
  },
)
