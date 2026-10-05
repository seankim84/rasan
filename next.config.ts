import type { NextConfig } from "next";

const scriptSources = process.env.NODE_ENV === "development" ? "'self' 'unsafe-inline' 'unsafe-eval'" : "'self' 'unsafe-inline'";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  experimental: {
    useTypeScriptCli: false,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    const securityHeaders = [
      {
        key: "Content-Security-Policy",
        value:
          `default-src 'self'; base-uri 'self'; connect-src 'self'; font-src 'self' data:; form-action 'self'; frame-ancestors 'none'; img-src 'self' data: blob:; object-src 'none'; script-src ${scriptSources}; style-src 'self' 'unsafe-inline'`,
      },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
    ];

    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
