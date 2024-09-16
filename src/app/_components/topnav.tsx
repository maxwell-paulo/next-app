"use client";

import { useState } from "react";
import { CreateProjectModal } from "./createProjectModal";

export function Topnav() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
            <div>Home Page</div>

            <div className="flex flex-row items-center gap-4">
                <button
                    onClick={openModal}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Add new Project
                </button>
            </div>

            <CreateProjectModal isOpen={isModalOpen} closeModal={closeModal} />
        </nav>
    );
}
