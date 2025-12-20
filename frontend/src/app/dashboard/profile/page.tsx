
"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProfilePage() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.7 }}
		>
			{/* Seccion Imagen */}
			<motion.section
				className="flex flex-col items-center justify-center my-10 mx-8 gap-y-6"
				initial={{ y: -40, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ type: "spring", stiffness: 120, damping: 10 }}
			>
				<div className="flex flex-col items-center gap-4">
					<div
						className="flex items-center justify-center w-36 h-36 rounded-full border-4"
						style={{
							borderColor: "#A47551",
							background: "#F5E9DA",
						}}
					>
						<Image
							src="/todoOnline.png"
							alt="Profile avatar"
							width={100}
							height={100}
							className="rounded-full"
							style={{ border: "2px solid #7C5E3C" }}
						/>
					</div>
					<button
						className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition relative overflow-hidden"
						style={{
							backgroundColor: "#A47551",
							color: "#F5E9DA",
							border: "1px solid #7C5E3C",
						}}
					>
						<span className="relative z-20 flex items-center">
							<svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-[#F5E9DA]">
								<path d="M12 16v-4m0 0V8m0 4h4m-4 0H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
							</svg>
							Subir Nueva Foto
						</span>
					</button>
				</div>
			</motion.section>

			{/* Seccion Formulario de Perfil */}
			<motion.section
				className="flex flex-col items-center justify-center mx-8"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2, duration: 0.7 }}
			>
				<form
					className="flex flex-col gap-6 w-full max-w-md bg-[#F5E9DA] rounded-xl shadow-md p-8 border"
					style={{ borderColor: "#A47551" }}
				>
					<h1 className="text-2xl font-bold text-center mb-4 tracking-wide text-[#4B3A23]">Perfil de Usuario</h1>
					<div className="flex flex-col gap-1">
						<label htmlFor="name" className="text-sm font-semibold text-[#7C5E3C]">Nombre:</label>
						<input
							id="name"
							type="text"
							className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A47551] bg-[#F5E9DA] text-[#4B3A23] font-medium border-[#A47551]"
							placeholder="John Smith"
							value="John Smith"
							readOnly
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label htmlFor="email" className="text-sm font-semibold text-[#7C5E3C]">Email:</label>
						<input
							id="email"
							type="email"
							className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A47551] bg-[#F5E9DA] text-[#4B3A23] font-medium border-[#A47551]"
							placeholder="john.smith@email.com"
							value="john.smith@email.com"
							readOnly
						/>
					</div>
					<button
						type="button"
						className="mt-4 w-full py-2 rounded-lg font-semibold shadow transition relative overflow-hidden"
						style={{
							backgroundColor: "#A47551",
							color: "#F5E9DA",
							border: "1px solid #7C5E3C",
						}}
					>
						Guardar Cambios
					</button>
				</form>
			</motion.section>
		</motion.div>
	);
}
