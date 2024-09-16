import { useState } from "react";

export function CreateProjectForm({ onSuccess, onError }: { onSuccess: () => void; onError: () => void }) {
    const [projectName, setProjectName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        console.log(JSON.stringify({ name: projectName }))

        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: projectName }),
            });

            if (res.ok) {
                onSuccess();
                setProjectName('');
            } else {
                onError();
            }
        } catch (err) {
            onError();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                Project Name
            </label>
            <input
                type="text"
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />

            <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
                {isSubmitting ? 'Creating...' : 'Create Project'}
            </button>
        </form>
    );
}
