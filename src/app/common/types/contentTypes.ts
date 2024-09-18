import { type DynamicField } from "./dynamicFieldsTypes";

export interface Content {
    id: number;
    name: string;
    text: string;
    projectId: number;
    createdAt: string;
    updatedAt: string | null;
}

export interface GetContents {
    id: number;
    name: string;
}

export interface PatchContentRequestPayload {
    content?: Content;
    dynamicFields?: DynamicField[];
}

export interface CreateContentBody {
    name: string;
    text: string;
    projectId: number;
}

export interface FullContent {
    content: Content;
    dynamicFields: DynamicField[];
}