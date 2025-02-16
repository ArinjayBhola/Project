import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid or missing ID" }, { status: 400 });
    }

    const blogs = await prisma.blog.findMany({
      where: {
        author: {
          id: id,
        },
      },
      include: { author: true },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "An error occurred while fetching blogs." }, { status: 500 });
  }
}
