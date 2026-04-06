import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,   // セキュリティ: X-Powered-By ヘッダーを無効化
  reactStrictMode: true,    // 開発時の追加チェックを有効化
};

export default nextConfig;
