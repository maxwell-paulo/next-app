"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { XCircleIcon } from "@heroicons/react/24/outline";

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dialogRef = useRef<ElementRef<"dialog">>(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };

    }, []);

    function onDismiss() {
        router.back();
    }

    return createPortal(
        <dialog
            ref={dialogRef}
            className="absolute h-screen w-screen bg-black/90 text-white"
            onClose={onDismiss}
        >
            {children}
            <button
                onClick={onDismiss}
                className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800"
                aria-label="Close"
            >
                <XCircleIcon className="h-6 w-6" />
            </button>
        </dialog>,
        document.getElementById("modal-root")!,
    );
}