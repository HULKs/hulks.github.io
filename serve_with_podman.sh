#!/bin/env sh
set -eu

podman run -ti --rm \
    --volume "$PWD:/srv/jekyll:Z" \
    --volume jekyll_bundle:/usr/local/bundle \
    --publish 4000:4000 \
    --publish 35729:35729 \
    docker.io/jekyll/jekyll:4.4.1 \
    sh -c 'bundle install && exec bundle exec jekyll serve --livereload --host 0.0.0.0'
