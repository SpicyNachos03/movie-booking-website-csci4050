const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'resizing.flixster.com' },
      { protocol: 'https', hostname: 'i.ebayimg.com' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'commons.wikimedia.org' }, // Wikimedia Commons
    ],
  },
};

export default nextConfig;
