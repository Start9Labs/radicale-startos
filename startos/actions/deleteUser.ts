import { isValidUsername } from '../fileModels/users'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { atomicUserUpdateCommand, mount } from '../utils'
import { usernameInput } from './usernameInput'

export const deleteUser = sdk.Action.withInput(
  'delete-user',
  async () => ({
    name: i18n('Delete User'),
    description: i18n('Remove a Radicale user login'),
    warning: i18n(
      'Calendars, address books, and shares remain on disk. Deleting the final user stops Radicale until another user is added.',
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

    try {
      await sdk.SubContainer.withTemp(
        effects,
        { imageId: 'radicale' },
        mount,
        'delete-user',
        (subcontainer) =>
          subcontainer.execFail(
            atomicUserUpdateCommand('delete', input.username),
            { user: 'radicale' },
          ),
      )
    } catch (error) {
      console.error(error)
      throw new Error(i18n('Radicale could not delete the user'))
    }

    return {
      version: '1',
      title: i18n('User Deleted'),
      message: i18n('The user can no longer sign in.'),
      result: null,
    }
  },
)
