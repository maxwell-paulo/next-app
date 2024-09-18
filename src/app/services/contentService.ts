import { env } from "~/env";

interface Content {
    id: number;
    name: string;
    text: string;
    projectId: number;
    createdAt: string;
    updatedAt: string | null;
}

interface DynamicField {
    id: number;
    key: string;
    value: string;
    fieldType: "text" | "checkbox";
}

interface DeleteContentResponse {
    message: string;
}

interface PostContent {
    message: string;
}

export async function getContent(id: number): Promise<{ content: Content; dynamicFields: DynamicField[] }> {
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

        return await res.json() as { content: Content; dynamicFields: DynamicField[] };
    } catch (error) {
        console.error('Error fetching content:', error);
        throw error;
    }
}

export async function updateContent(contentId: number, updatedContent: Partial<Content>, updatedDynamicFields?: DynamicField[]): Promise<void> {
    try {
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/content/${contentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: updatedContent,
                dynamicFields: updatedDynamicFields
            }),
        });

        if (!res.ok) {
            throw new Error('Failed to update content');
        }

    } catch (error) {
        console.error('Error updating content:', error);
        throw error;
    }
}

export async function deleteContent(id: number) {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/content/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        console.log(res);
        throw new Error('Failed to delete content');
    }

    return await res.json() as DeleteContentResponse;
}

export async function createContent(name: string, text: string, projectId: number): Promise<PostContent> {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/content`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, text, projectId }),
    });

    if (!res.ok) {
        throw new Error('Failed to create project');
    }

    return await res.json() as PostContent;
}