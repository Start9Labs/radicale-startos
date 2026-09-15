# Updating the upstream version

Radicale is built as a thin derivative of the upstream-maintained GHCR image. The image tag and multi-architecture index digest are pinned in `Dockerfile`, and `upstream-project` pins the source revision used to maintain the patch in `patches/`.

Current upstream release: `3.8.0` (`v3.8.0` tag)

Current image index:

```text
ghcr.io/kozea/radicale:3.8.0@sha256:0d60d544710bda0fa83bfdea685db731b6cbf74e12d7f22b4997e9cff3a50468
```

## Determining the upstream version

1. Read the release notes and changelog instead of relying on the tag alone:

   ```sh
   gh release view --repo Kozea/Radicale --json tagName,url,publishedAt,body
   ```

2. Confirm the fixed release tag exists on GHCR and resolve its index digest:

   ```sh
   VERSION=3.8.0
   TOKEN_JSON=$(curl -sS --fail 'https://ghcr.io/token?scope=repository:kozea/radicale:pull&service=ghcr.io') || exit 1
   TOKEN=$(printf '%s\n' "$TOKEN_JSON" | jq -er '.token | select(type == "string" and length > 0)') || exit 1
   HEADERS=$(curl -sS --fail -D - -o /dev/null \
     -H "Authorization: Bearer $TOKEN" \
     -H 'Accept: application/vnd.oci.image.index.v1+json' \
     "https://ghcr.io/v2/kozea/radicale/manifests/$VERSION") || exit 1
   DIGEST=$(printf '%s\n' "$HEADERS" | awk 'tolower($1) == "docker-content-digest:" { sub(/\r$/, "", $2); print $2; found=1 } END { exit !found }') || exit 1
   printf '%s\n' "$DIGEST"
   ```

3. Fetch the index and verify that runnable `linux/amd64` and `linux/arm64` children are present. Ignore `unknown/unknown` attestation descriptors.

   ```sh
   INDEX=$(curl -sS --fail \
     -H "Authorization: Bearer $TOKEN" \
     -H 'Accept: application/vnd.oci.image.index.v1+json' \
     "https://ghcr.io/v2/kozea/radicale/manifests/$DIGEST") || exit 1
   printf '%s\n' "$INDEX" | jq -e '
     [.manifests[] | select(.platform.os == "linux") | {architecture: .platform.architecture, variant: .platform.variant, digest}] as $images
     | if (($images | any(.architecture == "amd64")) and ($images | any(.architecture == "arm64")))
       then $images
       else error("missing required linux/amd64 or linux/arm64 image")
       end
   '
   ```

## Applying the bump

1. Update the release tag and index digest in `Dockerfile`, then move `upstream-project` to the matching `vX.Y.Z` tag.
2. Check whether upstream now validates absolute DAV `MOVE` destinations from `Host` plus `X-Forwarded-Proto`. Drop `patches/0001-honor-proxied-host-for-move-authority.patch` if the fix is included; otherwise refresh it against the pinned source and confirm `git apply --check` succeeds during the image build.
3. Review upstream changes to authentication, username validation, configuration keys, sharing record format, web routes, storage, and the image's user, entrypoint, and persistent paths.
4. Update `startos/versions/current.ts` in place: change its version and release notes. Create a separate version file only when this package introduces a real migration.
5. Run `npm ci`, `npm run check`, `npm run build`, and `make`.
6. Upgrade a populated installation and run the upstream storage check while stopped:

   ```sh
   /app/bin/python /app/bin/radicale --config /var/lib/radicale/config --verify-storage
   ```

7. Verify web login, CalDAV and CardDAV discovery, collection creation, user-to-user read-only and read/write sharing, recipient acceptance, restart persistence, and backup/restore. Exercise real sharing records rather than relying on `--verify-sharing`, which rejects valid map records whose optional properties are unset.
8. Recheck absolute DAV `MOVE` requests through each StartOS address type because Radicale validates the destination authority against reverse-proxy headers.
