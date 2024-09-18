import { NextResponse, type NextRequest } from 'next/server';
import { db } from '~/server/db';
import { projects } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

interface CreateProjectBody {
    name: string;
}

export async function POST(req: NextRequest) {
    try {
        const { name }: CreateProjectBody = await req.json() as unknown as CreateProjectBody;

        if (!name) {
            return NextResponse.json({ error: 'Project name is required' }, { status: 400 });
        }

        await db.insert(projects).values({ name });

        return NextResponse.json({ message: "Project created successfully!" }, { status: 201 });
    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const allProjects = await db.query.projects.findMany();
        return NextResponse.json(allProjects, { status: 200 });
    } catch (error) {
        console.error('Error retrieving projects:', error);
        return NextResponse.json({ error: 'Failed to retrieve projects' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const idStr = req.nextUrl.searchParams.get('id');

        if (!idStr) {
            return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
        }

        const id = Number(idStr);

        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid Project ID' }, { status: 400 });
        }

        await db.delete(projects).where(eq(projects.id, id));

        return NextResponse.json({ message: "Project deleted successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Failed to delete project:", error);
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}

