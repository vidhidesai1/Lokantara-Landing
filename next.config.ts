import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://lokantaraspace.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
