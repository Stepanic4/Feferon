import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import prisma from "@/utils/db";
import { nanoid } from "nanoid";

export const authOptions: any = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                try {
                    // Приводим email к нижнему регистру для поиска
                    const lowerEmail = credentials.email.toLowerCase();
                    const user = await prisma.user.findFirst({
                        where: { email: lowerEmail },
                    });
                    if (user) {
                        const isPasswordCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password!
                        );
                        if (isPasswordCorrect) {
                            // Возвращаем объект пользователя с ролью
                            return { id: user.id, email: user.email, role: user.role };
                        }
                    }
                } catch (err: any) {
                    throw new Error(err);
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }: any) {
            if (account?.provider === "credentials") return true;

            if (account?.provider === "github" || account?.provider === "google") {
                try {
                    const lowerEmail = (user.email as string).toLowerCase();
                    const existingUser = await prisma.user.findFirst({
                        where: { email: lowerEmail },
                    });

                    if (!existingUser) {
                        await prisma.user.create({
                            data: {
                                id: nanoid(),
                                email: lowerEmail,
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
        async jwt({ token, user }: any) {
            // При первом входе переносим роль из БД в токен
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            // УДАЛЕНО: условие 'tokenAge > 15 * 60', которое выкидывало тебя из системы
            return token;
        },
        async session({ session, token }: any) {
            // Переносим роль из токена в сессию браузера
            if (token && session.user) {
                (session.user as any).role = token.role;
                (session.user as any).id = token.id;
            }
            return session;
        },
    },
    pages: { signIn: '/login', error: '/login' },
    // Увеличено время жизни сессии с 15 минут до 30 дней
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};