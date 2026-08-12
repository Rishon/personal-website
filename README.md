# Personal Website

Next.js · TypeScript · Tailwind · Bun · Docker

## Setup

```sh
git clone https://github.com/Rishon/personal-website
cd personal-website
bun install
```

## Environment

Create `.env`:

```.env
# Server
PORT=3000
NEXT_PUBLIC_SITE_URL=

# Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# Discord presence
NEXT_PUBLIC_DISCORD_ID=

# Spotify
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=
NEXT_PUBLIC_SPOTIFY_OAUTH=
SPOTIFY_CLIENT_SECRET=

# SMTP
MAIL_HOST=
MAIL_PORT=465
MAIL_SECURE=true
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_TO=

# Analytics
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_CLARITY_ID=
```

## Scripts

```sh
bun run dev      # development
bun run build    # production build
bun run start    # serve build
bun run lint     # eslint
```

## Spotify

Register `http://127.0.0.1:3000/auth/spotify-callback`, visit `/auth/spotify-navigate`, then set
`NEXT_PUBLIC_SPOTIFY_OAUTH=false`.
