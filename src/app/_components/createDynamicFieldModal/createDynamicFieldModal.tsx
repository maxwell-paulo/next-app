import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CreateDynamicFieldForm } from "./createDynamicFieldForm";
import { type CloseModalProps } from "../../common/types/commonTypes";

export function CreateDynamicFieldModal({ isOpen, closeModal }: CloseModalProps) {
    const router = useRouter();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-1/3 xl:max-w-1/3 ">
                <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Add Extra info:</h2>

                <CreateDynamicFieldForm
                    onSuccess={() => {
                        closeModal();
                        toast.success("Project created successfully!");
                        router.refresh();
                    }}
                    onError={() => {
                        toast.error("Failed to create project.");
                    }}
                    onCancel={closeModal}
                />
            </div>
        </div>
    );
}
