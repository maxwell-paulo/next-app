"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function Topnav() {
    const router = useRouter()

    return (
        <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
            <div>Home Page</div>

            <div className="flex flex-row items-center gap-4" onClick={() => {
                router.refresh()
                toast("clicked", {
                    duration: 1000,
                    id: "clicked"
                })
            }}>
                Add new Project
            </div>
        </nav>
    )
} 