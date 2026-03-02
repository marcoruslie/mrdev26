export default function Footer() {
  return (
    <footer
      className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4 px-6 md:px-16 py-10"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <span className="font-tech text-[0.7rem] text-muted tracking-widest">
        © {new Date().getFullYear()} Marco Ruslie. All rights reserved.
      </span>
      <span className="font-mono text-[0.95rem] text-accent tracking-widest">
        MR.dev
      </span>
      <span className="font-tech text-[0.7rem] text-muted tracking-widest">
        Built with ⚡ Next.js + Motion
      </span>
    </footer>
  );
}
