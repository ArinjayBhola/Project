import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  try {
    const blogs = await prisma.blog.findMany({
      where: {
        likes: {
          some: { userId: userId as string },
        },
      },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
