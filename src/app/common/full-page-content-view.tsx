"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { deleteContent, getContent, updateContent } from "../services/contentService";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";

interface DynamicField {
    id: number;
    key: string;
    value: string;
    fieldType: "text" | "checkbox";
}

interface Content {
    content: {
        id: number;
        name: string;
        text: string;
        projectId: number;
        createdAt: string;
        updatedAt: string | null;
    };
    dynamicFields: DynamicField[];
}

export default function FullPageContentView() {
    const router = useRouter();
    const [content, setContent] = useState<Content | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const params = useParams();
    const id = params.id ? Number(params.id) : null;

    async function fetchContent(id: number) {
        try {
            const contentData = await getContent(id);
            setContent(contentData);
        } catch (error) {
            console.error("Failed to fetch content:", error);
        }
    }

    async function handleUpdate() {
        if (content) {
            try {
                setIsUpdating(true);
                const updatedContent = {
                    name: content.content.name,
                    text: content.content.text,
                    id: content.content.id
                };

                const updatedDynamicFields = content.dynamicFields.map(field => ({
                    ...field,
                    id: field.id,
                    value: field.fieldType === 'checkbox' ? (field.value === 'true') : field.value,
                }));

                await updateContent(content.content.id, updatedContent, updatedDynamicFields);
                toast.success("Project updated successfully!");
                fetchContent(id).catch(console.error);
            } catch (error) {
                console.error("Failed to update content:", error);
                toast.error("Failed to update project.");
            } finally {
                setIsUpdating(false);
            }
        }
    }

    async function handleDelete(e: React.FormEvent) {
        e.preventDefault();
        setIsDeleting(true);

        try {
            await deleteContent(id);
            toast.success("Content deleted successfully!");
            router.back()

        } catch (err) {
            console.error("Failed to delete content:", err);
            toast.error("Failed to delete content.");
        } finally {
            setIsDeleting(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchContent(id).catch(console.error);
        }
    }, [id]);

    function handleFieldChange(fieldId: number, newValue: string | boolean) {
        if (content) {
            setContent((prevContent) => {
                if (!prevContent) {
                    throw new Error('Previous content is null');
                }

                return {
                    ...prevContent,
                    dynamicFields: prevContent.dynamicFields.map(field =>
                        field.id === fieldId
                            ? { ...field, value: typeof newValue === 'boolean' ? (newValue ? 'true' : 'false') : newValue }
                            : field
                    )
                };
            });
        }
    }

    function handleContentChange(key: "name" | "text", newValue: string) {
        if (content) {
            const updatedContent = {
                ...content,
                content: {
                    ...content.content,
                    [key]: newValue
                },
                dynamicFields: content.dynamicFields || []
            };
            setContent(updatedContent);
        }
    }

    return (
        <div className="flex flex-col items-center p-6 space-y-4">
            {content && (
                <div className="max-w-4xl w-full">
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-lg font-semibold mb-1">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={content.content.name}
                            onChange={(e) => handleContentChange('name', e.target.value)}
                            className="border-2 border-gray-300 rounded-md p-2 text-black w-full"
                            placeholder="Content Name"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="text" className="block text-lg font-semibold mb-1">Informations</label>
                        <textarea
                            id="text"
                            value={content.content.text}
                            onChange={(e) => handleContentChange('text', e.target.value)}
                            className="border-2 border-gray-300 rounded-md p-2 text-black w-full"
                            placeholder="Content Text"
                        />
                    </div>
                    <div>
                        {content.dynamicFields.length > 0 && (
                            <>
                                <h2 className="text-xl font-bold mb-4">Extra Infos</h2>
                                <ul className="space-y-4">
                                    {content.dynamicFields.map(field => (
                                        <li key={field.id} className="flex items-center space-x-4">
                                            <strong className="w-32">{field.key}:</strong>
                                            {field.fieldType === 'text' ? (
                                                <textarea
                                                    id="text"
                                                    value={field.value}
                                                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                                    className="border-2 border-gray-300 rounded-md p-2 text-black"
                                                    placeholder={field.key}
                                                />
                                            ) : (
                                                <input
                                                    type="checkbox"
                                                    checked={field.value === 'true'}
                                                    onChange={(e) => handleFieldChange(field.id, e.target.checked)}
                                                    className="form-checkbox h-5 w-5 text-blue-600"
                                                />
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                    <div className="flex gap-4 mt-6 justify-center">
                        <Button
                            onClick={handleUpdate}
                            disabled={isDeleting || isUpdating}
                            type="button"
                            className="w-60 border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
                        >
                            {isUpdating ? "Updating..." : "Update"}
                        </Button>
                        <Button
                            onClick={handleDelete}
                            disabled={isDeleting || isUpdating}
                            className="w-60 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
                        >
                            {isDeleting ? 'Deleting...' : 'Delete Project'}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
