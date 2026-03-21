/** @type {import('next').NextConfig} */
const nextConfig = {
  // Stable in Next.js 14.2+ (was experimental.serverComponentsExternalPackages)
  serverExternalPackages: ['pdf-parse', 'mammoth'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        canvas: false,
        crypto: false,
        stream: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
