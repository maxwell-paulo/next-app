import { eq } from 'drizzle-orm';
import { NextResponse, type NextRequest } from 'next/server';
import { type Id } from '~/app/common/types/commonTypes';
import { type CreateDynamicFieldPayload } from '~/app/common/types/dynamicFieldsTypes';
import { db } from '~/server/db';
import { dynamicFields } from '~/server/db/schema';

export async function POST(req: NextRequest) {
    try {

        const { key, value, fieldType, contentId }: CreateDynamicFieldPayload = await req.json() as CreateDynamicFieldPayload;

        await db.insert(dynamicFields)
            .values({
                contentId,
                key,
                value,
                fieldType,
            });


        return NextResponse.json({ message: "Field created successfully!" }, { status: 201 });
    } catch (error) {
        console.error('Error creating field:', error);
        return NextResponse.json({ error: 'Failed to create field' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {

        const { id } = await req.json() as Id;

        if (!id || isNaN(Number(id))) {
            return NextResponse.json({ error: 'Invalid Field ID' }, { status: 400 });
        }

        await db.delete(dynamicFields).where(eq(dynamicFields.id, Number(id)));

        return NextResponse.json({ message: "Field deleted successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Failed to delete field:", error);
        return NextResponse.json({ error: 'Failed to delete field' }, { status: 500 });
    }
}
