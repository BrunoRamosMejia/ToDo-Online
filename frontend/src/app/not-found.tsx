"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<motion.div
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ type: "spring", stiffness: 120, damping: 10 }}
				className="flex flex-col items-center"
			>
				<motion.div
					initial={{ y: -40, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
				>
					<Image
						src="/todoOnline.png"
						alt="Not found cozy"
						width={120}
						height={120}
						className="rounded-2xl shadow-lg border-4"
						style={{ borderColor: "#A47551" }}
					/>
				</motion.div>
				<motion.h1
					className="mt-8 text-4xl font-bold text-[#A47551] drop-shadow-lg text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5, duration: 0.7 }}
				>
					Error 404 | ¡Ups! Página no encontrada
				</motion.h1>
				<motion.p
					className="mt-4 text-lg text-[#4B3A23] text-center max-w-md"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.7, duration: 0.7 }}
				>
					Me parece que flasheaste una banda. <br />
					No te preocupes, podes volver a un lugar safe :3
				</motion.p>
				<motion.a
					href="/dashboard"
					className="mt-8 px-6 py-3 rounded-xl font-semibold text-[#F5E9DA] bg-[#A47551] border border-[#7C5E3C] shadow-md hover:bg-[#7C5E3C] transition-colors duration-300 relative overflow-hidden"
					whileHover={{ scale: 1.07 }}
					whileTap={{ scale: 0.97 }}
				>
					Volver al Dashboard
					<motion.span
						className="absolute left-0 top-0 w-full h-full bg-[#EADBC8] opacity-10 pointer-events-none animate-pulse"
						animate={{ opacity: [0.1, 0.3, 0.1] }}
						transition={{ repeat: Infinity, duration: 2 }}
					/>
				</motion.a>
				<motion.div
					className="mt-12 flex gap-2"
					initial="hidden"
					animate="visible"
				>
					{[...Array(5)].map((_, i) => (
						<motion.div
							key={i}
							className="w-4 h-4 rounded-full bg-[#A47551] opacity-60"
							initial={{ y: 0 }}
							animate={{ y: [0, -10, 0] }}
							transition={{
								repeat: Infinity,
								duration: 1.2,
								delay: i * 0.15,
								repeatType: "loop",
								ease: "easeInOut",
							}}
						/>
					))}
				</motion.div>
			</motion.div>
		</div>
	);
}
