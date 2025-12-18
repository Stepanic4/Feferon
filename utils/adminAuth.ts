import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export async function requireAdmin() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    // Добавляем проверку регистра здесь
    const role = (session as any)?.user?.role as string;
    if (role?.toLowerCase() !== "admin") {
        redirect("/");
    }

    return session;
}

export async function isAdmin(): Promise<boolean> {
    const session = await getServerSession(authOptions);
    const role = (session as any)?.user?.role as string;
    return role?.toLowerCase() === "admin";
}