import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  try {
    const author = await prisma.blog.findUnique({
      where: { id: id as string },
      include: { author: true },
    });

    return NextResponse.json(author);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
