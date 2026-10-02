FROM ghcr.io/kozea/radicale:3.8.0@sha256:0d60d544710bda0fa83bfdea685db731b6cbf74e12d7f22b4997e9cff3a50468

USER root
COPY patches/0001-honor-proxied-host-for-move-authority.patch /tmp/radicale-move.patch
RUN site_packages="$(/app/bin/python -c 'import site; print(site.getsitepackages()[0])')" \
    && cd "$site_packages" \
    && git apply --check /tmp/radicale-move.patch \
    && git apply /tmp/radicale-move.patch \
    && rm /tmp/radicale-move.patch
USER radicale
