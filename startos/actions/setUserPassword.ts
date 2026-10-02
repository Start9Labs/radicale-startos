import {
  inspectUsersFile,
  isValidUsername,
  usersFile,
} from '../fileModels/users'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { credentialResult, writeUserCredential } from './userCredentials'
import { usernameInput } from './usernameInput'

export const setUserPassword = sdk.Action.withInput(
  'set-user-password',
  async () => ({
    name: i18n('Add or Update User'),
    description: i18n('Create a Radicale user or replace a user password'),
    warning: i18n(
      'The generated password is shown once. Updating a user immediately replaces the current password.',
    ),
    allowedStatuses: 'any',
    group: i18n('Users'),
    visibility: 'enabled',
  }),
  usernameInput,
  async () => ({}),
  async ({ effects, input }) => {
    if (!isValidUsername(input.username)) {
      throw new Error(i18n('The Radicale username is invalid'))
    }

    const usersState = inspectUsersFile(await usersFile.read().once())
    if (usersState === 'malformed') {
      throw new Error(
        i18n('The credential file is malformed and was not changed'),
      )
    }

    const password = await writeUserCredential(
      effects,
      input.username,
      usersState === 'empty',
    )
    return credentialResult(input.username, password)
  },
)
