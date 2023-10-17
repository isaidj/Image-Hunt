/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "res.cloudinary.com",
      "images.unsplash.com",
      "pbs.twimg.com",
    ],
  },

  env: {
    KEY_UNPLASH: process.env.KEY_UNPLASH,
  },
};

module.exports = nextConfig;
