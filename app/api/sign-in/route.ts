import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  try {
    const isEmailPresent = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (isEmailPresent) {
      const checkPassword = isEmailPresent.password === password;
      if (checkPassword) {
        return NextResponse.json(isEmailPresent);
      } else {
        return NextResponse.json({ error: "Invalid Password" });
      }
    }

    return NextResponse.json({ error: "Invalid Email or email not found" });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
