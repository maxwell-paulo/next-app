import { env } from "~/env";
import { type Content } from "../common/types/contentTypes";
import { type DynamicField } from "../common/types/dynamicFieldsTypes";
import { type Message } from "../common/types/commonTypes";

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

    return await res.json() as Message;
}

export async function createContent(name: string, text: string, projectId: number): Promise<Message> {
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

    return await res.json() as Message;
}