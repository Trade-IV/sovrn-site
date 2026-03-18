import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/app/:path*",
        destination: "https://agency-crm-seven.vercel.app/app/:path*",
      },
    ];
  },
};

export default nextConfig;
