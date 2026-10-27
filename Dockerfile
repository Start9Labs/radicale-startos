FROM ghcr.io/kozea/radicale:3.9.0@sha256:f68a99907f44b09dc12d81c3a1cdf221e3c55f08ceccfa17dc012991be9fb397

USER root
COPY patches/0001-honor-proxied-host-for-move-authority.patch /tmp/radicale-move.patch
RUN site_packages="$(/app/bin/python -c 'import site; print(site.getsitepackages()[0])')" \
    && cd "$site_packages" \
    && git apply --check /tmp/radicale-move.patch \
    && git apply /tmp/radicale-move.patch \
    && rm /tmp/radicale-move.patch
USER radicale
