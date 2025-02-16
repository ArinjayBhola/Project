import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  try {
    await prisma.comment.deleteMany({
      where: {
        blogId: id,
      },
    });

    await prisma.blog.delete({
      where: {
        id: id as string,
      },
    });
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
