import { NextResponse, type NextRequest } from 'next/server';
import { db } from '~/server/db';
import { projects } from '~/server/db/schema';

interface CreateProjectBody {
    name: string;
}

export async function POST(req: NextRequest) {
    if (req.method === 'POST') {
        try {
            const { name }: CreateProjectBody = await req.json() as unknown as CreateProjectBody;

            if (!name) {
                return NextResponse.json({ error: 'Project name is required' }, { status: 400 });
            }

            const newProject = await db.insert(projects).values({ name });

            return NextResponse.json(newProject, { status: 201 });
        } catch (error) {
            console.error('Error creating project:', error); // Para depuração
            return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    }
}
