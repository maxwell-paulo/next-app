import { env } from "~/env";

interface Content {
    id: number;
}

export async function getContent(id?: number): Promise<Content[]> {
    try {
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/content/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error('Failed to fetch content');
        }

        return await res.json() as Content[];
    } catch (error) {
        console.error('Error fetching contents:', error);
        throw error;
    }
}
