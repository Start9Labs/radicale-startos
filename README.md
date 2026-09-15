<p align="center">
  <img src="icon.svg" alt="Radicale Logo" width="21%">
</p>

# Radicale on StartOS

> Everything not listed in this document should behave the same as upstream Radicale.
> If a feature, setting, or behavior is not mentioned here, the upstream
> documentation is accurate and fully applicable — see the Documentation section of
> `instructions.md` for links.

Radicale is a lightweight CalDAV and CardDAV server for calendars and contacts. See the [upstream Radicale repository](https://github.com/Kozea/Radicale).

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

The package derives its x86_64 and aarch64 image from the official `ghcr.io/kozea/radicale` image. The Dockerfile applies one patch from `patches/` so absolute DAV `MOVE` destinations are validated against normalized StartOS HTTPS authorities. The pinned `upstream-project` submodule records the exact source revision the patch targets.

One `radicale` subcontainer runs the upstream Python application as the image's unprivileged `radicale` user (UID/GID 1000). A root oneshot repairs the persistent directory and credential-file permissions before the daemon starts. The daemon uses the image's configured entrypoint with the package-managed configuration path.

## Volume and Data Layout

The `main` volume is mounted at `/var/lib/radicale` and contains every durable file:

| Path                             | Contents                                                     |
| -------------------------------- | ------------------------------------------------------------ |
| `/var/lib/radicale/config`       | Package-managed Radicale configuration                       |
| `/var/lib/radicale/users`        | htpasswd user records                                        |
| `/var/lib/radicale/collections/` | Calendars, address books, sync metadata, and sharing records |

Collection storage uses Radicale's locking `multifilesystem` backend. Sharing uses its `files` backend beneath the collection tree.

## File Models

The package manages Radicale's configuration and user credential files.

- `config` is a package-managed INI file. Initialization restores the package's authentication, owner rights, filesystem storage, built-in web UI, map-sharing, and security-header settings if the file is changed or removed. Hand edits do not persist.
- `users` is inspected using Radicale's htpasswd record structure. Empty files raise the first-user task; malformed records or duplicate usernames raise the credential-repair task. User actions update the file atomically with Radicale's bundled `htpasswd` command, preserving compatible hash formats.

## Dependencies

None.

## Network Access and Interfaces

One HTTP binding on container port 5232 carries two interface descriptors:

- **Web Interface** (`/.web/`) opens Radicale's built-in collection and sharing manager.
- **DAV** (`/`) is the base URL for CalDAV and CardDAV clients and supports the well-known discovery paths.

StartOS terminates TLS. Radicale performs per-user authentication itself, so the package does not put StartOS proxy authentication in front of either interface.

## Installation and First-Run Flow

Initialization writes the fixed configuration and raises a critical task while the htpasswd file has no structurally valid account with a package-compatible username. The first-user task targets **Add or Update User**, which takes a username, generates a password with the StartOS SDK, atomically stores only its SHA-512 htpasswd record, and displays the password once. Radicale has no privileged administrator account; the first account is an ordinary user that owns its collections.

A malformed nonempty credential file raises a separate critical repair task. Its reset action explicitly replaces all login records with one new account while preserving collections and shares. Both critical tasks block the daemon until the credential database is usable.

## Actions

User actions modify `/var/lib/radicale/users` through a temporary container. They normally complete within seconds without restarting or interrupting Radicale.

### Add or Update User

Run when creating an account or rotating its credentials. Each run atomically writes the named htpasswd record and returns a newly generated password; repeating it rotates the password again and immediately invalidates the previous one. A malformed nonempty credential file is preserved and must be handled with **Reset User Credentials**.

### Reset User Credentials

Explicitly replaces every login record with one newly generated account and displays its password once. Calendars, address books, and shares remain unchanged.

### Delete User

Run when revoking an account. It atomically removes only the named htpasswd record; collections and sharing data remain, and recreating that username restores access. Repeating it after the login has been removed is safe and leaves the file unchanged. Deleting the final account raises the critical first-user task and stops the service until another account is added.

## Tasks

**Create the first Radicale user** is a critical own-task raised when the users file is absent, empty, or lacks a username usable by this package. Running **Add or Update User** satisfies it.

**Repair Radicale user credentials** is a critical own-task raised when an active record is malformed or a username is duplicated. Running **Reset User Credentials** replaces the login database and satisfies it. Both tasks stop Radicale until their credential condition is resolved.

## Health Checks

**Web Interface** checks whether Radicale is listening on port 5232. Failure means the daemon is still starting or has stopped listening; inspect service logs and verify the configuration and volume permissions.

## Backups and Restore

Backups include the complete `main` volume while the service is stopped. This preserves configuration, user hashes, collections, sharing maps, and sync metadata under Radicale's storage lock. Restore reinstates the same volume before initialization and leaves existing credentials unchanged.

## Limitations and Differences

The package changes account management, sharing defaults, and Web Interface behavior.

1. Individual events and contacts require a CalDAV/CardDAV client; the Web Interface manages collection metadata and shares.
2. DAV discovery omits an incoming share until the recipient enables and displays it.
3. Anonymous token sharing is disabled. Authenticated map shares default to read-only.
4. Account management is provided by StartOS actions rather than Radicale's Web Interface.

---

## Quick Reference for AI Consumers

This summary lists the package's operable surface.

```yaml
package_id: 'radicale'
image: 'ghcr.io/kozea/radicale'
architectures: ['x86_64', 'aarch64']
subcontainers: ['radicale']
volumes:
  main: '/var/lib/radicale — config, htpasswd users, collections, and shares'
file_models:
  - '/var/lib/radicale/config — package-managed INI configuration'
  - '/var/lib/radicale/users — monitored htpasswd credentials'
startos_managed_env_vars: []
dependencies: []
interfaces:
  web: { type: ui, port: 5232 }
  dav: { type: api, port: 5232 }
actions:
  - set-user-password
  - reset-user-credentials
  - delete-user
tasks:
  - { action: set-user-password, severity: critical }
  - { action: reset-user-credentials, severity: critical }
health_checks:
  - radicale
```
