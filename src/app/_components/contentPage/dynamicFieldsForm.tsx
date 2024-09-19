import { TrashIcon } from "@heroicons/react/24/solid";
import { type FullContent } from "../../common/types/contentTypes";
import { deleteDynamicField } from "../../services/dynamicFields";
import { toast } from "sonner";
import { getContent } from "../../services/contentService";

export function DynamicFieldsForm({
    content,
    setContent,
    setIsDeleting,
    id,
}: {
    content: FullContent;
    setContent: React.Dispatch<React.SetStateAction<FullContent | null>>;
    setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
    id: number;
}) {
    async function fetchContent(id: number) {
        try {
            const contentData: FullContent = await getContent(id);
            setContent(contentData);
        } catch (error) {
            console.error("Failed to fetch content:", error);
        }
    }

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

    async function handleDeleteDynamicField(e: React.FormEvent, fieldId: number) {
        e.preventDefault();
        setIsDeleting(true);

        try {
            await deleteDynamicField(fieldId);
            toast.success("Field deleted successfully!");
            fetchContent(id).catch(console.error)

        } catch (err) {
            console.error("Failed to delete field:", err);
            toast.error("Failed to delete field.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
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
                                onChange={(e) => { handleFieldChange(field.id, e.target.checked) }}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                        )}
                        <TrashIcon className="text-white w-5 cursor-pointer" onClick={(e) => handleDeleteDynamicField(e, field.id)} />
                    </li>
                ))}
            </ul>
        </>
    )
}