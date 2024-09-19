"use client";

import Link from "next/link";
import { listProjects } from "../../services/projectsService";
import { useState, useEffect } from "react";
import { listContents } from "../../services/contentsService";
import { EyeIcon } from '@heroicons/react/24/solid';
import { Button } from "~/components/ui/button";
import { CreateProjectModal } from "../createProjectModal/createProjectModal";
import { DeleteProjectModal } from "./deleteProjectModal";
import { CreateContentModal } from "../createContentModal/createContentModal";
import { type GetProjects } from "../../common/types/projectTypes";
import { type Content } from "../../common/types/contentTypes";

export const dynamic = "force-dynamic";


export function ProjectContents() {
    const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
    const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] = useState(false);
    const [isNewContentModalOpen, setIsNewContentModalOpen] = useState(false);
    const [projects, setProjects] = useState<GetProjects[]>([]);
    const [contents, setContents] = useState<Content[]>([]);
    const [selectedProject, setSelectedProject] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const openNewProjectModal = () => setIsNewProjectModalOpen(true);
    const closeNewProjectModal = () => {
        setIsNewProjectModalOpen(false);
        fetchProjects().catch(console.error);
    };

    const openNewContentModal = () => setIsNewContentModalOpen(true);
    const closeNewContentModal = () => {
        setIsNewContentModalOpen(false);
        fetchContents().catch(console.error);
    };

    const openDeleteProjecModal = () => setIsDeleteProjectModalOpen(true);
    const closeDeleteProjecModal = () => {
        setIsDeleteProjectModalOpen(false);
        fetchProjects().catch(console.error);
        fetchContents().catch(console.error);
    };

    async function fetchProjects() {
        try {
            const projectsData: GetProjects[] = await listProjects();
            setProjects(projectsData);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        }
    };

    async function fetchContents() {
        setLoading(true);
        try {
            const contentsData = await listContents(selectedProject ? Number(selectedProject) : undefined);
            setContents(contentsData as Content[]);
        } catch (error) {
            console.error("Failed to fetch contents:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProjects().catch(console.error);
        fetchContents().catch(console.error);
    }, []);

    useEffect(() => {
        if (selectedProject) {
            fetchContents().catch(console.error);
        }
    }, [selectedProject]);

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedProject(event.target.value);
    };

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex justify-between w-full">
                <div className="ml-auto flex gap-6 mt-3 mr-3">
                    <Button
                        onClick={openNewProjectModal}
                        className="bg-blue-500 text-white border-2 border-blue-500 hover:bg-blue-600 hover:border-blue-600 transition-colors duration-300"
                    >
                        Add New Project
                    </Button>
                    <Button
                        onClick={openDeleteProjecModal}
                        className="bg-red-500 text-white border-2 border-red-500 hover:bg-red-600 hover:border-red-600 transition-colors duration-300"
                    >
                        Delete Project
                    </Button>
                </div>
            </div>
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
            <div className="mt-4 w-full flex justify-center mb-8">
                <div className="w-96">
                    <div className="flex items-baseline justify-center gap-4 mb-6">
                        <h2 className="text-xl font-bold mb-4 text-center">Contents</h2>
                        <Button
                            onClick={openNewContentModal}
                            className="bg-blue-500 text-white border-2 border-blue-500 hover:bg-blue-600 hover:border-blue-600 transition-colors duration-300"
                        >
                            Add New Content
                        </Button></div>


                    {loading ? (
                        <p>Loading contents...</p>
                    ) : contents.length === 0 ? (
                        <p>No contents available.</p>
                    ) : (
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border px-2 py-2 w-1/6 text-center">ID</th>
                                    <th className="border px-2 py-2 w-4/6 text-center">Content Name</th>
                                    <th className="border px-2 py-2 w-1/6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contents.map((content) => (
                                    <tr key={content.id}>
                                        <td className="border px-2 py-2 text-center">{content.id}</td>
                                        <td className="border px-2 py-2">{content.name}</td>
                                        <td className="border px-2 py-2 text-center">
                                            <Link href={`/contents/${content.id}`}>
                                                <EyeIcon className="h-6 w-6 text-white cursor-pointer mx-auto" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <CreateProjectModal isOpen={isNewProjectModalOpen} closeModal={closeNewProjectModal} />
            <DeleteProjectModal isOpen={isDeleteProjectModalOpen} closeModal={closeDeleteProjecModal} />

            <CreateContentModal isOpen={isNewContentModalOpen} closeModal={closeNewContentModal} />
        </div>
    );
}
