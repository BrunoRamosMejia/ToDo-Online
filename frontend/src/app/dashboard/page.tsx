
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "../helpers/useAuthGuard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "@/src/components/TaskCard";

const DEPLOY_BACK_URL = process.env.NEXT_PUBLIC_DEPLOY_BACK_URL as string

export default function DashboardPage() {
    // Guard de User Logueado
    useAuthGuard();

    // ========== STATES ==========
    interface User {
        id: string;
        name: string;
        email: string;
        profileImg: string;
    }
    
    const initialTaskState = {
        taskName: "",
        description: "",
        userId: "",
    }

    const taskPlaceholder = [
    {
        id: "1",
        taskName: "",
        description: "",
        status: false,
    },
];

    // Estado de Datos de Usuario
    const [datosUser, setDatosUser] = useState<User | null>(null)
    
    // Estado Miniform de crear tarea
    const [form, setForm] = useState(initialTaskState)

    // Estado de Tareas de Usuario
    const [tasks, setTasks] = useState<any[]>(taskPlaceholder)

    // ========== HANDLERS ==========

    // HandleChange para el MiniForm
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Handle Submit
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const userString = localStorage.getItem("actualUser");
        if (!userString) return;

        const user = JSON.parse(userString);
        const formWithUserId = {
            ...form,
            userId: user.id,
        };

        axios
            .post(`${DEPLOY_BACK_URL}/tasks`, formWithUserId)
            .then(({ data }) => {
                console.log(data)
                alert("Tarea creada owo")
                setForm(initialTaskState);
                fetchTasks(user.id);
            })
    }

    // Actualizar/Obtener Tareas
    const fetchTasks = (userId: string) => {
        axios
            .get(`${DEPLOY_BACK_URL}/tasks/${userId}`)
            .then(res => setTasks(res.data))
            .catch(err => {
                setTasks([]);
                console.error(err)
            });
    }

    // Cambiar status de tarea
    const handleStatusChange = async (taskId: string, newStatus: boolean) => {
        try {
            await axios.patch(`${DEPLOY_BACK_URL}/tasks/${taskId}`, { status: newStatus });
            const userString = localStorage.getItem("actualUser");
            if (userString) {
                const user = JSON.parse(userString);
                fetchTasks(user.id);
            }
        } catch (error) {
            console.error("Error actualizando el status de la tarea", error);
        }
    }

    useEffect(() => {
        const userString = localStorage.getItem("actualUser");
        if (userString) {
            const user = JSON.parse(userString);
            axios
                .get(`${DEPLOY_BACK_URL}/users/${user.id}`)
                .then(res => setDatosUser(res.data))
                .catch(err => console.error(err));

            fetchTasks(user.id);       
        }
    }, []);

    const handleLogout = () => {
        const confirm = window.confirm("Esta seguro de que desea cerrar sesion? x_x")
        if (confirm) {
            localStorage.removeItem("actualUser");
            router.push("/");
        }
    }

    // ========== ROUTER ==========
    const router = useRouter();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
        >
            {/* SECCION TOPBAR */}
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
                        src= {datosUser ? datosUser.profileImg : "/todoOnline.png"}
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
                    <h1 className="text-black text-lg">Bienvenido, {datosUser ? datosUser.name : "Usuario"}! ♥</h1>
                    <h3 className="text-black text-xs">Tareas por Realizar: {tasks.length}</h3>
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
            
            {/* SECCION TO-DO */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
            >
                {/* Mini formulario para agregar nueva tarea */}
                <motion.form
                    className="relative flex flex-col gap-2 w-full max-w-md mx-auto my-5 p-4 rounded-xl shadow border"
                    style={{
                        backgroundColor: "#F5E9DA",
                        border: "2px solid #A47551"
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.7 }}
                    onSubmit={handleSubmit}
                >
                    <label className="text-[#4B3A23] font-semibold text-base">Tarea</label>
                    <input
                        name= "taskName"
                        className="rounded-lg px-3 py-2 border border-[#A47551] focus:outline-none focus:ring-2 focus:ring-[#A47551] bg-[#fff8f1] text-[#4B3A23] font-medium text-sm transition"
                        type="text"
                        placeholder="Ej: Comprar pan"
                        value={form.taskName}
                        onChange={handleFormChange}
                        required
                    />
                    <label className="text-[#4B3A23] font-semibold text-base">Descripción</label>
                    <textarea
                        name= "description"
                        className="rounded-lg px-3 py-2 border border-[#A47551] focus:outline-none focus:ring-2 focus:ring-[#A47551] bg-[#fff8f1] text-[#4B3A23] font-medium text-sm transition resize-none"
                        placeholder="Detalles de la tarea..."
                        value={form.description}
                        onChange={handleFormChange}
                        rows={2}
                        required
                    />
                    <motion.button
                        type="submit"
                        className="group relative flex items-center justify-center w-full py-2 px-5 rounded-lg font-bold text-base overflow-hidden transition shadow border mt-2"
                        style={{
                            backgroundColor: "#A47551",
                            color: "#F5E9DA",
                            border: "2px solid #7C5E3C",
                            letterSpacing: "0.05em",
                            cursor: "pointer"
                        }}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Animación de fondo */}
                        <span className="absolute inset-0 w-auto h-auto bg-[#4B3A23] transform scale-x-0 origin-right rounded-tl-full group-hover:scale-x-100 transition-transform duration-700 ease-in-out z-10"></span>
                        <span className="absolute inset-0 w-auto h-auto bg-[#4B3A23] transform scale-x-0 origin-left rounded-tr-full rounded-br-full group-hover:scale-x-100 transition-transform duration-700 ease-in-out z-10"></span>
                        {/* Texto del botón */}
                        <span className="relative z-20 flex items-center justify-center text-center">
                            Crear
                        </span>
                    </motion.button>
                </motion.form>
            </motion.section>

            {/* SECCION LISTA DE TAREAS */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                className="w-full max-w-md mx-auto my-8"
            >
                <h2 className="text-[#4B3A23] font-bold text-lg mb-4">Tus tareas</h2>
                <div className="flex flex-col gap-4">
                    {Array.isArray(tasks) && tasks.length === 0 ? (
                        <p className="text-[#A47551] text-center">No tienes tareas aún.</p>
                    ) : (
                        Array.isArray(tasks) && tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onStatusChange={handleStatusChange}
                            />
                        ))
                    )}
                </div>
            </motion.section>
        </motion.div>
    );
}