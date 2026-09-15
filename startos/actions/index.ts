import { sdk } from '../sdk'
import { deleteUser } from './deleteUser'
import { resetUserCredentials } from './resetUserCredentials'
import { setUserPassword } from './setUserPassword'

export const actions = sdk.Actions.of()
  .addAction(setUserPassword)
  .addAction(resetUserCredentials)
  .addAction(deleteUser)
