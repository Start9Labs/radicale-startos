import { resetUserCredentials } from '../actions/resetUserCredentials'
import { setUserPassword } from '../actions/setUserPassword'
import { inspectUsersFile, usersFile } from '../fileModels/users'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const setUserTask = `radicale:${setUserPassword.id}`
const resetUsersTask = `radicale:${resetUserCredentials.id}`

export const watchUsers = sdk.setupOnInit(async (effects) => {
  const usersState = inspectUsersFile(await usersFile.read().const(effects))

  if (usersState === 'malformed') {
    await sdk.action.clearTask(effects, setUserTask)
    await sdk.action.createOwnTask(effects, resetUserCredentials, 'critical', {
      reason: i18n('Repair Radicale user credentials'),
    })
    return
  }

  if (usersState === 'empty' || usersState === 'unusable') {
    await sdk.action.clearTask(effects, resetUsersTask)
    await sdk.action.createOwnTask(effects, setUserPassword, 'critical', {
      reason: i18n('Create the first Radicale user'),
    })
    return
  }

  await sdk.action.clearTask(effects, setUserTask, resetUsersTask)
})
