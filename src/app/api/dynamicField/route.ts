import { NextResponse, type NextRequest } from 'next/server';
import { db } from '~/server/db';
import { dynamicFields } from '~/server/db/schema';

interface CreateDynamicFieldPayload {
    key: string;
    value: string;
    fieldType: 'text' | 'checkbox';
    contentId: number;
}

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