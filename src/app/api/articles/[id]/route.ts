import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/* GET SINGLE ARTICLE */

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {

  try {

    const article = await prisma.article.findUnique({
      where: {
        id: params.id,
      },
      include: {
        category: true,
      },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(article);

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    );

  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {

    const body = await req.json();

    const updated = await prisma.article.update({
      where: {
        id: params.id,
      },
      data: {
        title: body.title,
        slug: body.slug,
        author: body.author,
        image: body.image,
        content: body.content,
        categoryId: Number(body.category), // ← IMPORTANT FIX
      },
    });

    return NextResponse.json(updated);

  } catch (error) {

    console.error("Update article error:", error);

    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 }
    );
  }
}