import { env } from "~/env";

interface GetContents {
    id: number;
    title: string;
}

export async function listContents(projectId?: number): Promise<GetContents[]> {
    try {
        const query = projectId ? `?projectId=${projectId}` : '';
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/contents${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error('Failed to fetch contents');
        }

        return await res.json() as GetContents[];
    } catch (error) {
        console.error('Error fetching contents:', error);
        throw error;
    }
}
