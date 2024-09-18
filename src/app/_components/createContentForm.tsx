import { useState } from "react";
import { Button } from "~/components/ui/button";
import { createProject } from "../services/projectService";

export function CreateContentForm({ projects, onSuccess, onError, onCancel }: {
    projects: { id: number; name: string }[];
    onSuccess: () => void;
    onError: () => void;
    onCancel: () => void;
}) {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [projectId, setProjectId] = useState<number | ''>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await createProject(name, text, projectId); // Modifique a chamada para passar os três dados
            onSuccess();
            setName('');
            setText('');
            setProjectId('');
        } catch (err) {
            onError();
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 block w-full border-2 border-gray-400 rounded-lg px-4 py-2 text-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label
                    htmlFor="text"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Text
                </label>
                <textarea
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    className="mt-1 block w-full border-2 border-gray-400 rounded-lg px-4 py-2 text-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label
                    htmlFor="project"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Project
                </label>
                <select
                    id="project"
                    value={projectId}
                    onChange={(e) => setProjectId(Number(e.target.value))}
                    required
                    className="mt-1 block w-full border-2 border-gray-400 rounded-lg px-4 py-2 text-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                    <option value="">Select a Project</option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex gap-4">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
                >
                    {isSubmitting ? 'Creating...' : 'Create Content'}
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
