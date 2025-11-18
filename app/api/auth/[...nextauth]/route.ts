// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth/next";

// 🔑 Импортируем конфигурацию из utils/auth.ts
import { authOptions } from "@/utils/auth";

const handler = NextAuth(authOptions);

// 🚀 Экспортируем ТОЛЬКО обработчики
export { handler as GET, handler as POST };