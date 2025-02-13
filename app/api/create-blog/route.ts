import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, content, category, authorId } = await req.json();
  console.log(title, content, category, authorId);

  try {
    const newBlog = await prisma.blog.create({
      data: { title, content, category, authorId },
    });

    return NextResponse.json(newBlog);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
