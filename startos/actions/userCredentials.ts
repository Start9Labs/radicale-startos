import { utils } from '@start9labs/start-sdk'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { atomicUserUpdateCommand, mount, prepareDataCommand } from '../utils'

type PackageEffects = Parameters<typeof sdk.SubContainer.withTemp>[0]

export const writeUserCredential = async (
  effects: PackageEffects,
  username: string,
  recreate: boolean,
): Promise<string> => {
  const password = utils.getDefaultString({
    charset: 'a-z,A-Z,0-9',
    len: 32,
  })

  let saved = false
  try {
    await sdk.SubContainer.withTemp(
      effects,
      { imageId: 'radicale' },
      mount,
      'write-user-credential',
      async (subcontainer) => {
        await subcontainer.execFail(prepareDataCommand(), { user: 'root' })
        await subcontainer.execFail(
          atomicUserUpdateCommand('set', username, recreate),
          { input: `${password}\n`, user: 'radicale' },
        )
        saved = true
      },
    )
  } catch (error) {
    console.error(error)
    if (!saved) throw new Error(i18n('Radicale could not save the user'))
  }

  return password
}

export const credentialResult = (username: string, password: string) => ({
  version: '1' as const,
  title: i18n('Radicale Login Credentials'),
  message: i18n('Save these credentials before closing this window.'),
  result: {
    type: 'group' as const,
    value: [
      {
        type: 'single' as const,
        name: i18n('Username'),
        description: null,
        value: username,
        masked: false,
        copyable: true,
        qr: false,
      },
      {
        type: 'single' as const,
        name: i18n('Password'),
        description: null,
        value: password,
        masked: true,
        copyable: true,
        qr: false,
      },
    ],
  },
})
