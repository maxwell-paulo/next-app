import { NextResponse, type NextRequest } from 'next/server';
import { type CreateContentBody } from '~/app/common/types/contentTypes';
import { db } from '~/server/db';
import { contents, } from '~/server/db/schema';

export async function POST(req: NextRequest) {
    try {
        const { name, text, projectId }: CreateContentBody = await req.json() as unknown as CreateContentBody;

        await db.insert(contents).values({ name, text, projectId });

        return NextResponse.json({ message: "Content created successfully!" }, { status: 201 });
    } catch (error) {
        console.error('Error creating content:', error);
        return NextResponse.json({ error: 'Failed to create content' }, { status: 500 });
    }
}