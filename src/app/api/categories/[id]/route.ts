import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {

  try {

    const id = Number(params.id);
    const body = await req.json();

    const category = await prisma.category.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug
      }
    });

    return NextResponse.json(category);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );

  }

}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {

  try {

    const id = Number(params.id);

    await prisma.category.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );

  }

}