import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "browngroup.vercel.app",
          },
        ],
        destination: "https://browngroup.it.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;