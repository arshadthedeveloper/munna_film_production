import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // picsum.photos is used only for placeholder gallery/hero images.
    // Remove this once real Munna Flim Production photos are added to /public/images.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
