"use client"

import { motion } from "framer-motion"
import Image from "next/image"
const fadeUp = (delay = 0) => ({
	initial: { opacity: 0, y: 30 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
	return (
		<section
			id="hero"
			className="relative min-h-screen flex items-center px-6 md:px-16 pt-28 pb-20 z-10">
			<div className="max-w-5xl w-full mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
				{/* LEFT — Text content */}
				<div>
					{/* Tag */}
					<motion.div
						{...fadeUp(0.2)}
						className="flex items-center gap-3 mb-6 font-tech text-xs text-accent uppercase tracking-[0.25em]">
						<span className="w-10 h-px bg-accent" />
						// Available for work
					</motion.div>

					{/* Name */}
					<motion.h1
						{...fadeUp(0.4)}
						className="text-[clamp(3rem,7vw,6rem)] font-extrabold leading-[0.95] tracking-tight mb-5">
						<span className="block text-slate-200">Marco</span>
						<span
							className="block glitch-text"
							data-text="Ruslie"
							style={{
								WebkitTextStroke: "1px var(--accent)",
								color: "transparent",
							}}>
							Ruslie
						</span>
					</motion.h1>

					{/* Role */}
					<motion.p
						{...fadeUp(0.6)}
						className="font-tech text-[clamp(0.75rem,1.5vw,1rem)] text-muted tracking-wide mb-8">
						Website &amp; <span className="text-accent2">Mobile Developer</span>
						&nbsp;·&nbsp; Next.js &amp; Motion Specialist
					</motion.p>

					{/* Desc */}
					<motion.p
						{...fadeUp(0.8)}
						className="text-[0.95rem] text-muted leading-[1.8] mb-10">
						Building fast, beautiful digital products — from responsive web platforms to cross-platform
						mobile apps. Turning complex flows into seamless user experiences.
					</motion.p>

					{/* CTAs */}
					<motion.div
						{...fadeUp(1)}
						className="flex gap-4 flex-wrap">
						<a
							href="#experience"
							className="cursor-none font-mono text-xs font-bold uppercase tracking-widest text-bg px-8 py-4 transition-all hover:brightness-110 relative overflow-hidden clip-corner-sm"
							style={{ background: "var(--accent)" }}>
							<span className="relative z-10">View My Work</span>
						</a>
						<a
							href="#contact"
							className="cursor-none font-mono text-xs font-bold uppercase tracking-widest text-accent px-8 py-4 border border-accent clip-corner-sm transition-all hover:bg-accent/10"
							onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "var(--glow)")}
							onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "none")}>
							Get In Touch
						</a>
					</motion.div>
				</div>

				{/* RIGHT — Photo placeholder */}
				<motion.div
					initial={{ opacity: 0, scale: 0.92 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
					className="flex justify-center md:justify-end">
					<div className="relative w-[280px] h-[340px] md:w-[320px] md:h-[400px]">
						{/* Outer glow ring */}
						<div
							className="absolute inset-0 rounded-none"
							style={{
								background: "linear-gradient(135deg, rgba(0,255,229,0.15), rgba(124,58,237,0.15))",
								clipPath:
									"polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
								filter: "blur(1px)",
							}}
						/>

						{/* Photo container — replace src with your image */}
						<div
							className="absolute inset-[3px] overflow-hidden"
							style={{
								clipPath:
									"polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 22px 100%, 0 calc(100% - 22px))",
								background: "var(--surface)",
								border: "1px solid var(--border)",
							}}>
							
							<div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
								<div
									className="w-24 h-24 rounded-full flex items-center justify-center text-4xl"
									style={{
										background:
											"linear-gradient(135deg, rgba(0,255,229,0.1), rgba(124,58,237,0.2))",
										border: "1px solid var(--border)",
									}}>
									👤
								</div>
								<Image
									src="/profile.jpg"
									alt="Marco Ruslie"
									fill
									className="object-cover object-top"
								/>
							</div>

							{/* Gradient overlay for depth */}
							<div
								className="absolute inset-0 pointer-events-none"
								style={{
									background: "linear-gradient(to top, rgba(3,7,18,0.6) 0%, transparent 50%)",
								}}
							/>
						</div>

						{/* Corner accents */}
						<div
							className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2"
							style={{ borderColor: "var(--accent)" }}
						/>
						<div
							className="absolute top-0 right-6 w-5 h-5 border-t-2 border-r-2"
							style={{ borderColor: "var(--accent)" }}
						/>
						<div
							className="absolute bottom-6 left-0 w-5 h-5 border-b-2 border-l-2"
							style={{ borderColor: "var(--accent)" }}
						/>
						<div
							className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2"
							style={{ borderColor: "var(--accent)" }}
						/>

						{/* Floating badge */}
						<motion.div
							animate={{ y: [0, -6, 0] }}
							transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
							className="absolute -bottom-4 -left-4 px-4 py-2 font-tech text-[0.65rem] uppercase tracking-widest"
							style={{
								background: "var(--surface)",
								border: "1px solid var(--border)",
								color: "var(--accent)",
								clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)",
							}}>
							// Full-Stack Dev
						</motion.div>

						{/* Floating badge right */}
						<motion.div
							animate={{ y: [0, 6, 0] }}
							transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
							className="absolute -top-4 -right-4 px-4 py-2 font-tech text-[0.65rem] uppercase tracking-widest"
							style={{
								background: "var(--surface)",
								border: "1px solid rgba(124,58,237,0.4)",
								color: "#a78bfa",
								clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)",
							}}>
							// Mobile Dev
						</motion.div>
					</div>
				</motion.div>
			</div>

			{/* Scroll indicator */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.5 }}
				className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
				<span className="font-tech text-[0.6rem] text-muted tracking-[0.2em] uppercase">Scroll</span>
				<div
					className="w-px h-12 scroll-line"
					style={{
						background: "linear-gradient(to bottom, var(--accent), transparent)",
					}}
				/>
			</motion.div>
		</section>
	)
}
