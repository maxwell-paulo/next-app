"use client";

import Link from "next/link";
import { listProjects } from "../services/projectsService";
import { useState, useEffect } from "react";
import { listContents } from "../services/contentsService";

type GetProjects = {
    id: number;
    name: string;
};

type GetContents = {
    id: number;
    title: string;
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
        <div className="flex flex-col items-center gap-4">
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

            <div className="mt-4 w-full">
                {loading ? (
                    <p>Loading contents...</p>
                ) : (
                    contents.length === 0 ? (
                        <p>No contents available.</p>
                    ) : (
                        <ul className="list-disc">
                            {contents.map((content) => (
                                <li key={content.id} className="p-2 border-b">
                                    <h3 className="font-semibold">{content.title}</h3>
                                    <p>{content.id}</p>
                                </li>
                            ))}
                        </ul>
                    )
                )}
            </div>
        </div>
    );

}
