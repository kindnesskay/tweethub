const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatar.iran.liara.run",
      },
    ],
  },
};

module.exports = nextConfig;
