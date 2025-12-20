
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "../helpers/useAuthGuard";

export default function DashboardPage() {
    // Guard de User Logueado
    useAuthGuard();

    // ROUTER
    const router = useRouter();

    // HANDLERS
    const handleLogout = () => {
        const confirm = window.confirm("Esta seguro de que desea cerrar sesion? x_x")
        if (confirm) {
            localStorage.removeItem("actualUser");
            router.push("/");
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
        >
            {/* Seccion Topbar */}
            <motion.section
                className="flex items-center justify-center my-10 mx-8 gap-x-5"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 10 }}
            >
                {/* Imagen de Usuario */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
                >
                    <Image
                        src= "/todoOnline.png"
                        alt="To-do cozy"
                        width={80}
                        height={80}
                        className="rounded-xl"
                        style={{ borderColor: "#A47551" }}
                    />
                </motion.div>

                {/* Texto y Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                >
                    <h1 className="text-black text-lg">Bienvenido, Usuario! ♥</h1>
                    <h3 className="text-black text-xs">Tareas por Realizar: 3 | Tareas Hechas: 5</h3>
                </motion.div>
                
                {/* Botones */}
                <motion.div
                    className="flex gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                >
                    {/* Boton de Perfil */}
                    <motion.a
                        href="/dashboard/profile"
                        className="flex group relative px-3 py-3 w-15 h-11 rounded-lg text-center font-semibold overflow-hidden transition"
                        style={{
                        backgroundColor: "#A47551",
                        color: "#F5E9DA",
                        border: "1px solid #7C5E3C",
                        }}
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        {/* Animación de fondo */}
                        <span className="absolute inset-0 w-auto h-auto bg-[#4B3A23] transform scale-x-0 origin-right rounded-tl-full group-hover:scale-x-100 transition-transform duration-700 ease-in-out z-10"></span>
                        <span className="absolute inset-0 w-auto h-auto bg-[#4B3A23] transform scale-x-0 origin-left rounded-tr-full rounded-br-full group-hover:scale-x-100 transition-transform duration-700 ease-in-out z-10"></span>
                        {/* Boton */}
                        <span className="relative z-20 flex items-center justify-center text-center text-sm">
                        Perfil
                        </span>
                    </motion.a>
                    {/* Boton de Logout -n- */}
                    <motion.a
                        href="/"
                        className="flex group relative px-3 py-3 w-22 h-11 rounded-lg text-center font-semibold overflow-hidden transition"
                        style={{
                        backgroundColor: "#522121",
                        color: "#F5E9DA",
                        border: "1px solid #7C5E3C",
                        }}
                        onClick={handleLogout}
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        {/* Animación de fondo */}
                        <span className="absolute inset-0 w-auto h-auto bg-[#8b1616] transform scale-x-0 origin-right rounded-tl-full group-hover:scale-x-100 transition-transform duration-700 ease-in-out z-10"></span>
                        <span className="absolute inset-0 w-auto h-auto bg-[#8b1616] transform scale-x-0 origin-left rounded-tr-full rounded-br-full group-hover:scale-x-100 transition-transform duration-700 ease-in-out z-10"></span>
                        {/* Boton */}
                        <span className="relative z-20 flex items-center justify-center text-sm">
                        Cerrar Sesion
                        </span>
                    </motion.a>
                </motion.div>
            </motion.section>
            
            {/* Seccion To-Do */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
            >
                
            </motion.section>
        </motion.div>
    );
}