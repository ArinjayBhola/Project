import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const blogs = await prisma.blog.findMany();

  return NextResponse.json({ blogs });
}
