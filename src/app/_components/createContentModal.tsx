import { useState, useEffect } from "react";
import { CreateContentForm } from "./createContentForm";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { listProjects } from "../services/projectsService";
import { type GetProjects } from "../common/types/projectTypes";
import { type CloseModalProps } from "../common/types/commonTypes";

export function CreateContentModal({ isOpen, closeModal }: CloseModalProps) {
    const [projects, setProjects] = useState<{ id: number; name: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function fetchProjects() {
        setLoading(true);
        try {
            const projectsData: GetProjects[] = await listProjects();
            setProjects(projectsData);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
            toast.error("Failed to load projects.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchProjects().catch(console.error)
        }
    }, [isOpen]);


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-1/3 xl:max-w-1/3">
                <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Add New Content</h2>

                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <CreateContentForm
                        projects={projects}
                        onSuccess={() => {
                            closeModal();
                            toast.success("Content created successfully!");
                            router.refresh();
                        }}
                        onError={() => {
                            toast.error("Failed to create content.");
                        }}
                        onCancel={closeModal}
                    />
                )}
            </div>
        </div>
    );
}
