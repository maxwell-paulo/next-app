import { NextResponse } from 'next/server';
import { db } from '~/server/db';

export async function GET() {
    try {
        const projects = await db.query.projects.findMany();
        return NextResponse.json(projects, { status: 200 });
    } catch (error) {
        console.error('Error retrieving projects:', error);
        return NextResponse.json({ error: 'Failed to retrieve projects' }, { status: 500 });
    }
}
