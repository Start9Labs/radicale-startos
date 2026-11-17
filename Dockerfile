FROM ghcr.io/kozea/radicale:3.9.2@sha256:c74545ef669a3166646ec13438a31b5d0bfff198d8ba7ecd214c0a5f40f03fb4

USER root
COPY patches/0001-honor-proxied-host-for-move-authority.patch /tmp/radicale-move.patch
RUN site_packages="$(/app/bin/python -c 'import site; print(site.getsitepackages()[0])')" \
    && cd "$site_packages" \
    && git apply --check /tmp/radicale-move.patch \
    && git apply /tmp/radicale-move.patch \
    && rm /tmp/radicale-move.patch
USER radicale
