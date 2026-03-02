"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { SectionLabel, SectionTitle, RevealSection } from "./ui"
import Image from "next/image"
const skills = [
	{ name: "Next.js", icon: "/icon/next.png", tag: "Frontend", color: "#ffffff" },
	{ name: "Nuxt", icon: "/icon/nuxt.png", tag: "Frontend", color: "#00DC82" },
	{ name: "Laravel", icon: "/icon/laravel.png", tag: "Backend", color: "#FF2D20" },
	{ name: "Flutter", icon: "/icon/flutter.png", tag: "Mobile", color: "#54C5F8" },
	{ name: "React Native", icon: "/icon/reactnative.png", tag: "Mobile", color: "#61DAFB" },
	{ name: "C#", icon: "/icon/csharp.png", tag: "Backend", color: "#512BD4" },
	{ name: "C++", icon: "/icon/cpp.png", tag: "Systems", color: "#00599C" },
]

export default function Skills() {
	const ref = useRef(null)
	const inView = useInView(ref, { once: true, margin: "-80px" })

	return (
		<section
			id="skills"
			className="relative z-10 px-6 md:px-16 py-24"
			style={{
				borderTop: "1px solid var(--border)",
				background: "linear-gradient(to bottom, transparent, rgba(10,15,30,0.5))",
			}}>
			<div className="max-w-5xl mx-auto">
				<RevealSection>
					<SectionLabel>Tech Stack</SectionLabel>
					<SectionTitle>
						My{" "}
						<em
							className="not-italic"
							style={{
								WebkitTextStroke: "1px var(--accent2)",
								color: "transparent",
							}}>
							Weapons
						</em>
					</SectionTitle>
				</RevealSection>

				<div
					ref={ref}
					className="grid gap-4"
					style={{
						gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
					}}>
					{skills.map((skill, i) => (
						<motion.div
							key={skill.name}
							initial={{ opacity: 0, y: 30 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
							whileHover={{ y: -6 }}
							className="group relative flex flex-col items-center gap-3 py-8 px-5 cursor-none"
							style={{
								background: "var(--surface)",
								border: "1px solid var(--border)",
								clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)",
								transition: "border-color 0.3s, box-shadow 0.3s",
							}}
							onMouseEnter={(e) => {
								const el = e.currentTarget as HTMLElement
								el.style.borderColor = "var(--accent)"
								el.style.boxShadow = "var(--glow)"
								el.style.background = "rgba(0,255,229,0.03)"
							}}
							onMouseLeave={(e) => {
								const el = e.currentTarget as HTMLElement
								el.style.borderColor = "var(--border)"
								el.style.boxShadow = "none"
								el.style.background = "var(--surface)"
							}}>
							{/* Bottom border reveal */}
							<div
								className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
								style={{ background: "var(--accent)" }}
							/>

							<span className="text-3xl leading-none"> <Image src={skill.icon} alt={skill.name} width={32} height={32} /> </span>
							<span className="font-mono text-[0.8rem] text-slate-200 text-center leading-tight">
								{skill.name}
							</span>
							<span className="font-tech text-[0.6rem] text-muted uppercase tracking-widest">
								{skill.tag}
							</span>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
