import { CreateProjectForm } from "./createProjectForm";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CreateProjectModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

export function CreateProjectModal({ isOpen, closeModal }: CreateProjectModalProps) {
    const router = useRouter();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Add New Project</h2>

                <CreateProjectForm
                    onSuccess={() => {
                        closeModal();
                        toast.success("Project created successfully!");
                        router.refresh();
                    }}
                    onError={() => {
                        toast.error("Failed to create project.");
                    }}
                />

                <button
                    onClick={closeModal}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
