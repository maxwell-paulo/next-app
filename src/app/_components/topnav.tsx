"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { CreateProjectModal } from "./createProjectModal";
import { DeleteProjectModal } from "./deleteProjectModal";

export function Topnav() {
    const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
    const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] = useState(false);
    const router = useRouter();

    const openNewProjecModal = () => setIsNewProjectModalOpen(true);
    const closeNewProjecModal = () => setIsNewProjectModalOpen(false);
    const openDeleteProjecModal = () => setIsDeleteProjectModalOpen(true);
    const closeDeleteProjecModal = () => setIsDeleteProjectModalOpen(false);

    const handleHomeClick = () => {
        router.push('/');
    };

    return (
        <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
            <Button
                onClick={handleHomeClick}
                className="text-lg font-semibold text-white bg-transparent border-none hover:text-black transition-colors duration-300"
            >
                Home Page
            </Button>

            <div className="flex gap-6">
                <Button
                    onClick={openNewProjecModal}
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


            <CreateProjectModal isOpen={isNewProjectModalOpen} closeModal={closeNewProjecModal} />
            <DeleteProjectModal isOpen={isDeleteProjectModalOpen} closeModal={closeDeleteProjecModal} />
        </nav>
    );
}