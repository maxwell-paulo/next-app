import { useState } from "react";
import { Button } from "~/components/ui/button";
import { createProject } from "../../services/projectService";

export function CreateProjectForm({ onSuccess, onError, onCancel }: { onSuccess: () => void; onError: () => void; onCancel: () => void; }) {
    const [projectName, setProjectName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await createProject(projectName);
            onSuccess();
            setProjectName('');
        } catch (err) {
            console.log(err);
            onError();
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <label
                    htmlFor="projectName"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Project Name
                </label>
                <input
                    type="text"
                    id="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                    className="mt-1 block w-full border-2 border-gray-400 rounded-lg px-4 py-2 text-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div className="flex gap-4">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
                >
                    {isSubmitting ? 'Creating...' : 'Create Project'}
                </Button>
                <Button
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="w-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
                >
                    Close
                </Button>
            </div>
        </form>
    );
}
