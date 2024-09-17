import { env } from "~/env";

interface PostProject {
    message: string;
}
interface DeleteProjectResponse {
    message: string;
}

export async function createProject(name: string): Promise<PostProject> {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/project`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });

    if (!res.ok) {
        throw new Error('Failed to create project');
    }

    return await res.json() as PostProject;
}

export async function deleteProject(id: number) {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/project?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error('Failed to delete project');
    }

    return await res.json() as DeleteProjectResponse;
}

