import type { NextAuthOptions } from "next-auth";
import type { Account, User as AuthUser } from "next-auth";
import type { JWT } from "next-auth/jwt";

// Обычные импорты
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import prisma from "@/utils/db";
import { nanoid } from "nanoid";

// 🚀 ЭКСПОРТ КОНФИГУРАЦИИ
export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: Record<string, string> | undefined) {
                if (!credentials) return null;

                try {
                    const user = await prisma.user.findFirst({
                        where: {
                            email: credentials.email,
                        },
                    });
                    if (user) {
                        const isPasswordCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password!
                        );
                        if (isPasswordCorrect) {
                            return {
                                id: user.id,
                                email: user.email,
                                role: user.role,
                            };
                        }
                    }
                } catch (err: any) {
                    // Обработка ошибки
                }
                return null;
            },
        }),
        // ... GithubProvider и GoogleProvider
    ],
    callbacks: {
        async signIn({ user, account }: { user: AuthUser; account: Account }) {
            if (account?.provider === "credentials") {
                return true;
            }

            if (account?.provider === "github" || account?.provider === "google") {
                try {
                    const existingUser = await prisma.user.findFirst({
                        where: {
                            email: user.email!,
                        },
                    });

                    if (!existingUser) {
                        await prisma.user.create({
                            data: {
                                id: nanoid(),
                                email: user.email!,
                                role: "user",
                                password: null,
                            },
                        });
                    }
                    return true;
                } catch (error) {
                    console.error("Error in signIn callback:", error);
                    return false;
                }
            }

            return true;
        },
        async jwt({ token, user }: { token: JWT; user?: AuthUser }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
                token.iat = Math.floor(Date.now() / 1000);
            }

            const now = Math.floor(Date.now() / 1000);
            const tokenAge = now - (token.iat as number);
            const maxAge = 15 * 60;

            if (tokenAge > maxAge) {
                return {};
            }

            return token;
        },
        async session({ session, token }: { session: any; token: JWT }) {
            if (token) {
                session.user.role = token.role as string;
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    session: {
        strategy: "jwt",
        maxAge: 15 * 60,
        updateAge: 5 * 60,
    },
    jwt: {
        maxAge: 15 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};