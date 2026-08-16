# Dockerfile for the Lentago Labs landing site
#
# This is a SIMPLE Dockerfile — no multi-stage build needed because
# CI/CD builds the Astro site before Docker runs. We just copy the
# pre-built static files into nginx.
#
# The Astro build happens in the GitHub Action (Node environment).
# Docker's only job: package the output into a serving container.

FROM nginx:latest

# Copy the nginx config (port 8080, /health endpoint, clean URLs)
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Shared security-header set, `include`d from nginx.conf's server scope and
# re-`include`d in every location block that declares its own add_header (see
# nginx.conf and nginx-security-headers.conf). Kept out of conf.d/ — it is not
# a standalone server, so nginx must not auto-load it at http level.
COPY nginx-security-headers.conf /etc/nginx/nginx-security-headers.conf

# Copy pre-built static site from Astro
COPY dist/ /usr/share/nginx/html/

EXPOSE 8080
