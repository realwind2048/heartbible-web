import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // 프로덕션에서 콘솔 제거
    // removeConsole: false, // 콘솔 로그 완전히 제거
  },
  rewrites: async () => [
    {
      source: '/api/sermon/:path*',
      // destination: 'http://localhost:8080/api/sermon/:path*' // 로컬서버
      destination: 'https://heartbible.klutche.com/api/sermon/:path*' // 실서버
    },
    {
      source: '/api/ai-chat/:path*',
      // destination: 'http://localhost:8080/api/ai-chat/:path*' // 로컬서버
      destination: 'https://heartbible.klutche.com/api/ai-chat/:path*' // 실서버
    },
    {
      source: '/api/ai/:path*',
      // destination: 'http://localhost:8080/api/ai/:path*' // 로컬서버
      destination: 'https://heartbible.klutche.com/api/ai/:path*' // 실서버
    },
    {
      source: '/api/user/:path*',
      // destination: 'http://localhost:8080/api/user/:path*' // 로컬서버
      destination: 'https://heartbible.klutche.com/api/user/:path*' // 실서버
    }
  ],
};

export default nextConfig;
