interface GetProjects {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export async function listProjects(): Promise<GetProjects[]> {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
            throw new Error('API URL is not defined');
        }

        const res = await fetch(`${apiUrl}/api/projects`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error('Failed to fetch projects');
        }

        return await res.json() as GetProjects[];
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}
