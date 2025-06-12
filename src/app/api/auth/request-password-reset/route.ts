
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req:NextRequest) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({where:{email}})
   if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

   const resetToken = uuidv4(); 
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); 

  await prisma.passwordReset.create({
   data:{
    token:resetToken,
    expiresAt,
    userId: user.id,
    used:false
   }
  })

  return NextResponse.json({resetToken})
}