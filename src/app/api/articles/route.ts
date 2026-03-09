import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const articles = await prisma.article.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(articles);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch articles" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, slug, content, image, author, category } = body;

        if (!title || !slug || !content || !image || !author || !category) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Check for duplicate slug
        const existing = await prisma.article.findUnique({
            where: { slug },
        });

        if (existing) {
            return NextResponse.json(
                { error: "An article with this slug already exists" },
                { status: 409 }
            );
        }

        const article = await prisma.article.create({
            data: {
                title,
                slug,
                content,
                image,
                author,
                category,
            },
        });

        return NextResponse.json(article, { status: 201 });
    } catch (error) {
        console.error("Error creating article:", error);
        return NextResponse.json(
            { error: "Failed to create article" },
            { status: 500 }
        );
    }
}
