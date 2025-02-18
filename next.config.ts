import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // 프로덕션에서 콘솔 제거
    // removeConsole: false, // 콘솔 로그 완전히 제거
  },
};

export default nextConfig;
