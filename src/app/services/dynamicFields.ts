import { env } from "~/env";
import { type CreateDynamicFieldPayload } from "../common/types/dynamicFieldsTypes";
import { type Message } from "postcss";
import { type Id } from "../common/types/commonTypes";

export async function createDynamicField(payload: CreateDynamicFieldPayload): Promise<Message> {
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

    return await res.json() as Message;
}

export async function deleteDynamicField(id: number): Promise<Id> {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/dynamicField`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });

    if (!res.ok) {
        throw new Error('Failed to delete content');
    }

    return await res.json() as Id;
}
