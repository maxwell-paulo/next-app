"use client";

import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

export function Topnav() {
    const router = useRouter();

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
        </nav>
    );
}