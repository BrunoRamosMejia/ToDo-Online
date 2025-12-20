"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      // Opcional: obtener datos del usuario usando el token
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