import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, blogId } = await req.json();

  try {
    const like = await prisma.like.create({
      data: { userId, blogId },
    });

    return NextResponse.json(like);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
