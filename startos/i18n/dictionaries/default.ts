export const DEFAULT_LANG = 'en_US'

const dict = {
  'Starting Radicale': 0,
  'Web Interface': 1,
  'Radicale is ready': 2,
  'Radicale is unavailable': 3,
  'Manage calendars, address books, and shares': 4,
  DAV: 5,
  'Connect CalDAV and CardDAV clients': 6,
  Username: 7,
  'The Radicale account name used by DAV clients': 8,
  'Start with a letter, number, underscore, or hyphen. The rest may also contain dots and one optional @.': 9,
  'Add or Update User': 10,
  'Create a Radicale user or replace a user password': 11,
  'The generated password is shown once. Updating a user immediately replaces the current password.': 12,
  Users: 13,
  'Radicale could not save the user': 14,
  'Radicale Login Credentials': 15,
  'Save these credentials before closing this window.': 16,
  Password: 17,
  'Delete User': 18,
  'Remove a Radicale user login': 19,
  'Calendars, address books, and shares remain on disk. Deleting the final user stops Radicale until another user is added.': 20,
  'Radicale could not delete the user': 21,
  'User Deleted': 22,
  'The user can no longer sign in.': 23,
  'Create the first Radicale user': 24,
  'The Radicale username is invalid': 25,
  'Reset User Credentials': 26,
  'Replace a malformed Radicale credential file': 27,
  'This removes every existing login. Calendars, address books, and shares remain on disk.': 28,
  'The credential file does not require a reset': 29,
  'The credential file is malformed and was not changed': 30,
  'Repair Radicale user credentials': 31,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
