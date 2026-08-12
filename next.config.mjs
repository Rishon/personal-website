import {execSync} from "node:child_process";

/** Short commit the sheet was printed from - stamped into the desk footer. */
function buildId() {
    if (process.env.NEXT_PUBLIC_BUILD_ID) return process.env.NEXT_PUBLIC_BUILD_ID;
    try {
        return execSync("git rev-parse --short HEAD").toString().trim();
    } catch {
        return "dev";
    }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: ["127.0.0.1", "localhost"],
    env: {
        NEXT_PUBLIC_BUILD_ID: buildId(),
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.scdn.co",
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "X-Robots-Tag",
                        value:
                            "index, follow, noimageindex, max-image-preview:none, max-snippet:-1, max-video-preview:-1",
                    },
                ],
            },
            {
                source: "/assets/:path*",
                headers: [
                    {
                        key: "X-Robots-Tag",
                        value: "noimageindex, max-image-preview:none",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
