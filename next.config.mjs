/** @type {import('next').NextConfig} */
const nextConfig = {
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
