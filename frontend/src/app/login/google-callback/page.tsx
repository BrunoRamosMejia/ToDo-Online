"use client";
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

function GoogleCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      axios
        .get("http://localhost:3001/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          localStorage.setItem(
            "actualUser",
            JSON.stringify({ ...data, access_token: token, login: true })
          );
          router.replace("/dashboard");
        })
        .catch(() => {
          router.replace("/");
        });
    } else {
      router.replace("/");
    }
  }, [router, searchParams]);

  return <div>Iniciando sesión con Google...</div>;
}

export default function GoogleCallbackPage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <GoogleCallbackInner />
        </Suspense>
    )
}