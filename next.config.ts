import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/farmacia-granda-web-rework',
  images: { unoptimized: true },
  allowedDevOrigins: ['192.168.1.128'],
};

export default nextConfig;
