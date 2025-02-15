import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const blogs = await prisma.blog.findMany();

  return NextResponse.json({ blogs });
}

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  try {
    const blog = await prisma.blog.findUnique({ where: { id: id as string } });
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
