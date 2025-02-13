import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  try {
    const res = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
