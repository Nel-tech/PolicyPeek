
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";



export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const body = await req.json();
  const { name, email } = body;
  
  // Add logging to debug
  console.log("Session email:", session.user.email);
  console.log("Request body:", { name, email });
  
  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  
  if (!email?.trim()) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }
  
  try {
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    
    if (!currentUser) {
      console.log("Current user not found with email:", session.user.email);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    console.log("Current user found:", currentUser.id);
    
    if (email.trim() !== session.user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: email.trim() },
      });
      
      if (existingUser) {
        return NextResponse.json({ error: "Email already in use" }, { status: 409 });
      }
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        name: name.trim(),
        email: email.trim(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
      },
    });
    
    console.log("User updated successfully:", updatedUser);
    return NextResponse.json(updatedUser);
    
  } catch (error) {
    console.error("User update error:", error);
    return NextResponse.json({ error: "User update failed" }, { status: 500 });
  }
}
