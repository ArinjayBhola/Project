import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const blogId = searchParams.get("blogId");

  try {
    const comments = await prisma.comment.findMany({
      where: {
        blogId: blogId as string,
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

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
