# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

## This repo

- Keep `upstream-project` pinned to the release used by `Dockerfile`; refresh the patch in `patches/` against that revision.
- Radicale's `--verify-sharing` rejects valid map records with unset optional properties. Validate sharing through its API and DAV paths instead.
