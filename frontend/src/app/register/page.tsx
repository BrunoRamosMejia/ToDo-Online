"use client";

import React, { useState } from "react";
import { comfortaa } from "../(shared)/fonts";
import { validateRegister } from "../helpers/validateRegiser";
import { useRouter } from "next/navigation";
import axios from "axios";
import { error } from "console";

const POST_USER_REGISTER_URL = "http://localhost:3001/auth/register"

export default function CreateUserPage() {

  const router = useRouter()

  // ESTADO INICIAL
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  }

  // FORMULARIO (USER REGISTER)
  const [form, setForm] = useState(initialState);

  // ERRORES
  const [errors, setErrors] = useState({
    name: "Nombre es requerido",
    email: "Email es requerido",
    password: "Contraseña es requerida",
    confirmPassword: "Confirmar contraseña es requerido",
  })

  // MUESTRA LOS ERRORES DESPUES DE HABER SIDO MODIFICADOS POR PRIMERA VEZ
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // HANDLERS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const updatedForm = {
      ...form,
      [name]: type === "checkbox" ? checked : value,
    };
    setForm(updatedForm);

    setErrors(validateRegister(updatedForm));
  };

  const handleTouched = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
    setErrors(validateRegister(form));
    
    axios
      .post(POST_USER_REGISTER_URL, form)
      .then(({ data }) => {
        localStorage.setItem("actualUser", JSON.stringify(data));
        alert("Usuario Creado Exitosamente");
        setForm(initialState);
        router.push("/dashboard");
      })
      .catch((error) => {
        const message = error.response?.data?.message || "Error al crear el usuario";
        alert(message);
});
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
          Crea tu cuenta :3
        </h2>
        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          value={form.name}
          onChange={handleChange}
          onBlur={handleTouched}
          required
          className="py-3 px-4 rounded-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#A47551] bg-[#F5E9DA] text-[#4B3A23] font-medium"
        />
        {touched.name && errors.name && (
          <span style={{ color: '#8B0000', fontSize: '0.9em' }}>{errors.name}</span>
        )}
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          onBlur={handleTouched}
          required
          className="py-3 px-4 rounded-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#A47551] bg-[#F5E9DA] text-[#4B3A23] font-medium"
        />
        {touched.email && errors.email && (
          <span style={{ color: '#8B0000', fontSize: '0.9em' }}>{errors.email}</span>
        )}
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          onBlur={handleTouched}
          required
          className="py-3 px-4 rounded-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#A47551] bg-[#F5E9DA] text-[#4B3A23] font-medium"
        />
        {touched.password && errors.password && (
          <span style={{ color: '#8B0000', fontSize: '0.9em' }}>{errors.password}</span>
        )}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          value={form.confirmPassword}
          onChange={handleChange}
          onBlur={handleTouched}
          required
          className="py-3 px-4 rounded-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#A47551] bg-[#F5E9DA] text-[#4B3A23] font-medium"
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <span style={{ color: '#8B0000', fontSize: '0.9em' }}>{errors.confirmPassword}</span>
        )}
        <label className="flex items-center gap-2 text-[#7C5E3C] text-sm">
          <input
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
            required
            className="accent-[#A47551]"
          />
          Acepto los{" "}
          <a href="#" className="underline text-[#A47551]">
            términos y condiciones
          </a>
        </label>
        <button
          type="submit"
          className="py-3 rounded-lg font-semibold transition"
          style={{
            backgroundColor: "#A47551",
            color: "#F5E9DA",
            border: "2px solid #7C5E3C",
          }}
        >
          Registrarse
        </button>
        <p className="text-center text-[#7C5E3C] text-sm">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="underline text-[#A47551]">
            Iniciar sesión
          </a>
        </p>
      </form>
    </div>
  );
}