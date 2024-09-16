"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { CreateProjectModal } from "./createProjectModal";

export function Topnav() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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


            <Button
                onClick={openModal}
                className="bg-blue-500 text-white border-2 border-blue-500 hover:bg-blue-600 hover:border-blue-600 transition-colors duration-300"
            >
                Add New Project
            </Button>


            <CreateProjectModal isOpen={isModalOpen} closeModal={closeModal} />
        </nav>
    );
}