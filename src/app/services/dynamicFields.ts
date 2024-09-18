import { env } from "~/env";

interface PostProject {
    message: string;
}

interface CreateDynamicFieldPayload {
    key: string;
    value: string;
    fieldType: 'text' | 'checkbox';
    contentId: number;
}

interface DeleteDynamicField {
    id: number;
}

export async function createDynamicField(payload: CreateDynamicFieldPayload): Promise<PostProject> {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/dynamicField`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error('Failed to create field');
    }

    return await res.json() as PostProject;
}

export async function deleteDynamicField(id: number): Promise<DeleteDynamicField> {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/dynamicField`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });

    if (!res.ok) {
        console.log(res);
        throw new Error('Failed to delete content');
    }

    return await res.json() as DeleteDynamicField;
}
