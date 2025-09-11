// src/layouts/CastShell.jsx
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function CastShell() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f14] to-[#0e141b] text-zinc-100">
      {/* subtle animated ripples */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_20%_10%,#6ee7ff_0,transparent_30%),radial-gradient(circle_at_80%_30%,#a78bfa_0,transparent_25%),radial-gradient(circle_at_50%_90%,#34d399_0,transparent_30%)]" />
      <NavBar />
      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 pt-28">
        <Outlet />
      </main>
      <footer className="relative z-10 mt-10 border-t border-white/10 px-4 py-6 text-center text-sm text-zinc-400">
        Cast • a companion for waters, memory, and becoming
      </footer>
    </div>
  );
}
