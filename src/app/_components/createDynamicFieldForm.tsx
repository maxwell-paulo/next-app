import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "~/components/ui/button";
import { createDynamicField } from "../services/dynamicFields";

interface CreateDynamicFieldFormProps {
    onSuccess: () => void;
    onError: () => void;
    onCancel: () => void;
}

export function CreateDynamicFieldForm({
    onSuccess,
    onError,
    onCancel,
}: CreateDynamicFieldFormProps) {
    const params = useParams();
    const contentId = Number(params.id)

    const [key, setKey] = useState("");
    const [fieldType, setFieldType] = useState<"text" | "checkbox">("text");
    const [value, setValue] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await createDynamicField({ key, fieldType, value, contentId });
            onSuccess();
            setKey("");
            setFieldType("text");
            setValue("");
        } catch (err) {
            onError();
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <label htmlFor="key" className="block text-sm font-semibold text-gray-800">
                    Field Name
                </label>
                <input
                    type="text"
                    id="key"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    required
                    className="mt-1 block w-full border-2 border-gray-400 rounded-lg px-4 py-2 text-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>

            <div>
                <label htmlFor="fieldType" className="block text-sm font-semibold text-gray-800">
                    Field Type
                </label>
                <select
                    id="fieldType"
                    value={fieldType}
                    onChange={(e) => setFieldType(e.target.value as "text" | "checkbox")}
                    required
                    className="mt-1 block w-full border-2 border-gray-400 rounded-lg px-4 py-2 text-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                    <option value="text">Text</option>
                    <option value="checkbox">Checkbox</option>
                </select>
            </div>

            <div>
                <label htmlFor="value" className="block text-sm font-semibold text-gray-800">
                    Value
                </label>
                {fieldType === "text" ? (
                    <input
                        type="text"
                        id="value"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                        className="mt-1 block w-full border-2 border-gray-400 rounded-lg px-4 py-2 text-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                ) : (
                    <input
                        type="checkbox"
                        id="value"
                        checked={value === "true"}
                        onChange={(e) => setValue(e.target.checked ? "true" : "false")}
                        className="mt-1 h-5 w-5 text-blue-600 focus:ring-indigo-500"
                    />
                )}
            </div>

            <div className="flex gap-4">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
                >
                    {isSubmitting ? "Creating..." : "Create Field"}
                </Button>
                <Button
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="w-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
