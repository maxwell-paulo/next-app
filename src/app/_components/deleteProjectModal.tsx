import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { listProjects } from "../services/projectsService";
import { deleteProject } from "../services/projectService";
import { toast } from "sonner";

interface CreateProjectModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

type GetProjects = {
    id: number;
    name: string;
};

export function DeleteProjectModal({ isOpen, closeModal }: CreateProjectModalProps) {
    const [projects, setProjects] = useState<GetProjects[]>([]);
    const [selectedProject, setSelectedProject] = useState<string>("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchProjects().catch(console.error);
        }
    }, [isOpen]);

    async function fetchProjects() {
        try {
            const projectsData: GetProjects[] = await listProjects();
            setProjects(projectsData);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
            toast.error("Failed to fetch projects.");
        }
    };

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedProject(event.target.value);
    };

    async function handleDelete(e: React.FormEvent) {
        e.preventDefault();
        setIsDeleting(true);

        try {
            await deleteProject(Number(selectedProject));
            toast.success("Project deleted successfully!");
            await fetchProjects();
        } catch (err) {
            console.error("Failed to delete project:", err);
            toast.error("Failed to delete project.");
        } finally {
            setIsDeleting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-1/3 xl:max-w-1/3">
                <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Delete Project</h2>
                <div className="mt-4 w-full flex flex-col justify-center items-center">
                    <label htmlFor="project-select" className="text-lg font-semibold mb-2">
                        Select a Project
                    </label>
                    <select
                        id="project-select"
                        value={selectedProject}
                        onChange={handleChange}
                        className="p-2 border rounded text-black w-64"
                    >
                        <option value="" disabled>Select a project</option>
                        {projects.map((project) => (
                            <option
                                key={project.id}
                                value={project.id.toString()}
                                className="text-black border"
                            >
                                {project.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-4 mt-4">
                    <Button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="w-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete Project'}
                    </Button>
                    <Button
                        onClick={closeModal}
                        disabled={isDeleting}
                        className="w-full border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
}
