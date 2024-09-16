interface PostProject {
    message: string;
}

export async function createProject(name: string): Promise<PostProject> {
    const res = await fetch('/api/project', {
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