// app/api/reset-password/route.ts
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { resetToken, newPassword } = await req.json();

  const tokenRecord = await prisma.passwordReset.findUnique({
    where: { token: resetToken },
    include: { user: true },
  });

  if (!tokenRecord || tokenRecord.used || tokenRecord.expiresAt < new Date()) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
  }

  const hashedPassword = await hash(newPassword, 10);

  await prisma.user.update({
    where: { id: tokenRecord.userId },
    data: { password: hashedPassword },
  });

  await prisma.passwordReset.update({
    where: { token: resetToken },
    data: { used: true },
  });

  return NextResponse.json({ success: true });
}
