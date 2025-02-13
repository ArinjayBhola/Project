import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { category } = await req.json();

  try {
    const blogs = await prisma.blog.findMany({
      where: { category: category as string },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
