"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getContent, } from "../services/contentService";
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
    const [content, setContent] = useState<Content | null>(null);
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

    // async function handleUpdate() {
    //     if (content) {
    //         try {
    //             await updateContent(content); // Função para atualizar o conteúdo
    //             alert("Content updated successfully");
    //         } catch (error) {
    //             console.error("Failed to update content:", error);
    //         }
    //     }
    // }

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
                            ? { ...field, value: typeof newValue === 'boolean' ? (newValue ? 'yes' : 'no') : newValue }
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
                                                    onChange={(e) => handleContentChange('text', e.target.value)}
                                                    className="border-2 border-gray-300 rounded-md p-2 text-black"
                                                    placeholder={field.key}
                                                />
                                            ) : (
                                                <input
                                                    type="checkbox"
                                                    checked={field.value === 'yes'}
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
                    {/* <button
                        onClick={handleUpdate}
                        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Update Content
                    </button> */}
                </div>
            )}
        </div>
    );


}
