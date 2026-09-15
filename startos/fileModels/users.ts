import { FileHelper } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

export const usernamePattern =
  '^[A-Za-z0-9_-][A-Za-z0-9._-]*(?:@[A-Za-z0-9._-]+)?$'

const usernameRegex = new RegExp(usernamePattern)

export const isValidUsername = (username: string): boolean =>
  username.length <= 128 && usernameRegex.test(username)

export type UsersFileState = 'empty' | 'usable' | 'unusable' | 'malformed'

export const inspectUsersFile = (value: string | null): UsersFileState => {
  if (value === null) return 'empty'

  const usernames = new Set<string>()
  let hasUsableUser = false

  for (const line of value.split(/\r\n|\n|\r/)) {
    if (!line.trimStart() || line.trimStart().startsWith('#')) continue

    const separator = line.indexOf(':')
    if (separator <= 0 || separator === line.length - 1) {
      return 'malformed'
    }

    const username = line.slice(0, separator)
    if (usernames.has(username)) return 'malformed'
    usernames.add(username)
    hasUsableUser ||= isValidUsername(username)
  }

  if (usernames.size === 0) return 'empty'
  return hasUsableUser ? 'usable' : 'unusable'
}

export const usersFile = FileHelper.string({
  base: sdk.volumes.main,
  subpath: 'users',
})
