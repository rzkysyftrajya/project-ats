/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/webp"], // Tambahkan baris ini untuk memaksa WebP
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vkqsggoolrqieioqwtou.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/rentcar-images/**",
      },
      {
        protocol: "https",
        hostname: "vkqsggoolrqieioqwtou.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/gallery-images/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
