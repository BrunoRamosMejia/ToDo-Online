"use client";
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const DEPLOY_BACK_URL = process.env.NEXT_PUBLIC_DEPLOY_BACK_URL as string;

function GoogleCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      axios
        .get(`${DEPLOY_BACK_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          localStorage.setItem(
            "actualUser",
            JSON.stringify({ login: true, access_token: token, id: data.id })
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