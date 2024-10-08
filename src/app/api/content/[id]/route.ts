import { eq } from 'drizzle-orm';
import { NextResponse, type NextRequest } from 'next/server';
import { type PatchContentRequestPayload } from '~/app/common/types/contentTypes';
import { db } from '~/server/db';
import { contents, dynamicFields as dynamicFieldSchema } from '~/server/db/schema';




export async function GET(request: NextRequest) {
    try {
        const { pathname } = new URL(request.url);
        const id = pathname.split('/').pop();

        if (!id || isNaN(Number(id))) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const content = await db.query.contents.findFirst({
            where: (model, { eq }) => eq(model.id, Number(id))
        });

        if (!content) throw new Error("Content not found");

        const dynamicFields = await db.query.dynamicFields.findMany({
            where: (fields, { eq }) => eq(fields.contentId, Number(id))
        });

        const response = {
            content,
            dynamicFields
        };

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error('Error retrieving contents:', error);
        return NextResponse.json({ error: 'Failed to retrieve contents' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {

        const { content, dynamicFields }: PatchContentRequestPayload = await request.json() as unknown as PatchContentRequestPayload

        if (!content?.id) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        if (content) {
            await db.update(contents).set({
                name: content.name,
                text: content.text,
            }).where(eq(contents.id, Number(content.id)))
        }

        if (dynamicFields && Array.isArray(dynamicFields)) {
            for (const field of dynamicFields) {
                await db.update(dynamicFieldSchema).set({
                    key: field.key,
                    value: field.value,
                }).where(eq(dynamicFieldSchema.id, Number(field.id)))
            }
        }

        return NextResponse.json({ message: 'Update successful' }, { status: 200 });
    } catch (error) {
        console.error('Error updating contents:', error);
        return NextResponse.json({ error: 'Failed to update contents' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { pathname } = new URL(req.url);
        const idStr = pathname.split('/').pop();

        if (!idStr || isNaN(Number(idStr))) {
            return NextResponse.json({ error: 'Invalid Project ID' }, { status: 400 });
        }

        const id = Number(idStr);

        await db.delete(contents).where(eq(contents.id, id));

        return NextResponse.json({ message: "Content deleted successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Failed to delete content:", error);
        return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 });
    }
}
