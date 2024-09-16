"use client";

import Link from "next/link";
import { listProjects } from "../services/projectsService";
import { useState, useEffect } from "react";

type GetProjects = {
    id: number;
    name: string;
};

export function ProjectContents() {
    const [projects, setProjects] = useState<GetProjects[]>([]);
    const [selectedProject, setSelectedProject] = useState<string>("");

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
                        value={project.id}
                        className="text-black border"
                    >
                        {project.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
