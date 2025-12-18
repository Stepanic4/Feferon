import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        if (req.nextUrl.pathname.startsWith("/admin")) {
            // Добавляем .toLowerCase(), чтобы регистр не ломал вход
            const role = req.nextauth.token?.role as string;
            if (role?.toLowerCase() !== "admin") {
                return NextResponse.redirect(new URL("/", req.url));
            }
        }
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                if (req.nextUrl.pathname.startsWith("/admin")) {
                    const role = token?.role as string;
                    return !!token && role?.toLowerCase() === "admin";
                }
                return true;
            },
        },
    }
);

export const config = {
    matcher: ["/admin/:path*"]
};