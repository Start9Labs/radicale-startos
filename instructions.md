# Radicale

## Documentation

- [Radicale documentation](https://github.com/Kozea/Radicale/blob/master/DOCUMENTATION.md) — server behavior, DAV clients, collections, authentication, and troubleshooting
- [Collection sharing](https://github.com/Kozea/Radicale/blob/master/SHARING.md) — sharing concepts, permissions, and recipient acceptance

## Getting set up

1. Open the critical **Create the first Radicale user** task.
2. Enter the username you want to use. Save the generated password when the action completes; it is shown once.
3. Start Radicale.
4. Open **Web Interface** and sign in with the generated credentials.
5. Create a calendar or address book. Connect your apps using the **DAV** interface URL and the same credentials.

## Adding users and sharing collections

1. Run **Add or Update User** for every person who needs an account. Share each generated password securely with its user.
2. The collection owner signs in to **Web Interface**, selects a calendar or address book, and creates a share for the recipient's exact username.
3. Choose read-only or read/write permission, then enable and show the share.
4. The recipient signs in, opens incoming shares, enables the share, and chooses to show it. DAV discovery then includes the shared collection for that user.

## Managing passwords and users

These actions work whether Radicale is running or stopped.

- Run **Add or Update User** with an existing username to generate a replacement password. The previous password stops working immediately.
- Run **Delete User** to remove a login. Its collections and shares remain stored, and adding the same username later restores access.
- Deleting the final user stops Radicale and raises the first-user task. Add a user before starting the service again.
- If the **Repair Radicale user credentials** task appears, run it. This replaces every login with one new account while preserving calendars, address books, and shares.

## Connecting DAV clients

The Web Interface manages calendars and address books but not their contents; view and edit events and contacts in a DAV client.

Use the **DAV** interface URL as the server URL. Radicale also serves standard `/.well-known/caldav` and `/.well-known/carddav` discovery paths. Enter the Radicale username and generated password when your client asks for credentials.

For client-specific setup, see the [supported clients section](https://radicale.org/v3.html#supported-clients) of the upstream documentation.
