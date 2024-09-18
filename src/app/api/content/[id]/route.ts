import { NextResponse, type NextRequest } from 'next/server';
import { db } from '~/server/db';

export async function GET(request: NextRequest) {
    try {
        const { pathname } = new URL(request.url);
        const id = pathname.split('/').pop();

        console.log(id);


        if (!id || isNaN(Number(id))) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }


        const content = await db.query.contents.findFirst({
            where: (model, { eq }) => eq(model.id, Number(id))
        })

        if (!content) throw new Error("Content not found")

        const dynamicFields = await db.query.dynamicFields.findMany({
            where: (fields, { eq }) => eq(fields.contentId, Number(id))
        })


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