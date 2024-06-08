
import {NextRequest, NextResponse} from "next/server";
import {z} from "zod";
import prisma from "@/prisma/client";

const schema = z.object({
    title: z.string().min(1, "title is required").max(255),
    description: z.string().min(1, "description is required"),
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    console.log(body);
    const validation = schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json( validation.error.format(), {status: 400});
    }
    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description,
        }
    });
    return NextResponse.json(newIssue, {status: 201});
}
