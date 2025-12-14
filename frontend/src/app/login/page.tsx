"use client";

import { useState } from "react";
import { comfortaa } from "../(shared)/fonts";

export default function LoginUserPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de registro
    alert("Registro enviado");
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