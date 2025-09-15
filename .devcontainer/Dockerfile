# Minimal Bun devcontainer image
FROM oven/bun:1

# Install git (image is Debian/Ubuntu based) and clean up
RUN apt-get update \
	&& apt-get install -y --no-install-recommends git \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /workspace
