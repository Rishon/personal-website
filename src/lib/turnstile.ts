const isProduction = process.env.NODE_ENV === "production";

const DEV_SITE_KEY = "1x00000000000000000000AA";
const DEV_SECRET_KEY = "1x0000000000000000000000000000000AA";

export const TURNSTILE_SITE_KEY = isProduction
    ? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""
    : DEV_SITE_KEY;

export const TURNSTILE_SECRET_KEY = isProduction
    ? process.env.TURNSTILE_SECRET_KEY || ""
    : DEV_SECRET_KEY;
