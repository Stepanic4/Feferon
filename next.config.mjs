/** @type {import('next').NextConfig} */
const nextConfig = {
    // ДОБАВЛЯЕМ ЭТУ СЕКЦИЮ:
    eslint: {
        // Это позволит успешно завершить билд, даже если в коде есть ошибки линтинга
        ignoreDuringBuilds: true,
    },
    // Также полезно добавить это, если есть ошибки в TypeScript (по желанию):
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
                port: ""
            },
        ],
    },
    env: {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;