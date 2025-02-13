import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name } = await req.json();

  try {
    const blogs = await prisma.blog.findMany({
      where: {
        author: {
          name: name as string,
        },
      },
      include: { author: true },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
