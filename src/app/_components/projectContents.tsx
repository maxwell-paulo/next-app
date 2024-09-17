"use client";

import Link from "next/link";
import { listProjects } from "../services/projectsService";
import { useState, useEffect } from "react";
import { listContents } from "../services/contentsService";
import { EyeIcon } from '@heroicons/react/24/solid'

type GetProjects = {
    id: number;
    name: string;
};

type GetContents = {
    id: number;
    name: string;
    projectId: number;
};


export function ProjectContents() {
    const [projects, setProjects] = useState<GetProjects[]>([]);
    const [contents, setContents] = useState<GetContents[]>([]);
    const [selectedProject, setSelectedProject] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        async function fetchProjects() {
            try {
                const projectsData: GetProjects[] = await listProjects();
                setProjects(projectsData);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            }
        }

        fetchProjects().catch(console.error);
    }, []);

    useEffect(() => {
        async function fetchContents() {
            setLoading(true);
            try {
                const contentsData = await listContents(selectedProject ? Number(selectedProject) : undefined);
                setContents(contentsData as GetContents[])
            } catch (error) {
                console.error("Failed to fetch contents:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchContents().catch(console.error);
    }, [selectedProject]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProject(event.target.value);
    };

    return (
        <div className="flex flex-col items-center gap-6">
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

            <div className="mt-4 w-full flex justify-center">
                <div className="w-96">
                    <h2 className="text-xl font-bold mb-4 text-center">Contents</h2>

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
        </div>
    );

}
