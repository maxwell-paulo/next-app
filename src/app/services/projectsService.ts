import { env } from "~/env";
import { type GetProjects } from "../common/types/projectTypes";



export async function listProjects(): Promise<GetProjects[]> {
    try {
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/project`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store',
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
