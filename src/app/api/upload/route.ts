import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "image/svg+xml",
        ];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Invalid file type. Only images are allowed." },
                { status: 400 }
            );
        }

        // Generate unique filename
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 8);
        const ext = file.name.split(".").pop() || "jpg";
        const filename = `${timestamp}-${randomStr}.${ext}`;

        // Ensure uploads directory exists
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadsDir, { recursive: true });

        // Write file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(uploadsDir, filename);
        await writeFile(filePath, buffer);

        return NextResponse.json({ url: `/uploads/${filename}` }, { status: 201 });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Failed to upload file" },
            { status: 500 }
        );
    }
}
