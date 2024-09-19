import { env } from "~/env";
import { type Message } from "../common/types/commonTypes";



export async function createProject(name: string): Promise<Message> {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/project`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });

    if (!res.ok) {
        console.log(res)
        const errorData = await res.json();
        const errorMessage = errorData.status === 409 ? "Project name allready exist" : 'Failed to create project';
        throw new Error(errorMessage);
    }

    return await res.json() as Message;
}


export async function deleteProject(id: number) {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/project?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        console.log(res);

        throw new Error('Failed to delete project');
    }

    return await res.json() as Message;
}

