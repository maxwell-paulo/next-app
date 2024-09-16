import { NextResponse, type NextRequest } from 'next/server';
import { db } from '~/server/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get('projectId');

        let contents;
        if (projectId) {
            contents = await db.query.contents.findMany({
                where: (fields, { eq }) => eq(fields.projectId, Number(projectId))
            });
        } else {
            contents = await db.query.contents.findMany();
        }

        return NextResponse.json(contents, { status: 200 });
    } catch (error) {
        console.error('Error retrieving contents:', error);
        return NextResponse.json({ error: 'Failed to retrieve contents' }, { status: 500 });
    }
}
