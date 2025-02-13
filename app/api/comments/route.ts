import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { content, authorId, blogId } = await req.json();

  try {
    const comment = await prisma.comment.create({
      data: { content, authorId, blogId },
    });

    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
