import { usernamePattern } from '../fileModels/users'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const usernameInput = sdk.InputSpec.of({
  username: sdk.Value.text({
    name: i18n('Username'),
    description: i18n('The Radicale account name used by DAV clients'),
    required: true,
    default: null,
    minLength: 1,
    maxLength: 128,
    patterns: [
      {
        regex: usernamePattern,
        description: i18n(
          'Start with a letter, number, underscore, or hyphen. The rest may also contain dots and one optional @.',
        ),
      },
    ],
    masked: false,
  }),
})
