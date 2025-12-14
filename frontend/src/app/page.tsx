"use client";
import Image from "next/image";
import { comfortaa } from "./(shared)/fonts";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div
      className="flex min-h-screen items-center justify-center font-sans"
    >
      <motion.main
        className="flex flex-col items-center rounded-3xl shadow-3xl px-10 py-16"
        style={{
          backgroundColor: "#F5E9DA",
          maxWidth: 650,
          width: "100%",
        }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className= {`${comfortaa.className} text-5xl font-bold mb-4`} style={{ color: "#4B3A23" }}>
          To-do Online
        </h1>
        <p className="text-mg mb-8 text-center" style={{ color: "#7C5E3C" }}>
          Organiza tu día a día con estilo y sencillez. <br />
          Tu lista de tareas, siempre a mano, en un ambiente cálido y acogedor.
        </p>
        <div className="mb-8">
          <Image
            src= "/todoOnline.png"
            alt="To-do cozy"
            width={320}
            height={180}
            className="rounded-xl"
            style={{ borderColor: "#A47551" }}
          />
        </div>
        <div className="flex gap-4 w-full">
          <a
            href="/login"
            className="group relative flex-1 py-3 rounded-lg text-center font-semibold overflow-hidden transition"
            style={{
              backgroundColor: "#A47551",
              color: "#F5E9DA",
              border: "1px solid #7C5E3C",
            }}
          >
            {/* Animación de fondo */}
            <span className="absolute inset-0 w-auto h-auto bg-[#4B3A23] transform scale-x-0 origin-left rounded-tr-full rounded-br-full group-hover:scale-x-100 transition-transform duration-700 ease-in-out z-10"></span>
            <span className="absolute inset-0 w-auto h-auto bg-[#4B3A23] transform scale-x-0 origin-right rounded-tl-full group-hover:scale-x-100 transition-transform duration-700 ease-in-out z-10"></span>
            {/* Icono */}
            <span className="relative z-20 flex items-center justify-center gap-2">
              Iniciar sesión
            </span>
          </a>
          <a
            href="/register"
            className="group relative flex-1 py-3 rounded-lg text-center font-semibold overflow-hidden transition"
            style={{
              backgroundColor: "#A47551",
              color: "#F5E9DA",
              border: "1px solid #7C5E3C",
            }}
          >
            {/* Animación de fondo */}
            <span className="absolute inset-0 w-auto h-auto bg-[#4B3A23] transform scale-x-0 origin-right rounded-tl-full group-hover:scale-x-100 transition-transform duration-700 ease-in-out z-10"></span>
            <span className="absolute inset-0 w-auto h-auto bg-[#4B3A23] transform scale-x-0 origin-left rounded-tr-full rounded-br-full group-hover:scale-x-100 transition-transform duration-700 ease-in-out z-10"></span>
            {/* Icono */}
            <span className="relative z-20 flex items-center justify-center gap-2">
              Registrarse
            </span>
          </a>
        </div>
      </motion.main>
    </div>
  );
}
