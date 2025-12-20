"use client";

import axios from "axios"
import { useState } from "react";
import { comfortaa } from "../(shared)/fonts";
import { useRouter } from "next/navigation";

const POST_USER_LOGIN_URL = "http://localhost:3001/auth/login/"

export default function LoginUserPage() {

  const router = useRouter();

  // ESTADO INICIAL
  const initialState = {
    email: "",
    password: "",
  }

  // FORMULARIO (USER LOGIN)
  const [form, setForm] = useState(initialState);

  // HANDLERS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    axios
      .post(POST_USER_LOGIN_URL, form)
      .then(({ data }) => {
        console.log(data)
        localStorage.setItem("actualUser", JSON.stringify(data));
        alert("Sesion Iniciada Exitosamente");
        setForm(initialState);
        router.push("/dashboard");
      })
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 rounded-3xl shadow-3xl px-10 py-12 w-full max-w-md"
        style={{
          backgroundColor: "#fff7ee",
          border: "1px solid #A47551",
        }}
      >
        <h2
          className={`${comfortaa.className} text-3xl font-bold mb-2 text-center`}
          style={{ color: "#4B3A23" }}
        >
          Inicia Sesion -u-
        </h2>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
          className="py-3 px-4 rounded-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#A47551] bg-[#F5E9DA] text-[#4B3A23] font-medium"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
          className="py-3 px-4 rounded-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#A47551] bg-[#F5E9DA] text-[#4B3A23] font-medium"
        />
        <button
          type="submit"
          className="py-3 rounded-lg font-semibold transition"
          style={{
            backgroundColor: "#A47551",
            color: "#F5E9DA",
            border: "2px solid #7C5E3C",
          }}
        >
          Iniciar Sesion
        </button>
        <button
          type="button"
          onClick={() => window.location.href = "http://localhost:3001/auth/google"}
          className="py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition border"
          style={{
            backgroundColor: "#fff",
            color: "#4B3A23",
            border: "2px solid #A47551",
            boxShadow: "0 2px 8px 0 #f5e9da"
          }}
        >
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_17_40)">
              <path d="M47.532 24.552c0-1.636-.146-3.2-.418-4.704H24.48v9.02h13.02c-.56 3.02-2.24 5.58-4.76 7.3v6.06h7.7c4.5-4.14 7.09-10.24 7.09-17.68z" fill="#4285F4"/>
              <path d="M24.48 48c6.48 0 11.92-2.14 15.89-5.82l-7.7-6.06c-2.14 1.44-4.88 2.3-8.19 2.3-6.3 0-11.64-4.26-13.56-9.98H2.67v6.24C6.62 43.98 14.88 48 24.48 48z" fill="#34A853"/>
              <path d="M10.92 28.44c-.5-1.44-.8-2.98-.8-4.44s.3-3 .8-4.44v-6.24H2.67A23.97 23.97 0 000 24c0 3.98.96 7.76 2.67 11.24l8.25-6.8z" fill="#FBBC05"/>
              <path d="M24.48 9.5c3.54 0 6.68 1.22 9.17 3.62l6.87-6.87C36.4 2.14 30.96 0 24.48 0 14.88 0 6.62 4.02 2.67 10.76l8.25 6.24c1.92-5.72 7.26-9.98 13.56-9.98z" fill="#EA4335"/>
            </g>
            <defs>
              <clipPath id="clip0_17_40">
                <path fill="#fff" d="M0 0h48v48H0z"/>
              </clipPath>
            </defs>
          </svg>
          Iniciar sesión con Google
        </button>
        <p className="text-center text-[#7C5E3C] text-sm">
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="underline text-[#A47551]">
            Registrate Aqui!
          </a>
        </p>
      </form>
    </div>
  );
}