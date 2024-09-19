"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { deleteContent, getContent, updateContent } from "../../services/contentService";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { CreateDynamicFieldModal } from "../createDynamicFieldModal/createDynamicFieldModal";
import { type FullContent } from "../../common/types/contentTypes";
import { ContentForm } from "./contentForm";
import { DynamicFieldsForm } from "./dynamicFieldsForm";

export default function FullPageContentView({ isModal }: { isModal: boolean }) {
    const router = useRouter();
    const [content, setContent] = useState<FullContent | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const params = useParams();
    const id = Number(params.id);

    const openNewDynamicFieldModal = () => setIsModalOpen(true);
    const closeNewDynamicFieldModal = () => {
        setIsModalOpen(false);
        fetchContent(id).catch(console.error);
    };

    async function fetchContent(id: number) {
        try {
            const contentData: FullContent = await getContent(id);
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
                    value: field.value,
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
            if (isModal) {
                router.back();
            } else {
                router.push("/")
            }

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

    return (
        <div className="flex flex-col items-center p-6 space-y-4">
            {content && (
                <div className="max-w-4xl w-full">
                    <ContentForm content={content} setContent={setContent} />
                    <div>
                        <div className="flex items-center gap-5 mb-4">
                            <h2 className="text-xl font-bold">Extra Infos</h2>
                            <PlusCircleIcon className="text-white w-8 cursor-pointer" onClick={openNewDynamicFieldModal} />
                        </div>
                        {content.dynamicFields.length > 0 ? (
                            <DynamicFieldsForm
                                content={content}
                                setContent={setContent}
                                setIsDeleting={setIsDeleting}
                                id={id}
                            />
                        ) : (
                            <strong className="w-32">No additional information added</strong>
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
                            {isDeleting ? 'Deleting...' : 'Delete Content'}
                        </Button>
                    </div>
                </div>
            )}

            <CreateDynamicFieldModal isOpen={isModalOpen} closeModal={closeNewDynamicFieldModal} />
        </div>
    );
}
