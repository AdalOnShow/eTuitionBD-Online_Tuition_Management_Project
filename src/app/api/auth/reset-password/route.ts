import bcrypt from "bcrypt";
import crypto from "crypto";
import { NextResponse, type NextRequest } from "next/server";

import prisma from "@/lib/prisma";
import { resetPasswordSchema } from "@/server/validations/auth.schema";

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function POST(request: NextRequest) {
  let body: unknown = null;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = resetPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const tokenHash = hashToken(parsed.data.token);
  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  try {
    const resetRecord = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      select: { id: true, userId: true, expiresAt: true },
    });

    if (!resetRecord || resetRecord.expiresAt < new Date()) {
      return NextResponse.json(
        { message: "Invalid or expired reset token." },
        { status: 400 },
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: resetRecord.userId },
        data: { password: passwordHash },
      });

      await tx.passwordResetToken.delete({
        where: { id: resetRecord.id },
      });
    });

    return NextResponse.json({ message: "Password updated successfully." });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
