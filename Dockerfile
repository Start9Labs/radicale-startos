FROM ghcr.io/kozea/radicale:3.9.1@sha256:e5e53d3f77566a8b4ca3e307d950e75c9b82b38d11e953c0394a342e3aa25c90

USER root
COPY patches/0001-honor-proxied-host-for-move-authority.patch /tmp/radicale-move.patch
RUN site_packages="$(/app/bin/python -c 'import site; print(site.getsitepackages()[0])')" \
    && cd "$site_packages" \
    && git apply --check /tmp/radicale-move.patch \
    && git apply /tmp/radicale-move.patch \
    && rm /tmp/radicale-move.patch
USER radicale
