# Personal Website

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Rishon/personal-website
   cd personal-website
   ```

2. Install the dependencies:

   `npm install` / `yarn install` / `bun install`

### Environment Variables

### Frontend:

Create a `.env.development` or `.env.production` file based on your environment and fill out the keys and values:

```.env
# Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
```

### Backend:

Create a `.env` file and fill out the keys and values:

```.env
# Server
PORT=3000

# SMTP
MAIL_HOST=
MAIL_USERNAME=
MAIL_PORT=465
MAIL_SECURE=true
MAIL_PASSWORD=

# Turnstile
TURNSTILE_SECRET_KEY=
```

### Running in development

To start, run the following:

`npm run dev` / `yarn run dev` / `bun run dev`

### Building

To build, run the following:

`npm run build` / `yarn run build` / `bun run build`
