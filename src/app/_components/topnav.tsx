"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CreateProjectForm } from "./createProjectForm";
export function Topnav() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
            <div>Home Page</div>

            <div className="flex flex-row items-center gap-4">
                <button onClick={openModal} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Add new Project
                </button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">Add New Project</h2>

                        <CreateProjectForm
                            onSuccess={() => {
                                closeModal();
                                toast.success("Project created successfully!");
                                router.refresh()
                            }}
                            onError={() => {
                                toast.error("Failed to create project.");
                            }}
                        />

                        <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
