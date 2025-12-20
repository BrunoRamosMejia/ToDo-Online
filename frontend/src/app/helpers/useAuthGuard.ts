"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Auth Guard, comprueba si hay un user logueado, de lo contrario redirecciona a la landing page
export function useAuthGuard() {
    const router = useRouter()

    useEffect(() => {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem("actualUser");
            if (!user) {
                router.push("/");
            }
        }
    }, [router]);
}