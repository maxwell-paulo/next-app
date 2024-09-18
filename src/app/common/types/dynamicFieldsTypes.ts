export interface DynamicField {
    id: number;
    key: string;
    value: string;
    fieldType: "text" | "checkbox";
}

export interface CreateDynamicFieldFormProps {
    onSuccess: () => void;
    onError: () => void;
    onCancel: () => void;
}

export interface CreateDynamicFieldPayload {
    key: string;
    value: string;
    fieldType: 'text' | 'checkbox';
    contentId: number;
}

export interface DeleteDynamicField {
    id: number;
}