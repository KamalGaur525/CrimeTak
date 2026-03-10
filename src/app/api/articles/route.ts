import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/* GET ARTICLES */

export async function GET() {
  try {

    const articles = await prisma.article.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(articles);

  } catch (error) {

    console.error("Fetch articles error:", error);

    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}


/* CREATE ARTICLE */

export async function POST(request: NextRequest) {
  try {

    const body = await request.json();

    const {
      title,
      slug,
      content,
      image,
      author,
      category,
    } = body;

    /* VALIDATION */

    if (!title || !slug || !content || !image || !author || !category) {

      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );

    }

    /* CHECK SLUG */

    const existing = await prisma.article.findUnique({
      where: { slug },
    });

    if (existing) {

      return NextResponse.json(
        { error: "Article with this slug already exists" },
        { status: 409 }
      );

    }

    /* CHECK CATEGORY */

    const categoryExists = await prisma.category.findUnique({
      where: {
        id: Number(category),
      },
    });

    if (!categoryExists) {

      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );

    }

    /* CREATE ARTICLE */

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        image,
        author,

        category: {
          connect: {
            id: Number(category),
          },
        },
      },

      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(article, { status: 201 });

  } catch (error) {

    console.error("Create article error:", error);

    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Article ID required" },
        { status: 400 }
      );
    }

    await prisma.article.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Article deleted" });

  } catch (error) {

    console.error("Delete article error:", error);

    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    );
  }
}