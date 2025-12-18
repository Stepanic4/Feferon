import prisma from "@/utils/db";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { registrationSchema } from "@/utils/schema";
import { sanitizeInput, commonValidations } from "@/utils/validation";
import { handleApiError, AppError } from "@/utils/errorHandler";

export const POST = async (request: Request) => {
    try {
        const clientIP = request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip") ||
            "unknown";

        if (!commonValidations.checkRateLimit(clientIP, 5, 15 * 60 * 1000)) {
            throw new AppError("Too many registration attempts. Please try again later.", 429);
        }

        const body = await sanitizeInput.validateJsonInput(request);
        const validationResult = registrationSchema.safeParse(body);

        if (!validationResult.success) {
            throw validationResult.error;
        }

        // Принудительно переводим email в нижний регистр здесь
        const { email, password } = validationResult.data;
        const lowerEmail = email.toLowerCase();

        const existingUser = await prisma.user.findFirst({
            where: { email: lowerEmail }
        });

        if (existingUser) {
            throw new AppError("Email is already in use", 400);
        }

        const hashedPassword = await bcrypt.hash(password, 14);

        const newUser = await prisma.user.create({
            data: {
                id: nanoid(),
                email: lowerEmail, // Сохраняем уже обработанный email
                password: hashedPassword,
                role: "user", // По умолчанию всегда user, админа меняем вручную в БД
            },
        });

        return new NextResponse(
            JSON.stringify({
                message: "User registered successfully",
                userId: newUser.id
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );

    } catch (error) {
        return handleApiError(error);
    }
};