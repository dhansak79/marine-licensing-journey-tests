FROM node:22.13.1-alpine

ENV TZ="Europe/London"

# Accept environment as build argument
ARG ENVIRONMENT=dev

USER root

# Install basic utilities and conditionally install Playwright dependencies
RUN apk add --no-cache \
    openjdk17-jre-headless \
    curl \
    aws-cli \
    bash \
    && if [ "$ENVIRONMENT" != "dev" ]; then \
        apk add --no-cache \
            chromium \
            nss \
            freetype \
            freetype-dev \
            harfbuzz \
            ca-certificates \
            ttf-freefont; \
    fi \
    && rm -rf /var/cache/apk/*

WORKDIR /app

COPY package*.json ./
# Install all dependencies including devDependencies for test container
RUN npm ci

COPY . .

# Conditionally install Playwright browsers only if not dev environment
RUN if [ "$ENVIRONMENT" != "dev" ]; then \
        echo "Installing Playwright browsers for environment: $ENVIRONMENT" && \
        npx playwright install chromium; \
    else \
        echo "Skipping Playwright browser installation for dev environment"; \
    fi

# Set environment variables for Playwright (only matters when browsers are installed)
ENV PLAYWRIGHT_BROWSERS_PATH=/root/.cache/ms-playwright

ENTRYPOINT [ "./entrypoint.sh" ]
